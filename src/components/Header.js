import menuURL from "../icons/menu.svg";
import logoURL from "../icons/logo.svg";
import searchURL from "../icons/search.svg";
import profileURL from "../icons/profile.png";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toggleSideBar } from "../utils/appSlice";
import { YOUTUBE_SEARCH_SUGGESTIONS_API } from "../utils/constants";

const Header = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    //debounce
    const timer = setTimeout(() => {
      fetchSearchSuggestions();
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  const fetchSearchSuggestions = async () => {
    const data = await fetch(YOUTUBE_SEARCH_SUGGESTIONS_API + search);
    const json = await data.json();
    console.log(json[1]);
  };

  const handleMenuClick = () => {
    dispatch(toggleSideBar());
  };

  return (
    <div className="sticky top-0 bg-white grid grid-flow-col items-center px-4 py-[1rem]">
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
      <div className="flex col-span-10 justify-self-center">
        <input
          className="border border-gray-400 w-52 px-3 rounded-l-full text-xs md:w-96"
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        ></input>
        <button>
          <img
            className="w-9 px-2 py-1 border border-gray-400 bg-gray-200 rounded-r-full"
            alt="search"
            src={searchURL}
          />
        </button>
      </div>
      <div className="col-span-1 justify-self-end">
        <img className="w-7" alt="profile" src={profileURL} />
      </div>
    </div>
  );
};

export default Header;
