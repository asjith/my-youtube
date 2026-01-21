import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { YOUTUBE_SEARCH_SUGGESTIONS_API_FROM_BACKEND } from "../utils/constants";
import { cacheResults } from "../utils/searchSlice";
import searchURL from "../icons/search.svg";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectSuggestion, setSelectSuggestion] = useState({
    event: null,
    index: -1
  });
  const searchRef = useRef(null);
  const dispatch = useDispatch();
  const searchCache = useSelector((store) => store.search);
  const isOnline = useSelector((store) => store.app.isOnline);
  const navigate = useNavigate();

  useEffect(() => {
    document.addEventListener("click", handleShowSearchSuggestions);

    return () =>
      document.removeEventListener("click", handleShowSearchSuggestions);
  }, []);

  const handleShowSearchSuggestions = (e) => {
    if (!searchRef.current.contains(e.target)) setShowSuggestions(false);
  };

  useEffect(() => {
    console.log("trigger");
    if (!isOnline) return;
    if (selectSuggestion.index != -1) return;
    //debounce
    const timer = setTimeout(() => {
      console.log("debounce", search);
      if (searchCache[search]) {
        setSuggestions(searchCache[search]);
        setShowSuggestions(true);
      } else {
        if (search !== "") fetchSearchSuggestions();
      }
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [search, isOnline]);

  useEffect(() => {
    if (selectSuggestion.index == -1) return;
    if (selectSuggestion.event == "mouseEnter") return;
    setSearch(suggestions[selectSuggestion.index]);
  }, [selectSuggestion]);

  const fetchSearchSuggestions = async () => {
    try {
      const data = await fetch(
        YOUTUBE_SEARCH_SUGGESTIONS_API_FROM_BACKEND + search
      );
      if (!data.ok) {
        console.error("HTTP Error", {
          status: data.status,
          statusText: data.statusText,
          url: data.url,
          timestamp: new Date().toISOString()
        });
      } else {
        const json = await data.json();
        setSuggestions(json[1]);
        if (json[1]?.length > 0) setShowSuggestions(true);
        dispatch(cacheResults({ [search]: json[1] }));
      }
    } catch (error) {
      console.error("Network Error", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!(search == 0)) {
      navigate("/results?search_query=" + search);
    }

    setSearch("");
    setShowSuggestions(false);
    setSelectSuggestion({ event: null, index: -1 });
  };

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
                  selectSuggestion.index < suggestions.length - 1
                    ? selectSuggestion.index + 1
                    : 0
              });
            } else if (e.key === "ArrowUp") {
              setSelectSuggestion({
                event: "keyDown",
                index:
                  selectSuggestion.index > 0
                    ? selectSuggestion.index - 1
                    : suggestions.length - 1
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
            onClick={() => {
              setSearch("");
              setSelectSuggestion({ event: null, index: -1 });
            }}
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
      {showSuggestions && (
        <div className="absolute bg-white px-2 py-2 text-xs font-bold border border-gray-200 rounded-md shadow-lg w-52 md:w-96">
          <ul>
            {suggestions.map((suggestion, index) => (
              <Link to={"/results?search_query=" + suggestion} key={suggestion}>
                <li
                  className={
                    "px-1 py-2 cursor-default rounded-md" +
                    (selectSuggestion.index === index && " bg-gray-200")
                  }
                  onClick={() => {
                    setShowSuggestions(false);
                    setSearch("");
                    setSelectSuggestion({ event: null, index: -1 });
                  }}
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
