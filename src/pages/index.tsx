import React, { useEffect, type ReactElement, useState } from "react";
import { getLoggedUserId } from "../utils/getLoggedUserId";
import List from "../components/list/List";
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
    <div className="max-w-[77rem] m-auto h-screen flex flex-col justify-center items-center">
      {conversationsData.map((conversation: Conversation, index) => (
        <React.Fragment
          key={`${conversation.recipientId}-${conversation.senderId}`}
        >
          <Link className="w-full" href={`/conversation/${conversation.id}`}>
            <List conversation={conversation} userId={user} />
          </Link>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Home;
