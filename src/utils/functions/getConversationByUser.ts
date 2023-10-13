import { Conversation } from "../../types/conversation";

export async function getConversationByUser(userId: number, setConversationsData:React.Dispatch<React.SetStateAction<Conversation[]>>) {
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