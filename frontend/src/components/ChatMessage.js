import profileURL from "../icons/profile.png";

const ChatMessage = ({ name, message }) => {
  const hasLongWords = message.split(" ").some((word) => {
    if (word.length > 20) return true;
    return false;
  });

  return (
    <div className="flex items-start gap-1 text-xs p-2 m-2 bg-gray-200 rounded-md">
      <img className="w-7 h-7" alt="user" src={profileURL} />
      <div className={hasLongWords ? "break-all" : ""}>
        <span className="text-gray-600">@{name}: </span>
        <span>{message}</span>
      </div>
    </div>
  );
};

export default ChatMessage;
