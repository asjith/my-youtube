import { Outlet } from "react-router-dom";
import MainContainer from "./MainContainer";
import SideBar from "./SideBar";

const Body = () => {
  return (
    <div className="grid grid-flow-col">
      <SideBar />
      <Outlet />
    </div>
  );
};

export default Body;
