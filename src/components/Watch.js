import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { closeSideBar } from "../utils/appSlice";
import { useSearchParams } from "react-router-dom";
import Comment from "./Comment";
import { COMMENTS_DATA } from "../utils/constants";

const Watch = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(closeSideBar());
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="col-span-9 m-2 p-2">
      <iframe
        className="rounded-md w-full aspect-video my-2 md:w-4/6"
        src={
          "https://www.youtube.com/embed/" +
          searchParams.get("v") +
          "?si=Wei6g8TNvvsJM8ym&autoplay=1"
        }
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
      <div className="w-full md:w-4/6">
        {COMMENTS_DATA.map((comment) => (
          <Comment info={comment} />
        ))}
      </div>
    </div>
  );
};

export default Watch;
