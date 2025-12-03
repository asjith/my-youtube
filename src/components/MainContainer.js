import { useSelector } from "react-redux";
import ButtonList from "./ButtonList";
import VideoList from "./VideoList";

const MainContainer = () => {
  const isSideBarOpen = useSelector((store) => store.app.isSideBarOpen);

  return (
    <div className={`col-span-9 ${isSideBarOpen ? "ml-[8.5rem]" : ""}`}>
      <ButtonList />
      <VideoList />
    </div>
  );
};
export default MainContainer;
