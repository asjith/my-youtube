import profileURL from "../icons/profile.png";

const Comment = ({ info }) => {
  return (
    <div className="flex gap-1 bg-gray-200 rounded-md p-2 my-2">
      <img className="w-7 h-7" src={profileURL} alt="user"></img>
      <div className="text-xs">
        <p className="font-bold mb-1">{info.name}</p>
        <p>{info.text}</p>
        <div className="border-l-2 border-gray-400">
          {info.replies?.length > 0 &&
            info.replies.map((replyComment) => <Comment info={replyComment} />)}
        </div>
      </div>
    </div>
  );
};

export default Comment;
