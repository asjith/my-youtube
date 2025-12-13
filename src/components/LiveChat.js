import ChatMessage from "./ChatMessage";

const LiveChat = () => {
  return (
    <div className="border border-gray-400 rounded-md w-full aspect-video my-2">
      <ChatMessage name="User 1" message="This is live Chat" />
    </div>
  );
};

export default LiveChat;
