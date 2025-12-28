import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { YOUTUBE_SEARCH_RESULTS_API } from "../utils/constants";
import VideoCard from "./VideoCard";
import Offline from "./Offline";
import { useSelector } from "react-redux";
import Loading from "./Loading";
import NoResultsFound from "./NoResultsFound";
import { checkOfflineError } from "../utils/helperFunctions";
import Error from "./Error";

const SearchResult = () => {
  const [searchResults, setSearchResults] = useState({
    search: "",
    result: [],
  });
  const [displayOffline, setDisplayOffline] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
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
    setError(false);
    setDisplayOffline(false);
    try {
      const data = await fetch(
        YOUTUBE_SEARCH_RESULTS_API + searchParams.get("search_query")
      );
      if (!data.ok) {
        console.error("HTTP Error", {
          status: data.status,
          statusText: data.statusText,
          url: data.url,
          timestamp: new Date().toISOString(),
        });
        setError(true);
        setSearchResults({ search: "", result: [] });
      } else {
        const json = await data.json();
        setSearchResults({ search: searchParams, result: json.items });
      }
    } catch (error) {
      //network error
      if (!navigator.onLine || checkOfflineError(error.message))
        setDisplayOffline(true);
      else {
        console.error("Network Error", error);
        setError(true);
        setSearchResults({ search: "", result: [] });
      }
    }
    setLoading(false);
  };

  const handleRetry = () => {
    setRetryCount((rc) => rc + 1);
  };

  if (loading) return <Loading />;

  if (displayOffline) return <Offline onClick={handleRetry} />;

  if (error) return <Error onClick={handleRetry} />;

  if (searchResults.result.length === 0) return <NoResultsFound />;

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
