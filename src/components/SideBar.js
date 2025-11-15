import { SIDEBAR_BUTTONS } from "../utils/constants";

const SideBar = () => {
  return (
    <div className="col-span-3 flex flex-col ">
      {SIDEBAR_BUTTONS.map((buttonInfo) => {
        return (
          <button key={buttonInfo.id} className="text-left mx-2 p-2 text-xs">
            {buttonInfo.name}
          </button>
        );
      })}
    </div>
  );
};

export default SideBar;
