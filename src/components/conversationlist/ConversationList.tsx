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
    <div className="border border-black p-4 my-4 rounded-lg  mx-auto bg-white max-w-[77rem] m-auto">
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
