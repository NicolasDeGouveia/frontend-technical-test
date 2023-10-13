import { notifyMsgError, notifyMsgSuccess } from "../notify/Notify";

export async function onCreateConversation(userId: number,selectedRecipient: number, selectedRecipientName: string, currentUserName: string,  setRefreshData: React.Dispatch<React.SetStateAction<boolean>> ){
    // Retrieve the current timestamp  
    const currentTimestamp = Math.floor(Date.now() / 1000);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/conversations/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "recipientId": selectedRecipient,
        "recipientNickname": selectedRecipientName,
        "senderId": userId,
        "senderNickname": currentUserName,
        "lastMessageTimestamp": currentTimestamp
      }),
    });

    if (response.ok) {
      notifyMsgSuccess('La conversation a bien été créé')
      setRefreshData(true)
    } else {
      notifyMsgError('Un problème est survenu. Veuillez réssayer ultérieurement.')
    }
    
  };