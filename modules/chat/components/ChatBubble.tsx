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
  return (
    <div
      className={`flex my-2 items-start p-4 ${
        isSender ? "flex-row-reverse" : "flex-row"
      }`}
    >
      <Image
        alt="message.user.name"
        src={message.user.image}
        width={40}
        height={40}
        className="rounded-full"
      />
      <div
        className={
          "flex flex-col relative space-y-2 w-fit line-clamp-1 mx-2 max-w-md text-foreground"
        }
      >
        <div className="flex text-xs gap-3">
          <p className={"line-clamp-1"}>{message.user.name}</p>
          <p className="text-neutral-400">
            {moment(message.timestamp).format("lll")}
          </p>
        </div>
        <p
          className={`px-2.5 bg-input rounded-xl py-1.5 ${
            isSender ? "rounded-tr-none" : "rounded-tl-none"
          }`}
        >
          {message.input}
        </p>
      </div>
    </div>
  );
}

export default ChatBubble;
