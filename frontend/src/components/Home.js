import Header from "./Header";
import Body from "./Body";
import useCheckOnlineOffline from "../hooks/useCheckOnlineOffline";
import ImmediateOfflineDetection from "./ImmediateOfflineDetection";

const Home = () => {
  useCheckOnlineOffline();

  return (
    <div className="relative">
      <Header />
      <Body />
      <ImmediateOfflineDetection />
    </div>
  );
};

export default Home;
