import React, { useEffect, type ReactElement, useState } from "react";
import List from "../components/conversationlist/ConversationList";
import { Conversation } from "../types/conversation";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import CreateConversation from "../components/createconversation/CreateConversation";
import Error from "../components/error/Error";
import Success from "../components/success/Success";
import { useRouter } from "next/router";
import Button from "../components/generic/Button";

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
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/conversations/${userId}`
        );
        const data = await response.json();
        setConversationsData(data);
      } catch (error) {
        console.error(error);
      }
    }
    if (user) {
      getConversationByUser(user.id);
    }
    if (refreshData) {
      setRefreshData(false);
    }
  }, [user, refreshData]);

  return (
    <main>
      {user && (
        <>
          <div
            className="flex justify-center px-4 py-2 m-auto mt-2 mb-4 rounded-lg w-fit"
            onClick={() => {
              setToggleButton(true);
            }}
          >
            <Button name="Nouvelle Conversation" />
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
        </>
      )}
      <div className="flex flex-col items-center justify-center ">
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
    </main>
  );
};

export default Home;
