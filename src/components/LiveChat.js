import { useEffect } from "react";
import ChatMessage from "./ChatMessage";
import { useDispatch } from "react-redux";
import { addMessage } from "../utils/chatSlice";

const LiveChat = () => {
  const dispatch = useDispatch();
  let chatId = 1;

  useEffect(() => {
    //API polling
    const i = setInterval(() => {
      console.log("API polling");

      dispatch(
        addMessage({
          id: chatId++,
          name: "User 1",
          message: "Wow this is live Chat!!",
        })
      );
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
