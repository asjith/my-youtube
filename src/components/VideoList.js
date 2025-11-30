import React, { useEffect } from "react";
import { YOUTUBE_API } from "../utils/constants";

const VideoList = () => {
  useEffect(() => {
    fetchYoutubeVideoDatas();
  }, []);

  const fetchYoutubeVideoDatas = async () => {
    const data = await fetch(YOUTUBE_API);
    const json = await data.json();
    console.log(json);
  };
  return <div>VideoList</div>;
};

export default VideoList;
