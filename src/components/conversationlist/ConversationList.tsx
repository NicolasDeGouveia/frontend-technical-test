import React from "react";
import { Conversation } from "../../types/conversation";
import Image from "next/image";

type ConversationListProps = {
  conversation: Conversation;
  userId: number;
  picture_url: string;
};

const ConversationList = ({
  conversation,
  userId,
  picture_url,
}: ConversationListProps) => {
  // Convert the timestamp to a Date object
  const date = new Date(conversation.lastMessageTimestamp * 1000);

  // Get the month and day
  const month = date.toLocaleString("en-US", { month: "short" });
  const day = date.getDate();

  return (
    <div className="p-4 bg-white border border-black rounded-lg hover:bg-gray-100">
      <div className="flex items-center">
        <Image
          src={picture_url}
          width={100}
          height={100}
          alt="profile-pic"
          className="w-[50px] h-[50px] rounded-full object-cover"
        />
        <div className="flex flex-col pl-8">
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
    </div>
  );
};

export default ConversationList;

const pictureStyle = {
  borderRadius: "9999px",
};
