import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "../App.css";
import axios from "axios";
import Moment from "moment";
import { BookRecord } from "@/types/types";
import { bookRecordSchema } from "@/types/schema";
import { Button } from "@/components/ui/button";

const ShowBookDetails = () => {
  const [bookRecord, setBookRecord] = useState<BookRecord>({} as BookRecord);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Print id: " + id);
    axios
      .get(`${import.meta.env.VITE_BOOKS_ENDPOINT}/books/` + id)
      .then((res) => {
        const result = bookRecordSchema.safeParse(res.data);
        console.log(result);
        if (result.success) {
          setBookRecord(result.data as BookRecord);
        } else {
          console.log("Cannot Fetch Book Details!");
        }
      })
      .catch(() => {
        console.log("Error from ShowBookDetails");
      });
  }, []);

  useEffect(() => {
    console.log(bookRecord);
  }, [bookRecord]); // ✅ Logs after state updates

  const onDeleteClick = async () => {
    await axios
      .delete(`${import.meta.env.VITE_BOOKS_ENDPOINT}/books/` + id)
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        console.log("Error form ShowBookDetails_deleteClick");
      });
  };

  const bookFields = [
    { name: "Title", property: "title" },
    { name: "ISBN", property: "isbn" },
    { name: "Description", property: "description" },
    { name: "Author", property: "author" },
    { name: "Publisher", property: "publisher" },
    { name: "Published Date", property: "published_date" },
  ];

  return (
    <div className="space-y-8 place-items-center">
      <div className="w-full py-3 bg-blue-950 text-center max-sm:text-2xl min-sm:text-4xl text-white border-white border-2 rounded-2xl hover:bg-white hover:text-blue-950">
        <Link to="/">Show Booklist</Link>
      </div>
      <div className="text-6xl font-bold text-yellow-500 text-center w-screen">
        Book's Record
      </div>

      <div className="grid grid-cols-2 gap-x-5 place-items-center">
        <Button
          onClick={onDeleteClick}
          className="w-full h-10 text-lg flex items-center justify-center rounded-2xl bg-blue-950 hover:text-blue-950 text-white border-white border-2 hover:bg-white"
        >
          Delete Book
        </Button>
        <Link
          to={`/edit-book/${id}`}
          className="w-full h-10 text-lg flex items-center justify-center rounded-2xl bg-blue-950 hover:text-blue-950 text-white border-white border-2 hover:bg-white"
        >
          Edit Book
        </Link>
      </div>

      <div className="grid grid-rows-6 w-full divide-y-1 divide-white bg-black text-white text-lg text-center">
        {bookFields.map(
          (bookField: { name: string; property: string }, fieldkey: number) => {
            return (
              <div
                className="grid grid-cols-3 divide-x-1 min-sm:min-h-12 max-sm:h-auto  divide-white"
                key={fieldkey}
              >
                <div className="flex items-center justify-center">
                  {fieldkey}
                </div>
                <div className="flex items-center justify-center">
                  {bookField.name}
                </div>
                <div className="flex items-center justify-center">
                  {bookRecord &&
                  bookField.property in bookRecord &&
                  bookRecord[bookField.property as keyof BookRecord] !==
                    undefined
                    ? bookRecord[
                        bookField.property as keyof BookRecord
                      ] instanceof Date
                      ? Moment(
                          bookRecord[bookField.property as keyof BookRecord]
                        )
                          .format("DD-MM-YYYY")
                          .toString()
                      : bookRecord[
                          bookField.property as keyof BookRecord
                        ].toString()
                    : "N/A"}
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default ShowBookDetails;
