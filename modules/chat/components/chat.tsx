import {
  Message,
  sortedMessagesRef,
} from "@/common/libs/firebase/converter/message";
import React, { createRef, useEffect } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import ChatInput from "../../../common/components/chat-input";
import { signIn, signOut, useSession } from "next-auth/react";
import ChatBubble from "../../../common/components/chat-bubble";
import { Button } from "@/common/components/elements/button";
import BlurFade from "@/common/components/elements/blur-fade";

const BLUR_FADE_DELAY = 0.04;

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
    <BlurFade className="max-w-2xl flex flex-col">
      <BlurFade delay={BLUR_FADE_DELAY}>
        <h1 className="font-sans text-xl font-bold">Guest Book</h1>
      </BlurFade>
      <BlurFade delay={BLUR_FADE_DELAY * 2}>
        <p className="leading-relaxed text-muted-foreground mb-4 text-sm">
          Leave whatever you like to say, suggestions, questions or anything!
        </p>
      </BlurFade>
      <section className="grow flex flex-col border border-neutral-700 rounded-3xl overflow-hidden justify-between min-h-96">
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
    </BlurFade>
  );
}

export default Chat;
