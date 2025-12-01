import { useSelector } from "react-redux";
import { SIDEBAR_BUTTONS } from "../utils/constants";

const SideBar = () => {
  const isSideBarOpen = useSelector((store) => store.app.isSideBarOpen);

  if (!isSideBarOpen) return null;

  return (
    <div className="col-span-3 flex flex-col m-4">
      {SIDEBAR_BUTTONS.map((buttonInfo) => {
        return (
          <button
            key={buttonInfo.id}
            className={`text-left px-4 py-2 text-xs rounded-md ${
              buttonInfo.id === 0 && "bg-gray-200 font-bold"
            }`}
          >
            {buttonInfo.name}
          </button>
        );
      })}
    </div>
  );
};

export default SideBar;
