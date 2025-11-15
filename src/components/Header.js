import menuURL from "../icons/menu.svg";
import logoURL from "../icons/logo.svg";
import searchURL from "../icons/search.svg";
import profileURL from "../icons/profile.png";
import { useState } from "react";

const Header = () => {
  return (
    <div className="grid grid-flow-col items-center m-2 p-2">
      <div className="flex col-span-1 gap-4">
        <img className="w-5" alt="menu" src={menuURL} />
        <img className="w-7" alt="logo" src={logoURL} />
      </div>
      <div className="flex col-span-10 justify-self-center">
        <input
          className="border border-gray-400 w-52 px-3 rounded-l-full text-xs md:w-96"
          type="text"
          placeholder="Search"
        ></input>
        <button>
          <img
            className="w-9 px-2 py-1 border border-gray-400 bg-gray-400 rounded-r-full"
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
