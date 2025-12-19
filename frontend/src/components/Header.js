import menuURL from "../icons/menu.svg";
import logoURL from "../icons/logo.svg";
import searchURL from "../icons/search.svg";
import profileURL from "../icons/profile.png";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSideBar } from "../utils/appSlice";
import {
  YOUTUBE_SEARCH_RESULTS_API,
  YOUTUBE_SEARCH_SUGGESTIONS_API,
} from "../utils/constants";
import { cacheResults } from "../utils/searchSlice";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);
  const dispatch = useDispatch();
  const searchCache = useSelector((store) => store.search);
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
    //debounce
    const timer = setTimeout(() => {
      if (searchCache[search]) {
        setSuggestions(searchCache[search]);
        setShowSuggestions(true);
      } else {
        if (search !== "") fetchSearchSuggestions();
      }
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  const fetchSearchSuggestions = async () => {
    const data = await fetch(
      "http://localhost:3001/api/suggestions?q=" + search
    );
    const json = await data.json();
    setSuggestions(json[1]);
    if (json[1].length > 0) setShowSuggestions(true);
    dispatch(cacheResults({ [search]: json[1] }));
  };

  const handleMenuClick = () => {
    dispatch(toggleSideBar());
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!(search == 0)) {
      navigate("/results?search_query=" + search);
    }

    setSearch("");
    setShowSuggestions(false);
  };

  return (
    <div className="sticky top-0 bg-white grid grid-flow-col items-center px-4 py-[1rem] z-20">
      <div className="flex col-span-1 gap-4">
        <img
          className="w-5 cursor-pointer"
          onClick={handleMenuClick}
          alt="menu"
          src={menuURL}
        />
        <a href="/">
          <img className="w-7" alt="logo" src={logoURL} />
        </a>
      </div>
      <div className="mx-auto my-0 col-span-10 relative" ref={searchRef}>
        <form className="flex justify-center " onSubmit={handleSubmit}>
          <input
            className="border border-gray-400 w-52 px-3 rounded-l-full text-xs md:w-96"
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          ></input>
          {search && (
            <button
              type="button"
              className="absolute right-11"
              onClick={() => setSearch("")}
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
              {suggestions.map((suggestion) => (
                <Link
                  to={"/results?search_query=" + suggestion}
                  key={suggestion}
                >
                  <li
                    className="px-1 py-2 cursor-default rounded-md hover:bg-gray-200"
                    onClick={() => {
                      setShowSuggestions(false);
                      setSearch("");
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
      <div className="col-span-1 justify-self-end">
        <img className="w-7" alt="profile" src={profileURL} />
      </div>
    </div>
  );
};

export default Header;
