import useIsMobile from "@/common/hooks/useIsMobile";
import { Message } from "@/common/libs/firebase/converter/Message";
import moment from "moment";
import Image from "next/image";
import React from "react";

function ChatBubble({
  message,
  isSender,
}: {
  message: Message;
  isSender: boolean;
}) {
  const isMobile = useIsMobile();
  const avatarImage =
    process.env.NEXT_PUBLIC_EMAIL!! == message.user.email
      ? "/images/avatar.jpg"
      : message.user.image;

  return (
    <div
      className={`flex my-2 items-start p-4 ${
        isSender ? "flex-row-reverse" : "flex-row"
      }`}
    >
      <Image
        alt={message.user.name}
        src={avatarImage}
        width={100}
        height={100}
        className="rounded-full object-cover h-10 w-10"
      />
      <div
        className={
          "flex flex-col relative space-y-2 w-fit line-clamp-1 mx-2 max-w-md text-foreground"
        }
      >
        <div className="flex text-xs gap-3">
          <p className={"line-clamp-1"}>{message.user.name}</p>
          {!isMobile && (
            <p className="text-neutral-400">
              {moment(message.timestamp).format("L LT")}
            </p>
          )}
        </div>
        <p
          className={`px-2.5 bg-input rounded-xl py-1.5 text-sm leading-relaxed w-fit ${
            isSender ? "rounded-tr-none self-end" : "rounded-tl-none self-start"
          }`}
        >
          {message.input}
        </p>
        {isMobile && (
          <p className="text-neutral-400 text-xs">
            {moment(message.timestamp).format("L LT")}
          </p>
        )}
      </div>
    </div>
  );
}

export default ChatBubble;
