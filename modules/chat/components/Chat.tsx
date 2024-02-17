import AnimateEnter from "@/common/components/elements/AnimateEnter";
import Button from "@/common/components/elements/Button";
import Divider from "@/common/components/elements/Divider";
import Title from "@/common/components/elements/Title";
import Typography from "@/common/components/elements/Typography";
import profile from "@/common/constant/profile";
import Link from "next/link";
import React from "react";

function Chat() {
  return (
    <AnimateEnter className="max-w-[854px] max-lg:py-8 lg:w-4/5 lg:pt-8">
      <section className="space-y-6">
        <Title variant="title">Chat</Title>
        <Typography className="leading-relaxed">
          Leave whatever you like to say, suggestions, questions or anything!
        </Typography>
      </section>
      <Divider />
    </AnimateEnter>
  );
}

export default Chat;
