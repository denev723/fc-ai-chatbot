import Image from "next/image";
import { Inter } from "next/font/google";
import Header from "@/presentationals/Header";
import MessageInput from "@/containers/MessageInput";
import MessageList from "@/containers/MessageList";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className={`flex flex-col h-full w-full ${inter.className}`}>
      <Header title="Home" />
      <main className="flex-1">
        <MessageList />
      </main>
      <div className="py-10 px-20 bg-[#f2f2f7]">
        <MessageInput />
      </div>
    </div>
  );
}

// function Bot() {
//   const { data } = useQuery({
//     queryKey: ["bot"],
//     queryFn: (): Promise<{ name: string; profileImage: string }> => {
//       return fetch("/api/bot").then((res) => res.json());
//     },
//   });
//   return data ? (
//     <div>
//       <ProfileImage src={data.profileImage} alt={data.name} />
//     </div>
//   ) : null;
// }
