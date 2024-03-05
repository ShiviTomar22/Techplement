
import { connect } from "@/DbConfig/dbconfig";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google") {
        try {
          await connect();

           
        } catch (error) {
          console.log(error);
        }
      }

      return user;
    },
  },
  async signOut({ account, ...args }) {
    return await NextAuth.actions.signOut({ ...args });
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };