import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from '../../../lib/mongodb';


export default NextAuth({

   //Configure one or more authentication providers
  providers: [
    GoogleProvider({
     clientId: process.env.GOOGLE_CLIENT_ID,
     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
     //...add more providers here
  ],

  //USING JWT TOKEN SECRET USING AN .ENV FILE

  secret: process.env.JWT_SECRET,

  //CONNECTING TO MONGODB DATABASE USING CLIENTY PROMISE

  adapter:MongoDBAdapter(clientPromise),

  //THE SIGNIN PAGE IS GOING TO BE /HOME ROUTE INSTEAD OF USING A DEAFUALT PAGE
  pages: {

    signIn: "/home",

  },

  //The Session model is used for database sessions. It is not used if JSON Web Tokens are enabled. Keep in mind, that you can use a database to persist Users and Accounts, and still use JWT for sessions.

   session: {

    strategy: "jwt",

  },

});