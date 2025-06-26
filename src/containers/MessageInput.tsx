import Input from "@/presentationals/Input";
import SendIcon from "@/assets/icons/send.svg";
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";

const SEND_MESSAGE = gql`
  mutation SendMessage($message: String!) {
    sendMessage(message: $message) {
      message
    }
  }
`;

// TODO: Implement send message
export default function MessageInput() {
  const [content, setContent] = useState("");
  const [sendMessage] = useMutation(SEND_MESSAGE);

  const handleSendMessage = () => {
    sendMessage({ variables: { message: content } });
    setContent("");
  };

  return (
    <div className="relative">
      <Input
        className="w-full"
        type="text"
        value={content}
        onChange={(e) => setContent(e.currentTarget.value)}
      />
      <button className="absolute top-13 right-15" onClick={handleSendMessage}>
        <SendIcon />
      </button>
    </div>
  );
}
