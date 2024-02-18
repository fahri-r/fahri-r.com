import auth from "@/common/libs/auth";
import NextAuth from "next-auth";

const handler = NextAuth(auth);

export default handler;
