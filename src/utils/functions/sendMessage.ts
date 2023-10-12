import { Message } from "../../types/message";

export async function SendMessage(conversationId:number, authorId: number,  newMessage: string, setMessageData:React.Dispatch<React.SetStateAction<Message[]>>,messageData: Message[], setNewMessage:React.Dispatch<React.SetStateAction<string>>){
    // Retrieve the current timestamp  
    const currentTimestamp = Math.floor(Date.now() / 1000);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/messages/${conversationId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "authorId": authorId,
        "conversationId": conversationId,
        "body": newMessage,
        "timestamp": currentTimestamp,
      }),
    });

    if (response.ok) {
      const newMessageData = await response.json();
      setMessageData([...messageData, newMessageData]);
      setNewMessage('');
    } else {
        console.log("error")
    }
  };