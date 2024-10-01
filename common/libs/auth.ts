import { FirestoreAdapter } from "@auth/firebase-adapter";
import { NextAuthOptions } from "next-auth";
import Google from "next-auth/providers/google";
import { adminAuth, adminDB } from "@/common/libs/firebase/firebase-admin";
import { Adapter } from "next-auth/adapters";

const auth: NextAuthOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      if (session.user) {
        if (token.sub) {
          session.user.id = token.sub;

          const firebaseToken = await adminAuth.createCustomToken(token.sub);
          session.firebaseToken = firebaseToken;
        }
      }

      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  adapter: FirestoreAdapter(adminDB) as Adapter,
};

export default auth;
