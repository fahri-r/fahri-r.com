import AnimateEnter from "@/common/components/elements/AnimateEnter";
import Divider from "@/common/components/elements/Divider";
import Title from "@/common/components/elements/Title";
import Typography from "@/common/components/elements/Typography";
import {
  Message,
  sortedMessagesRef,
} from "@/common/libs/firebase/converter/Message";
import React, { createRef, useEffect } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import ChatInput from "./ChatInput";
import { signIn, signOut, useSession } from "next-auth/react";
import ChatBubble from "./ChatBubble";
import { Button } from "@/common/components/elements/button";

function Chat() {
  const { data: session } = useSession();

  const [messages, loading, error] = useCollectionData<Message>(
    sortedMessagesRef()
  );

  const messagesEndRef = createRef<HTMLDivElement>();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, messagesEndRef]);

  return (
    <AnimateEnter className="max-w-2xl flex flex-col">
      <section className="space-y-6">
        <Title variant="title" className="font-sans font-bold">Chat</Title>
        <Typography className="leading-relaxed text-muted-foreground">
          Leave whatever you like to say, suggestions, questions or anything!
        </Typography>
      </section>
      <Divider />
      <section className="grow flex flex-col border border-neutral-700 rounded-3xl overflow-hidden justify-between min-h-screen">
        <div className="flex flex-col overflow-y-scroll">
          <div className="md:p-5">
            {messages?.map((message) => (
              <ChatBubble
                message={message}
                isSender={message.user.email == session?.user.email}
              />
            ))}
          </div>
          <div ref={messagesEndRef} />
        </div>
        {session && <ChatInput />}
      </section>
      <section>
        {session ? (
          <Button
            className="mt-6 w-full rounded-full"
            onClick={() => signOut()}
          >
            Sign out
          </Button>
        ) : (
          <Button
            className="mt-6 w-full rounded-full"
            onClick={() => signIn("google")}
          >
            Sign in with Google
          </Button>
        )}
      </section>
    </AnimateEnter>
  );
}

export default Chat;
