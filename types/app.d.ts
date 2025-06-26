interface Message {
  id: string;
  sender: "bot" | "me";
  senderName: string;
  profileImage?: string;
  content: string;
  createdAt: string;
}
