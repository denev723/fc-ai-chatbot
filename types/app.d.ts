interface Message {
  id: string;
  sender: "bot" | "me";
  profileImage?: string;
  content: string;
  createdAt: string;
}
