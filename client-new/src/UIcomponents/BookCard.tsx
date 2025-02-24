import { Link } from "react-router-dom";
import "../App.css";
import { Book } from "@/types/types";

const BookCard = ({ book }: { book: Book }) => {
  return (
    <div className="w-[300px] bg-gray-800 border border-yellow-400 rounded-lg p-5 text-center">
      <div className="space-y-3">
        <h2 className="text-yellow-400 font-bold overflow-ellipsis line-clamp-2 h-[2lh]">
          <Link to={`/show-book/${book._id}`}>{book.title}</Link>
        </h2>
        <h3 className="text-blue-500 font-bold">{book.author}</h3>
        <p className="text-white overflow-ellipsis line-clamp-3 h-[3lh]">
          {book.description}
        </p>
      </div>
    </div>
  );
};

export default BookCard;
