import React, { useEffect, useRef } from "react";
import VideoCard from "./VideoCard";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Offline from "./Offline";
import Loading from "./Loading";
import Error from "./Error";
import { useQuery } from "@tanstack/react-query";
import { fetchYoutubeVideos } from "../utils/api";

const VideoList = () => {
  const isOnline = useSelector((store) => store.app.isOnline);
  const prevIsOnline = useRef(isOnline);

  const {
    data: videoInfo,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ["videos"],
    queryFn: fetchYoutubeVideos,
    retry: 0,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false
  });

  useEffect(() => {
    if (!prevIsOnline.current && isOnline) {
      refetch();
    }
    prevIsOnline.current = isOnline;
  }, [isOnline]);

  if (isLoading) return <Loading />;

  if (isError) {
    if (!navigator.onLine) return <Offline refetch={refetch} />;
    else {
      console.error(error);
      return <Error refetch={refetch} />;
    }
  }

  return (
    <div className="m-4 grid  gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {videoInfo?.map((info) => (
        <Link to={"/watch?v=" + info.id} key={info.id}>
          <VideoCard info={info} />
        </Link>
      ))}
    </div>
  );
};

export default VideoList;
