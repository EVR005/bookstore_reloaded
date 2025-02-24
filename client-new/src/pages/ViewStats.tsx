import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Moment from "moment";

const ViewStats = () => {
  const [recentpub, setRecentPub] = useState(0);
  const [recentupdate, setRecentUpdate] = useState(0);
  const [mostpub, setMostPub] = useState("");
  const [mostpubcount, setMostPubCount] = useState(0);
  const [mostauth, setMostAuth] = useState("");
  const [mostauthcount, setMostAuthCount] = useState(0);
  const [oldestpub, setOldestPub] = useState("");
  const [oldestpubdate, setOldestPubDate] = useState("");
  const [latestpub, setLatestPub] = useState("");
  const [latestpubdate, setLatestPubDate] = useState("");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BOOKS_ENDPOINT}/books/stats`)
      .then((res) => {
        console.log(res.data);
        setRecentPub(
          res.data["query_results"][0] != null
            ? res.data["query_results"][0]["recently_published"]
            : 0
        );
        setRecentUpdate(
          res.data["query_results"][1] != null
            ? res.data["query_results"][1]["recently_updated"]
            : 0
        );
        setMostPub(res.data["query_results"][2]["_id"]);
        setMostPubCount(res.data["query_results"][2]["count"]);
        setMostAuth(res.data["query_results"][3]["_id"]);
        setMostAuthCount(res.data["query_results"][3]["count"]);
        setOldestPub(res.data["query_results"][4]["title"]);
        const x = res.data["query_results"][4]["published_date"];
        console.log(x);
        const y = res.data["query_results"][5]["published_date"];
        setOldestPubDate(Moment(x).format("DD-MM-YYYY"));
        setLatestPub(res.data["query_results"][5]["title"]);
        setLatestPubDate(Moment(y).format("DD-MM-YYYY"));
      })
      .catch(() => {
        console.log("Error from View Stats");
      });
  }, []);
  return (
    <div className="space-y-5 place-items-center">
      <div className="w-screen py-3 bg-blue-950 text-center text-4xl text-white border-white border-2 rounded-2xl hover:bg-white hover:text-blue-950">
        <Link to="/">Back to Home</Link>
      </div>
      <h2 className="text-yellow-500 text-6xl font-bold">Book Stats</h2>
      <div className="grid grid-rows-6 w-full divide-y-1 divide-white bg-black text-white text-lg text-center">
        <div className="grid grid-cols-4 divide-x-1 min-sm:h-20 max-sm:h-auto  divide-white">
          <div className="flex items-center justify-center">1</div>
          <div className="flex items-center justify-center">
            Recently Updated (1 week)
          </div>
          <div className="flex items-center justify-center">{recentupdate}</div>
          <div className="flex items-center justify-center">-</div>
        </div>
        <div className="grid grid-cols-4 divide-x-1 min-sm:h-20 max-sm:h-auto  divide-white ">
          <div className="flex items-center justify-center">2</div>
          <div className="flex items-center justify-center">
            Recently Published (1 week)
          </div>
          <div className="flex items-center justify-center">{recentpub}</div>
          <div className="flex items-center justify-center">-</div>
        </div>
        <div className="grid grid-cols-4 divide-x-1 min-sm:h-20 max-sm:h-auto  divide-white">
          <div className="flex items-center justify-center">3</div>
          <div className="flex items-center justify-center">
            Most Books by an author
          </div>
          <div className="flex items-center justify-center">
            {mostauthcount}
          </div>
          <div className="flex items-center justify-center">{mostauth}</div>
        </div>
        <div className="grid grid-cols-4 divide-x-1 min-sm:h-20 max-sm:h-auto  divide-white">
          <div className="flex items-center justify-center">4</div>
          <div className="flex items-center justify-center">
            Most Books by a publisher
          </div>
          <div className="flex items-center justify-center">{mostpubcount}</div>
          <div className="flex items-center justify-center">{mostpub}</div>
        </div>
        <div className="grid grid-cols-4 divide-x-1 min-sm:h-20 max-sm:h-auto  divide-white">
          <div className="flex items-center justify-center">5</div>
          <div className="flex items-center justify-center">
            First Published
          </div>
          <div className="flex items-center justify-center">
            {oldestpubdate}
          </div>
          <div className="flex items-center justify-center">{oldestpub}</div>
        </div>
        <div className="grid grid-cols-4 divide-x-1 min-sm:h-20 max-sm:h-auto  divide-white">
          <div className="flex items-center justify-center">6</div>
          <div className="flex items-center justify-center">Last Published</div>
          <div className="flex items-center justify-center">
            {latestpubdate}
          </div>
          <div className="flex items-center justify-center">{latestpub}</div>
        </div>
      </div>
    </div>
  );
};

export default ViewStats;
