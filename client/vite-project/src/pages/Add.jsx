import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [book, setBook] = useState({
    title: "",
    desc: "",
    price: null,
    cover: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (book.title === "") {
      alert("Title is required!");
      return;
    }
    if (book.desc === "") {
      alert("Description is required!");
      return;
    }
    if (book.price === null || book.price === 0 || book.price === "") {
      alert("Price is required!");
      return;
    }

    try {
      await axios.post("http://localhost:4000/books", book);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center pt-[50px] h-[100vh] gap-[15px]">
      <h1 className="flex text-[1.5rem] font-semibold">
        Add <span className="text-[blue]">New</span>
        <span className="text-[red]">Book</span>{" "}
      </h1>
      <input
        className="p-[10px] border-[1px] border-[gray]"
        type="text"
        placeholder="title"
        onChange={handleChange}
        name="title"
      />
      <input
        className="p-[10px] border-[1px] border-[gray]"
        type="text"
        placeholder="description"
        onChange={handleChange}
        name="desc"
      />
      <input
        className="p-[10px] border-[1px] border-[gray]"
        type="number"
        placeholder="price"
        onChange={handleChange}
        name="price"
      />
      <input
        className="p-[10px] border-[1px] border-[gray]"
        type="text"
        placeholder="cover image URL"
        onChange={handleChange}
        name="cover"
      />
      <button
        className="w-[200px] my-[50px] p-[15px] border-[1px] border-[blue] my-[15px] text-[blue]"
        onClick={handleClick}>
        Edit
      </button>
    </div>
  );
};

export default Add;
