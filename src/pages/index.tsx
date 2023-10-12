import React, { useEffect, type ReactElement, useState } from "react";
import { getLoggedUserId } from "../utils/getLoggedUserId";
import List from "../components/conversationlist/ConversationList";
import { Conversation } from "../types/conversation";
import Link from "next/link";

const Home = (): ReactElement => {
  const [conversationsData, setConversationsData] = useState<Conversation[]>(
    []
  );
  const user = getLoggedUserId();

  useEffect(() => {
    async function getConversationByUser(userId: number) {
      const response = await fetch(
        `http://localhost:3005/conversations/${userId}`
      );
      const data = await response.json();
      setConversationsData(data);
    }
    getConversationByUser(user);
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 ">
      {conversationsData.map((conversation: Conversation, index) => (
        <React.Fragment
          key={`${conversation.recipientId}-${conversation.senderId}`}
        >
          <Link
            className="w-3/4 md:w-2/4"
            href={`/conversation/${conversation.id}`}
          >
            <List conversation={conversation} userId={user} />
          </Link>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Home;
