import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { db } from "./db";
import { Role } from "@prisma/client";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.image = token.picture;
        session.user.username = token.username;
        session.user.phone = token.phone;
        session.user.role = token.role;
      }

      return session;
    },

    async jwt({ token, user }) {
      const dbUser = await db.user.findUnique({
        where: {
          email: token.email!,
        },
      });

      if (!dbUser) {
        token.id = user!.id;
        return token;
      }

      if (!dbUser.username) {
        await db.user.update({
          where: {
            id: dbUser.id,
          },
          data: {
            username: dbUser.email?.split("@")[0].toLowerCase(),
          },
        });
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
        username: dbUser.username,
        role: dbUser.role,
        phone: dbUser.phone,
      };
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth",
  },
};

export const getAuthSession = () => getServerSession(authOptions);
