
import CredentialsProvider from "next-auth/providers/credentials";
import { emailRegex, nameRegex, passwordRegex } from "./regex";
import bcryptjs from "bcryptjs";
import { prisma } from "./prisma";

export const nextAuthConfig = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/sign-in",
    signUp: "/sign-up",
  },
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  providers: [
    CredentialsProvider({
      id: "sign-in",
      type: "credentials",
      async authorize(credentials) {
        const { email, password } = credentials;

        if (!email || !password) throw new Error("Invalid credentials");

        if (!emailRegex.test(email) || !passwordRegex.test(password))
          throw new Error("Invalid credentials");

        const user = await prisma.users.findUnique({ where: { email } });

        if (!user) throw new Error("User with this email does not exist");

        const passwordCompare = await bcryptjs.compare(
          password,
          user.hashPassword
        );

        if (!passwordCompare) {
          throw new Error("Email or Password is incorrect");
        }

        return {
          id: user.id,
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
        };
      },
    }),
    CredentialsProvider({
      id: "sign-up",
      type: "credentials",
      async authorize(credentials) {
        const { firstName, lastName, email, password } = credentials;

        if (!firstName || !lastName || !email || !password)
          throw new Error("Invalid credentials");

        if (
          !nameRegex.test(`${firstName} ${lastName}`) ||
          !emailRegex.test(email) ||
          !passwordRegex.test(password)
        )
          throw new Error("Invalid credentials");

        const user = await prisma.users.findUnique({ where: { email } });

        if (user) throw new Error("User already exists");

        const hashPassword = await bcryptjs.hash(
          password,
          Number(process.env.HASH_SALT)
        );

        const newUser = await prisma.users.create({
          data: {
            firstName,
            lastName,
            email,
            hashPassword,
          },
        });

        if (newUser)
          return {
            id: newUser.id,
            name: `${newUser.firstName} ${newUser.lastName}`,
            email: newUser.email,
          };

        throw new Error("Something went wrong. Please try again");
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          randomKey: token.randomKey,
        },
      };
    },
    jwt: ({ token, user }) => {
      if (user) {
        return {
          ...token,
          id: user.id,
          randomKey: user.randomKey,
        };
      }
      return token;
    },
  },
  // Other NextAuth configuration options
};
