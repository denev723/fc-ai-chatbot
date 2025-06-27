import useNewMessage from "@/hooks/useNewMessage";
import { isBot } from "@/utils/message";
import { useEffect, useState } from "react";

export default function useMessages(
  bot:
    | {
        name: string;
        profileImage: string;
      }
    | undefined
) {
  const [messages, setMessages] = useState<Message[]>([]);
  const { data: newMessage } = useNewMessage();

  useEffect(() => {
    const message = newMessage?.newMessage;

    if (!message) return;

    setMessages((prev) => [
      ...prev,
      {
        id: message.id,
        sender: message.sender,
        content: message.message,
        createdAt: message.createdAt,
        ...(isBot(message)
          ? {
              senderName: bot?.name ?? "",
              profileImage: bot?.profileImage ?? "",
            }
          : {
              senderName: "",
            }),
      },
    ]);
  }, [newMessage, bot]);

  return { messages };
}
