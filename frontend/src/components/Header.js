import menuURL from "../icons/menu.svg";
import logoURL from "../icons/logo.png";
import profileURL from "../icons/profile.png";
import { useDispatch } from "react-redux";
import { toggleSideBar } from "../utils/appSlice";
import SearchBar from "./SearchBar";

const Header = () => {
  const dispatch = useDispatch();

  const handleMenuClick = () => {
    dispatch(toggleSideBar());
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

      <SearchBar />

      <div className="col-span-1 justify-self-end">
        <img className="w-7" alt="profile" src={profileURL} />
      </div>
    </div>
  );
};

export default Header;
