import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import mongoose from "mongoose";
import { resolvers } from "./resolvers.js";
import { typeDefs } from "./models/typeDefs.js";

mongoose.set("strictQuery", true);
const db = await mongoose.connect("mongodb://localhost:27017/marn", {
  useNewUrlParser: true,
});

console.info("📚 Connected to db", db?.connections[0]?._connectionString);

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.info(`🚀 Server ready at ${url}`);
