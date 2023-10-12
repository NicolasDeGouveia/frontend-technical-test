import React, { useEffect, type ReactElement, useState } from "react";
import List from "../components/conversationlist/ConversationList";
import { Conversation } from "../types/conversation";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import CreateConversation from "../components/createconversation/CreateConversation";
import Error from "../components/error/Error";
import Success from "../components/success/Success";

const Home = (): ReactElement => {
  const [conversationsData, setConversationsData] = useState<Conversation[]>(
    []
  );
  const [toggleButton, setToggleButton] = useState<boolean>(false);
  const [refreshData, setRefreshData] = useState<boolean>(false);
  const [error, setError] = useState<string>(undefined);
  const [success, setSuccess] = useState<string>(undefined);
  const { user } = useAuth();

  useEffect(() => {
    async function getConversationByUser(userId: number) {
      const response = await fetch(
        `http://localhost:3005/conversations/${userId}`
      );
      const data = await response.json();
      setConversationsData(data);
    }
    if (user) {
      getConversationByUser(user.id);
    }
  }, [user, refreshData]);

  return (
    <>
      <div
        className="flex justify-center mb-4"
        onClick={() => setToggleButton(true)}
      >
        <button>Nouvelle conversation</button>
      </div>
      {error && <Error errorMessage={error} />}
      {success && <Success successMessage={success} />}
      {toggleButton && (
        <CreateConversation
          conversations={conversationsData}
          setError={setError}
          setRefreshData={setRefreshData}
          setToggleButton={setToggleButton}
          setSuccess={setSuccess}
        />
      )}
      <div className="flex flex-col items-center justify-center h-screen">
        {user && (
          <>
            {conversationsData.map((conversation: Conversation, index) => (
              <React.Fragment
                key={`${conversation.recipientId}-${conversation.senderId}`}
              >
                <Link
                  className="w-3/4 md:w-2/4"
                  href={`/conversation/${conversation.id}`}
                >
                  <List conversation={conversation} userId={user.id} />
                </Link>
              </React.Fragment>
            ))}
          </>
        )}
        {!user && (
          <div>
            Merci de vous connecter afin de voir ou commencer une conversation.
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
