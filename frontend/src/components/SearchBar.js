import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import searchURL from "../icons/search.svg";
import { useQuery } from "@tanstack/react-query";
import { fetchSearchSuggestions } from "../utils/api";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectSuggestion, setSelectSuggestion] = useState({
    event: null,
    index: -1
  });
  const searchRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.addEventListener("click", handleShowSearchSuggestions);

    return () =>
      document.removeEventListener("click", handleShowSearchSuggestions);
  }, []);

  const handleShowSearchSuggestions = (e) => {
    if (!searchRef.current.contains(e.target)) setSuggestions([]);
  };

  const { data, isError, error } = useQuery({
    enabled: searchKey !== "",
    queryKey: ["suggestions", searchKey],
    queryFn: () => fetchSearchSuggestions(searchKey),
    retry: 0,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 5,
    refetchOnMount: false,
    refetchOnWindowFocus: false
  });

  useEffect(() => {
    if (search === "" || selectSuggestion.index !== -1) return;

    //debounce
    const timer = setTimeout(() => {
      setSearchKey(search);
    }, 200);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    if (data?.length > 0) setSuggestions(data);
  }, [data]);

  useEffect(() => {
    if (selectSuggestion.index == -1) return;
    if (selectSuggestion.event == "mouseEnter") return;

    setSearch(suggestions?.[selectSuggestion.index]);
  }, [selectSuggestion]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!(search == 0)) {
      navigate("/results?search_query=" + search);
    }

    resetValues();
  };

  const resetValues = () => {
    setSearch("");
    setSearchKey("");
    setSuggestions([]);
    setSelectSuggestion({ event: null, index: -1 });
  };

  if (isError) {
    console.error(error);
  }

  return (
    <div className="mx-auto my-0 col-span-10 relative" ref={searchRef}>
      <form className="flex justify-center " onSubmit={handleSubmit}>
        <input
          className="border border-gray-400 w-32 px-3 rounded-l-full text-xs md:w-96"
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              setSelectSuggestion({
                event: "keyDown",
                index:
                  selectSuggestion.index < suggestions?.length - 1
                    ? selectSuggestion.index + 1
                    : 0
              });
            } else if (e.key === "ArrowUp") {
              setSelectSuggestion({
                event: "keyDown",
                index:
                  selectSuggestion.index > 0
                    ? selectSuggestion.index - 1
                    : suggestions?.length - 1
              });
            } else {
              setSelectSuggestion({ event: null, index: -1 });
            }
          }}
        ></input>
        {search && (
          <button
            type="button"
            className="absolute right-11"
            onClick={resetValues}
          >
            &#10005;
          </button>
        )}
        <button type="submit">
          <img
            className="w-9 px-2 py-1 border border-gray-400 bg-gray-200 rounded-r-full"
            alt="search"
            src={searchURL}
          />
        </button>
      </form>
      {suggestions?.length > 0 && (
        <div className="absolute bg-white px-2 py-2 text-xs font-bold border border-gray-200 rounded-md shadow-lg w-52 md:w-96">
          <ul>
            {suggestions?.map((suggestion, index) => (
              <Link to={"/results?search_query=" + suggestion} key={suggestion}>
                <li
                  className={
                    "px-1 py-2 cursor-default rounded-md" +
                    (selectSuggestion.index === index && " bg-gray-200")
                  }
                  onClick={resetValues}
                  onMouseEnter={() => {
                    setSelectSuggestion({
                      event: "mouseEnter",
                      index: index
                    });
                  }}
                >
                  {suggestion}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
