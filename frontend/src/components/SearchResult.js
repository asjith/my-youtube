import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { YOUTUBE_SEARCH_RESULTS_API } from "../utils/constants";
import VideoCard from "./VideoCard";
import Offline from "./Offline";
import { useSelector } from "react-redux";
import Loading from "./Loading";

const SearchResult = () => {
  const [searchResults, setSearchResults] = useState({
    search: "",
    result: [],
  });
  const [displayOffline, setDisplayOffline] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const isOnline = useSelector((store) => store.app.isOnline);

  useEffect(() => {
    if (
      searchResults.result.length > 0 &&
      searchResults.search === searchParams
    )
      return;
    fetchSearchResults();
  }, [searchParams, retryCount, isOnline]);

  const fetchSearchResults = async () => {
    setLoading(true);
    try {
      const data = await fetch(
        YOUTUBE_SEARCH_RESULTS_API + searchParams.get("search_query")
      );
      const json = await data.json();
      setSearchResults({ search: searchParams, result: json.items });
      setDisplayOffline(false);
    } catch (error) {
      //network error
      if (!navigator.onLine || error.message.includes("fetch"))
        setDisplayOffline(true);
    }
    setLoading(false);
  };

  const handleRetry = () => {
    setRetryCount((rc) => rc + 1);
  };

  if (displayOffline) return <Offline onClick={handleRetry} />;

  if (loading) return <Loading />;

  return (
    <div className="m-4 grid  gap-2 grid-cols-1">
      {searchResults.result.map((result) => (
        <Link to={"/watch?v=" + result.id.videoId} key={result.id.videoId}>
          <VideoCard info={result} calledFrom="SearchResult" />
        </Link>
      ))}
    </div>
  );
};

export default SearchResult;
