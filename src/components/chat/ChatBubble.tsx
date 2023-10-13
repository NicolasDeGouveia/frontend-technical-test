import React from "react";
import { Message } from "../../types/message";
import moment from "moment";

type ChatBubbleProps = {
  message: Message;
  authorNameMap: {};
  authorId: number;
};

const ChatBubble = ({ message, authorNameMap, authorId }: ChatBubbleProps) => {
  return (
    <div
      key={message.id}
      className={`${
        message.authorId === authorId
          ? "self-end bg-blue-500 text-white"
          : "self-start bg-white"
      } rounded-lg p-2 flex items-start flex-col `}
    >
      <span className="font-bold ">
        {authorNameMap[message.authorId] || "Unknown User"}
      </span>
      <p className="py-2 text-lg">{message.body}</p>
      <div className="text-xs">
        {moment.unix(message.timestamp).format("MM/DD/YY, h:mmA")}
      </div>
    </div>
  );
};

export default ChatBubble;
