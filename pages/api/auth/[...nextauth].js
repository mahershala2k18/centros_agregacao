import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import MailchimpProvider from "next-auth/providers/mailchimp";
import FacebookProvider from "next-auth/providers/facebook";
import { use } from "react";

export default NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Enter email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter Password",
        },
      },

      async authorize(credentials, req) {
        const { email, password } = credentials;
        const res = await fetch(
          "https://survey.terrafirma.co.mz:446/auth/user",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-type": "application/x-www-form-urlencoded",
              appid: "next-app",
            },
            body: JSON.stringify({
              email,
              password,
            }),
          }
        );

        const user = await res.json();

        if (res.ok && user) {
          return user;
        } else return null;
      },
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (process.env.NODE_ENV === "development") {
        return baseUrl;
      } else {
        return url;
      }
    },

    //verificar com usar o token que vem do
    //backend nodejs ao invez de usar este aqui apresentado
    async jwt({ token, user }) {
      return { ...token, ...user };
    },

    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.user = token;
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
});
