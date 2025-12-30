import noWifiURL from "../icons/noWifi.png";

const Offline = ({ onClick }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 h-52 text-xs md:h-96">
      <img src={noWifiURL} alt="no-wifi" />
      <h1 className="text-lg md:text-xl ">Connect to the internet</h1>
      <p>You are offline. Check your internet connection</p>
      <button
        type="button"
        className="px-4 py-2 m-2 rounded-full font-bold border border-gray-400 hover:bg-gray-400"
        onClick={onClick}
      >
        Retry
      </button>
    </div>
  );
};

export default Offline;
