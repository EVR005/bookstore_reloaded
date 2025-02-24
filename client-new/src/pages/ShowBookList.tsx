import { ChangeEvent, useEffect } from "react";
import "../App.css";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import BookCard from "../UIcomponents/BookCard";
import { Option } from "@/types/types";

const ShowBookList = () => {
  const [books, setBooks] = useState([]);
  const [textvalue, setTextValue] = useState("");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BOOKS_ENDPOINT}/books`)
      .then((res) => {
        setBooks(res.data);
      })
      .catch(() => {
        console.log("Error from ShowBookList");
      });
  }, []);

  const setSearchQuery = (event: ChangeEvent<HTMLInputElement>) => {
    setTextValue(event.target.value);
    if (event.target.value === "") {
      axios
        .get(`${import.meta.env.VITE_BOOKS_ENDPOINT}/books`)
        .then((res) => {
          setBooks(res.data);
        })
        .catch(() => {
          console.log("Error from ShowBookList");
        });
    }
  };

  const sendChoice = (option: Option | null) => {
    console.log(option);
    axios
      .get(
        `${import.meta.env.VITE_BOOKS_ENDPOINT}/books/${textvalue}/${
          option?.value
        }`
      )
      .then((res) => {
        setBooks(res.data);
        console.log(res.data);
        console.log(option?.value + " : " + textvalue);
      })
      .catch((err) => {
        console.log("Error from ShowBookList choices : ", err);
      });
  };

  console.log("PrintBook: " + books);
  let bookList;

  if (books.length === 0) {
    bookList = "There is no such book record!";
  } else {
    bookList = books.map((book, k) => <BookCard book={book} key={k} />);
  }

  const options: Array<Option> = [
    { value: "publisher", label: "Search by Publisher" },
    { value: "author", label: "Search By Author" },
    { value: "published_date", label: "Published After" },
    { value: "title", label: "Search by Title" },
    { value: "bookid", label: "Search by Book ID" },
  ];

  return (
    <div className="place-items-center space-y-20 pt-12">
      <div className="space-y-10">
        <h2 className="text-6xl text-center text-yellow-500 font-bold">
          Books List
        </h2>
        <div className="flex flex-wrap gap-x-5 gap-y-5 items-center justify-center">
          <input
            className="bg-white rounded-2xl h-10 w-[320px]"
            type="text"
            name="query"
            id="input"
            onChange={setSearchQuery}
          ></input>

          <div className="w-[320px]">
            <Select
              options={options}
              id="choices"
              name="choices"
              onChange={sendChoice}
              styles={{
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isFocused ? "#E4A11B" : "white",
                  color: state.isFocused ? "white" : "black",
                }),
              }}
            />
          </div>

          <div className="grid grid-cols-2 gap-x-5 place-items-center">
            <Link
              to="/view-stats"
              className="w-[150px] h-10 text-lg flex items-center justify-center rounded-2xl bg-blue-950 hover:text-blue-950 text-white border-white border-2 hover:bg-white"
            >
              View Stats
            </Link>
            <Link
              to="/create-book"
              className="w-[150px] h-10 text-lg flex items-center justify-center rounded-2xl bg-blue-950 hover:text-blue-950 text-white border-white border-2 hover:bg-white"
            >
              New Book
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-5">
        {bookList}
      </div>
    </div>
  );
};

export default ShowBookList;
