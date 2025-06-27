import Input from "@/presentationals/Input";
import SendIcon from "@/assets/icons/send.svg";
import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import useForm from "@/hooks/useForm";

const SEND_MESSAGE = gql`
  mutation SendMessage($message: String!) {
    sendMessage(message: $message) {
      message
    }
  }
`;

// TODO: Implement send message
export default function MessageInput() {
  const { register, handleSubmit } = useForm<{ content: string }>();
  const [sendMessage] = useMutation(SEND_MESSAGE);

  const handleSendMessage = ({ content }: { content: string }) => {
    sendMessage({ variables: { message: content } });
  };

  return (
    <form className="relative" onSubmit={handleSubmit(handleSendMessage)}>
      <Input className="w-full" type="text" {...register("content")} />
      <button className="absolute top-13 right-15" type="submit">
        <SendIcon />
      </button>
    </form>
  );
}
