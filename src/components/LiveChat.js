import { useEffect } from "react";
import ChatMessage from "./ChatMessage";

const LiveChat = () => {
  useEffect(() => {
    //API polling
    const i = setInterval(() => {
      console.log("API polling");
    }, 2000);

    return () => clearInterval(i);
  }, []);

  return (
    <div className="border border-gray-400 rounded-md w-full aspect-video my-2">
      <ChatMessage name="User 1" message="This is live Chat" />
    </div>
  );
};

export default LiveChat;
