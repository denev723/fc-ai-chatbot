import Message from "@/presentationals/Message";
import { gql, useSubscription } from "@apollo/client";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

const NEW_MESSAGE_SUBSCRIPTION = gql`
  subscription NewMessage {
    newMessage {
      id
      sender
      message
      createdAt
    }
  }
`;

export default function MessageList() {
  const { data: bot } = useQuery({
    queryKey: ["bot"],
    queryFn: (): Promise<{ name: string; profileImage: string }> => {
      return fetch("/api/bot").then((res) => res.json());
    },
  });
  const [messages, setMessages] = useState<
    Omit<Message, "senderName" | "profileImage">[]
  >([]);
  // TODO: data fetching
  const { data } = useSubscription(NEW_MESSAGE_SUBSCRIPTION);

  useEffect(() => {
    const newMessage = data?.newMessage;
    if (!newMessage) return;
    setMessages((prev) => [
      ...prev,
      {
        id: newMessage.id,
        sender: newMessage.sender,
        content: newMessage.message,
        createdAt: newMessage.createdAt,
      },
    ]);
  }, [data]);

  return (
    <div className="flex flex-col px-16 py-18">
      {messages.map((message, index, arr) => {
        const first = index === 0 || arr[index - 1].sender !== message.sender;
        return (
          <Message
            key={message.id}
            message={{
              ...message,
              senderName: message.sender === "me" ? "" : bot?.name ?? "",
              profileImage:
                message.sender === "me" ? "" : bot?.profileImage ?? "",
            }}
            mine={message.sender === "me"}
            first={first}
          />
        );
      })}
    </div>
  );
}

const DUMMY_DATA: Message[] = [
  {
    id: "1",
    sender: "bot",
    senderName: "봇",
    content: "Hello, how are you?",
    createdAt: "2021-01-01T10:10:10",
    profileImage: "https://picsum.photos/150",
  },
  {
    id: "2",
    sender: "bot",
    senderName: "봇",
    content: "I'm good, thank you!",
    createdAt: "2021-01-01T10:12:10",
    profileImage: "https://picsum.photos/150",
  },
  {
    id: "3",
    sender: "me",
    senderName: "",
    content: "I'm good, thank you!",
    createdAt: "2021-01-01T10:14:10",
    profileImage: "https://picsum.photos/150",
  },
  {
    id: "4",
    sender: "me",
    senderName: "",
    content: "I'm good, thank you!",
    createdAt: "2021-01-01T10:16:10",
    profileImage: "https://picsum.photos/150",
  },
  {
    id: "5",
    sender: "bot",
    senderName: "봇",
    content: "I'm good, thank you!",
    createdAt: "2021-01-01T10:18:10",
    profileImage: "https://picsum.photos/150",
  },
];
