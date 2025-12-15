import { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../utils/chatSlice";
import openai from "../utils/openai";

const LiveChat = () => {
  const chatId = useRef(0);
  const dispatch = useDispatch();
  const chatMessage = useSelector((store) => store.chat);

  useEffect(() => {
    //API polling
    const i = setInterval(async () => {
      const response = await openai.responses.create({
        model: "gpt-5-nano",
        input:
          "I am trying to build a live chat section in my front-end YouTube project. I want you to generate an object where it contains a key named name(with quotes) with value as a name of the user, some random name can be used and the object should also contain a message key(with quotes) with value as a message which might contain maximum words of 10 or less than 10. Send the object alone, no other writings. Return a valid JSON",
      });

      const responseObject = JSON.parse(response.output_text);

      dispatch(
        addMessage({
          id: chatId.current++,
          name: responseObject.name,
          message: responseObject.message,
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
