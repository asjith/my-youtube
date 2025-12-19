import profileURL from "../icons/profile.png";

const ChatMessage = ({ name, message }) => {
  return (
    <div className="flex items-center gap-1 text-xs p-2 m-2 bg-gray-200 rounded-md">
      <img className="w-7 h-7" alt="user" src={profileURL} />
      <div>
        <span className="text-gray-600">@{name}: </span>
        <span>{message}</span>
      </div>
    </div>
  );
};

export default ChatMessage;
