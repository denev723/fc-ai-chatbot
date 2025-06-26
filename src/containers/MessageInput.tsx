import Input from "@/presentationals/Input";
import SendIcon from "@/assets/icons/send.svg";

// TODO: Implement send message
export default function MessageInput() {
  return (
    <div className="relative">
      <Input className="w-full" type="text" />
      <button className="absolute top-13 right-15">
        <SendIcon />
      </button>
    </div>
  );
}
