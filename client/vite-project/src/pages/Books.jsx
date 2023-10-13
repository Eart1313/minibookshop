import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchAllbooks = async () => {
      try {
        const res = await axios.get("http://localhost:4000/books");
        setBooks(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllbooks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/books/${id}`);
      setBooks((prev) => {
        return prev.filter((item) => item.id !== id);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col min-h-[100vh] items-center justify-center m-[50px]">
      <h1 className="flex text-[2.5rem] font-semibold mb-[50px]">
        Eart <span className="text-[blue]">Book</span>
        <span className="text-[red]">Shops</span>
      </h1>
      <div className="grid grid-cols-3 gap-[100px]">
        {books.map((item) => (
          <div
            className="flex flex-[4] flex-col gap-[10px] items-center text-center"
            key={item.id}>
            {item.cover ? (
              <img
                className="w-[200px] h-[300px] bg-[aquamarine]"
                src={item.cover}
                alt=""
              />
            ) : (
              <div className="flex items-center justify-center w-[200px] h-[300px] bg-[aquamarine]">
                No Image
              </div>
            )}
            <h2 className="font-semibold">{item.title.slice(0, 100)}</h2>
            <p>{item.desc.slice(0, 255)}</p>
            <span className="font-semibold text-[green]">
              {item.price.toLocaleString()} THB
            </span>
            <button
              className="py-[3px] px-[6px] border-[1px] border-[red] text-[red] bg-[white]"
              onClick={() => {
                handleDelete(item.id);
              }}>
              Delete
            </button>
            <button className="py-[3px] px-[6px] border-[1px] border-[blue] text-[blue] bg-[white]">
              <Link to={`/update/${item.id}`}>Update</Link>
            </button>
          </div>
        ))}
      </div>
      <Link to="/add">
        <button className="my-[50px] p-[15px] border-[1px] border-[blue] my-[15px] text-[blue]">
          Add new Book
        </button>
      </Link>
    </div>
  );
};

export default Books;
