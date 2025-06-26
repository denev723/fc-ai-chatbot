import MessageBubble from "@/presentationals/MessageBubble";
import ProfileImage from "@/presentationals/ProfileImage";
import TextView from "@/presentationals/TextView";
import { formatTime } from "@/util/time";
import { twMerge } from "tailwind-merge";

interface Props {
  mine: boolean;
  first: boolean;
  message: Message;
}

export default function Message({
  message: { sender, content, profileImage, createdAt: at },
  mine,
  first,
}: Props) {
  return (
    <div
      className={twMerge(
        "flex items-end gap-x-5",
        mine ? "flex-row-reverse" : "flex-row",
        first ? "mt-17 first-of-type:mt-0" : "mt-11"
      )}
    >
      {!mine &&
        profileImage &&
        (first ? (
          <ProfileImage src={profileImage} className="self-center mr-3" />
        ) : (
          <span className="inline-block w-40 mr-3" />
        ))}
      <div className="flex flex-col">
        {!mine && first && (
          <TextView className="mb-7" size="md">
            {sender}
          </TextView>
        )}
        <MessageBubble mine={mine} first={first}>
          {content}
        </MessageBubble>
      </div>
      <TextView size="sm">{formatTime(at)}</TextView>
    </div>
  );
}
