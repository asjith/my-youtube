import { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../utils/chatSlice";

const LiveChat = () => {
  const chatId = useRef(0);
  const dispatch = useDispatch();
  const chatMessage = useSelector((store) => store.chat);

  useEffect(() => {
    //API polling
    const i = setInterval(() => {
      console.log("API polling");

      dispatch(
        addMessage({
          id: chatId.current++,
          name: "User" + chatId.current,
          message: "Wow this is live Chat!!",
        })
      );
    }, 2000);

    return () => clearInterval(i);
  }, []);

  return (
    <div className="border border-gray-400 rounded-md w-full aspect-video my-2 flex flex-col-reverse overflow-y-scroll">
      {chatMessage.map((chat) => (
        <ChatMessage key={chat.id} name={chat.name} message={chat.message} />
      ))}
    </div>
  );
};

export default LiveChat;
