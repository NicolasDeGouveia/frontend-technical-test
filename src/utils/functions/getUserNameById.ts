import { Message } from "../../types/message";

export async function getUserNameById(messageData:Message[], authorNameMap:{}, setAuthorNameMap:React.Dispatch<React.SetStateAction<{}>>){
      const uniqueAuthorIds = Array.from(
        new Set(messageData.map((message) => message.authorId))
      );

      for (const authorId of uniqueAuthorIds) {
        if (!authorNameMap[authorId]) {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/user/${authorId}`
          );
          if (response.ok) {
            const userData = await response.json();

            setAuthorNameMap((prevMap) => ({
              ...prevMap,
              [authorId]: userData[0].nickname,
            }));
          }
        }
      }
    };