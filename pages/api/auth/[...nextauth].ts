import { authOptions } from "@/common/libs/auth/authOptions";
import NextAuth from "next-auth";

const handler = NextAuth(authOptions);

export default handler;
