export async function onCreateConversation(userId: number,selectedRecipient: number, selectedRecipientName: string, currentUserName: string, setSuccess: React.Dispatch<React.SetStateAction<string>> , setRefreshData: React.Dispatch<React.SetStateAction<boolean>>, setError:React.Dispatch<React.SetStateAction<string>> ){
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
        setSuccess('La conversation a bien été créé')
        setRefreshData(true)
    } else {
        setError('Un problème est survenu au moment de la création de la conversation. Veuillez réssayer ultérieurement.')
    }
    
  };