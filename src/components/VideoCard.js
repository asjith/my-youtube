const VideoCard = ({ info }) => {
  const { snippet, statistics } = info;
  const { channelTitle, title, thumbnails } = snippet;

  return (
    <div className="w-72 p-1 cursor-pointer shadow-md rounded-md">
      <img className="rounded-md" src={thumbnails.medium.url} alt="thumbnail" />
      <p className="video-title font-bold text-sm py-1">{title}</p>
      <div className="text-xs">
        <p>{channelTitle}</p>
        <p>{statistics.viewCount} views</p>
      </div>
    </div>
  );
};

export default VideoCard;
