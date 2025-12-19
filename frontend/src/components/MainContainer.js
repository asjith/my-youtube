import { useSelector } from "react-redux";
import ButtonList from "./ButtonList";
import VideoList from "./VideoList";
import { Outlet } from "react-router-dom";

const MainContainer = () => {
  const isSideBarOpen = useSelector((store) => store.app.isSideBarOpen);

  return (
    <div className={`col-span-9 ${isSideBarOpen ? "ml-[8.5rem]" : ""}`}>
      <ButtonList />
      <Outlet />
    </div>
  );
};
export default MainContainer;
