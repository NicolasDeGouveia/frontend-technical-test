import React from "react";
import { Conversation } from "../../types/conversation";

type ConversationListProps = {
  conversation: Conversation;
  userId: number;
};

const ConversationList = ({ conversation, userId }: ConversationListProps) => {
  // Convert the timestamp to a Date object
  const date = new Date(conversation.lastMessageTimestamp * 1000);

  // Get the month and day
  const month = date.toLocaleString("en-US", { month: "short" }); // Change 'short' to 'long' for the full month name
  const day = date.getDate();

  return (
    <div className={`${style.card}`}>
      <div className="flex flex-col">
        <div className="font-bold">
          {conversation.recipientId === userId
            ? conversation.senderNickname
            : conversation.recipientNickname}
        </div>
        <div className="mt-4">
          {month} {day}
        </div>
      </div>
    </div>
  );
};

export default ConversationList;

const style = {
  card: "rounded-lg mx-auto max-w-[77rem] relative border-2 border-black bg-transparent py-2.5 px-5 my-4 font-medium uppercase text-black transition-colors before:absolute before:left-0 before:top-0 before:-z-10 before:h-full before:w-full before:origin-top-left before:scale-x-0 before:bg-blue-500 before:transition-transform before:duration-300 before:content-[''] hover:text-white before:hover:scale-x-100 hover:border-white",
};
