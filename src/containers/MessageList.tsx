import Message from "@/presentationals/Message";

export default function MessageList() {
  // TODO: data fetching

  return (
    <div className="flex flex-col px-16 py-18">
      {DUMMY_DATA.map((message, index) => {
        const first =
          index === 0 || DUMMY_DATA[index - 1].sender !== message.sender;
        return (
          <Message
            key={message.id}
            message={message}
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
    content: "Hello, how are you?",
    createdAt: "2021-01-01T10:10:10",
    profileImage: "https://picsum.photos/150",
  },
  {
    id: "2",
    sender: "bot",
    content: "I'm good, thank you!",
    createdAt: "2021-01-01T10:12:10",
    profileImage: "https://picsum.photos/150",
  },
  {
    id: "3",
    sender: "me",
    content: "I'm good, thank you!",
    createdAt: "2021-01-01T10:14:10",
    profileImage: "https://picsum.photos/150",
  },
  {
    id: "4",
    sender: "me",
    content: "I'm good, thank you!",
    createdAt: "2021-01-01T10:16:10",
    profileImage: "https://picsum.photos/150",
  },
  {
    id: "5",
    sender: "bot",
    content: "I'm good, thank you!",
    createdAt: "2021-01-01T10:18:10",
    profileImage: "https://picsum.photos/150",
  },
];
