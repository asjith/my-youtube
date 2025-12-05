import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { YOUTUBE_SEARCH_RESULTS_API } from "../utils/constants";
import VideoCard from "./VideoCard";

const SearchResult = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    fetchSearchResults();
  }, []);

  const fetchSearchResults = async () => {
    const data = await fetch(
      YOUTUBE_SEARCH_RESULTS_API + searchParams.get("search_query")
    );
    const json = await data.json();
    setSearchResults(json.items);
    console.log(json.items);
  };

  return (
    <div className="m-4 grid  gap-2 grid-cols-1">
      {searchResults.map((result) => (
        <Link to={"/watch?v=" + result.id.videoId} key={result.id.videoId}>
          <VideoCard info={result} calledFrom="SearchResult" />
        </Link>
      ))}
    </div>
  );
};

export default SearchResult;
