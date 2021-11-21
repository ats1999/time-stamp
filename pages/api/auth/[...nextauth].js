import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from "modals/User";
import DB from "lib/db";
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async session({ session }) {
      if (!session) return session;

      // connect DB
      await DB();

      // check if the user is already present or not
      const isUser = await User.findOne({ email: session?.user?.email });
      if (isUser) {
        session.user._id = isUser._id;
        return session;
      }

      // create a new user
      const user = new User({
        email: session.user.email,
        image: session.user.image,
        name: session.user.name,
      });
      await user.save();

      session.user._id = user._id;
      return session;
    },
  },
  debug: true,
  secret: process.env.SECRET,
});
