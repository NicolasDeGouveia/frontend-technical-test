import React from "react";
import Chat from "../../components/chat/Chat";
import { getCookie } from "cookies-next";
import { notFound } from "next/navigation";

const ConversationPage = ({ messages, conversationId }) => {
  return (
    <div className="bg-gray-100">
      {<Chat messages={messages} conversationId={conversationId} />}
    </div>
  );
};

export default ConversationPage;

export async function getServerSideProps({ req, res, params }) {
  const cookie = getCookie("userToken", { req, res });
  const response = await fetch(`http://localhost:3005/messages/${params.id}`);
  const data = await response.json();

  if (!cookie) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  return {
    props: { messages: data, conversationId: params.id },
  };
}
