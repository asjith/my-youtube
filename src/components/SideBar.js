import { useSelector } from "react-redux";
import { SIDEBAR_BUTTONS } from "../utils/constants";
import { Link } from "react-router-dom";

const SideBar = () => {
  const isSideBarOpen = useSelector((store) => store.app.isSideBarOpen);

  if (!isSideBarOpen) return null;

  return (
    <div className="col-span-3 flex flex-col m-4">
      {SIDEBAR_BUTTONS.map((buttonInfo) => {
        return (
          <>
            {buttonInfo.id === 0 ? (
              <Link to="/">
                <button
                  key={buttonInfo.id}
                  className="w-full text-left px-4 py-2 text-xs rounded-md bg-gray-200 font-bold"
                >
                  {buttonInfo.name}
                </button>
              </Link>
            ) : (
              <button
                key={buttonInfo.id}
                className="text-left px-4 py-2 text-xs rounded-md"
              >
                {buttonInfo.name}
              </button>
            )}
          </>
        );
      })}
    </div>
  );
};

export default SideBar;
