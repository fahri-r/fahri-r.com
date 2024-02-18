import AnimateEnter from "@/common/components/elements/AnimateEnter";
import Divider from "@/common/components/elements/Divider";
import Title from "@/common/components/elements/Title";
import Typography from "@/common/components/elements/Typography";
import {
  Message,
  sortedMessagesRef,
} from "@/common/libs/firebase/converter/Message";
import React from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import ChatInput from "./ChatInput";
import { signIn, signOut, useSession } from "next-auth/react";
import ChatBubble from "./ChatBubble";
import Button from "@/common/components/elements/Button";

function Chat() {
  const { data: session } = useSession();

  const [messages, loading, error] = useCollectionData<Message>(
    sortedMessagesRef()
  );

  return (
    <AnimateEnter className="max-w-[854px] max-lg:py-8 lg:w-4/5 lg:pt-8 flex flex-col">
      <section className="space-y-6">
        <Title variant="title">Chat</Title>
        <Typography className="leading-relaxed">
          Leave whatever you like to say, suggestions, questions or anything!
        </Typography>
      </section>
      <Divider />
      <section className="grow flex flex-col border border-neutral-700 rounded-3xl overflow-hidden h-96 justify-between">
        <div className="flex flex-col overflow-y-scroll">
          <div className="p-5">
            {messages?.map((message) => (
              <ChatBubble
                message={message}
                isSender={message.user.email == session?.user.email}
              />
            ))}
          </div>
        </div>
        <ChatInput />
      </section>
      <section>
        <Button
          className="mt-6 w-full rounded-full"
          onClick={() => signIn("google")}
        >
          Login
        </Button>
        <Button className="mt-6 w-full rounded-full" onClick={() => signOut()}>
          Logout
        </Button>
      </section>
    </AnimateEnter>
  );
}

export default Chat;
