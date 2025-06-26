import MessageBubble from "@/presentationals/MessageBubble";
import ProfileImage from "@/presentationals/ProfileImage";
import TextView from "@/presentationals/TextView";
import { formatTime } from "@/util/time";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";

interface Props {
  mine: boolean;
  first: boolean;
  message: Message;
}

export default function Message({
  message: { sender, content, profileImage, createdAt: at, senderName },
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
            {senderName}
          </TextView>
        )}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 20 }}
        >
          <MessageBubble mine={mine} first={first}>
            {content}
          </MessageBubble>
        </motion.div>
      </div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <TextView size="sm">{formatTime(at)}</TextView>
      </motion.span>
    </div>
  );
}
