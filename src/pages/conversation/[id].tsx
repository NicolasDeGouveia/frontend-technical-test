import React from "react";
import { useRouter } from "next/router";
import Chat from "../../components/chat/Chat";
type Props = {};

const ConversationPage = ({ messages }) => {
  const router = useRouter();

  return <div className="bg-gray-100">{<Chat messages={messages} />}</div>;
};

export default ConversationPage;

export async function getServerSideProps({ params }) {
  const response = await fetch(`http://localhost:3005/messages/${params.id}`);
  const data = await response.json();

  return {
    props: { messages: data },
  };
}
