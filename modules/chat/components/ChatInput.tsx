import { useSession } from "next-auth/react";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/common/components/elements/Form";
import Button from "@/common/components/elements/Button";
import { addDoc, serverTimestamp } from "firebase/firestore";
import { messagesRef } from "@/common/libs/firebase/converter/Message";
import Image from "next/image";

const formSchema = z.object({
  input: z.string().max(1000),
});

function ChatInput() {
  const { data: session } = useSession();
  const avatarImage =
    process.env.RESEND_TO!! == session?.user.email
      ? "/images/avatar.jpg"
      : session?.user.image;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      input: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const formCopy = values;
    form.reset();

    if (formCopy.input.length === 0) {
      return;
    }

    if (!session?.user) {
      return;
    }

    const userToStore = {
      id: session.user.id!,
      name: session.user.name!,
      email: session.user.email!,
      image: session.user.image || "",
    };

    addDoc(messagesRef(), {
      input: formCopy.input,
      timestamp: serverTimestamp(),
      user: userToStore,
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-center space-x-2 p-2 rounded-b-3xl max-w-4xl mx-auto bg-input w-full"
        autoComplete="off"
      >
        <Image
          src={avatarImage ?? "/images/avatar-placeholder.png"}
          alt={session?.user.name ?? "Avatar"}
          width={100}
          height={100}
          className="rounded-full w-8 h-8 object-cover"
        />
        <FormField
          control={form.control}
          name="input"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <input
                  className="w-full appearance-none rounded-lg bg-input p-2 text-sm text-neutral-400 outline-none duration-300 placeholder:text-neutral-400"
                  placeholder="Enter message..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="px-6 rounded-full py-1.5">
          Send
        </Button>
      </form>
    </Form>
  );
}

export default ChatInput;
