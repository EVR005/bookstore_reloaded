import { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import CreateBook from "./pages/CreateBook";
import UpdateBookInfo from "./pages/UpdateBookInfo";
import ShowBookDetails from "./pages/ShowBookDetails";
import ShowBookList from "./pages/ShowBookList";
import ViewStats from "./pages/ViewStats";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="bg-blue-950 min-h-screen w-screen max-w-screen">
          <Routes>
            <Route path="/" element={<ShowBookList />} />
            <Route path="/create-book" element={<CreateBook />} />
            <Route path="/edit-book/:id" element={<UpdateBookInfo />} />
            <Route path="/show-book/:id" element={<ShowBookDetails />} />
            <Route path="/view-stats" element={<ViewStats />} />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
