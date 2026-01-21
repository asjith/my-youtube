import { useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";

import VideoCard from "./VideoCard";
import Offline from "./Offline";
import { useSelector } from "react-redux";
import Loading from "./Loading";
import NoResultsFound from "./NoResultsFound";

import Error from "./Error";
import { useQuery } from "@tanstack/react-query";
import { fetchSearchResults } from "../utils/api";

const SearchResult = () => {
  const [searchParams] = useSearchParams();
  const isOnline = useSelector((store) => store.app.isOnline);
  const prevIsOnline = useRef(isOnline);

  const {
    data: searchResults,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ["search", searchParams.get("search_query")],
    queryFn: () => fetchSearchResults(searchParams.get("search_query")),
    retry: 0,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 5,
    refetchOnMount: false,
    refetchOnWindowFocus: false
  });

  useEffect(() => {
    if (!prevIsOnline.current && isOnline) refetch();
    prevIsOnline.current = isOnline;
  }, [isOnline]);

  if (isLoading) return <Loading />;

  if (isError) {
    if (!navigator.onLine) return <Offline refetch={refetch} />;
    else if (error.message.includes("404")) return <NoResultsFound />;
    else {
      console.error(error);
      return <Error refetch={refetch} />;
    }
  }

  if (searchResults?.length === 0) return <NoResultsFound />;

  return (
    <div className="m-4 grid  gap-2 grid-cols-1">
      {searchResults?.map((result) => (
        <Link to={"/watch?v=" + result.id.videoId} key={result.id.videoId}>
          <VideoCard info={result} calledFrom="SearchResult" />
        </Link>
      ))}
    </div>
  );
};

export default SearchResult;
