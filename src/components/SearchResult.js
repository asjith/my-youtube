import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { YOUTUBE_SEARCH_RESULTS_API } from "../utils/constants";

const SearchResult = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    fetchSearchResults();
  }, []);

  const fetchSearchResults = async () => {
    const data = await fetch(
      YOUTUBE_SEARCH_RESULTS_API + searchParams.get("search_query")
    );
    const json = await data.json();
    console.log(json.items);
  };

  return <div>SearchResult</div>;
};

export default SearchResult;
