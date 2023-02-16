import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

import http from "http";
import cors from "cors";
import morgan from "morgan";
import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";

import { typeDefs } from "./src/typeDefs/index.js";
import resolvers from "./src/resolvers/index.js";
import { jwtAuth } from "./src/middlewares/jwt.google.js";

import "./firebase.config.js";
dotenv.config();

const app = express();
const httpServer = http.createServer(app);
const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(cors(corsOptions));
app.use(express.json());
app.use(
  jwtAuth,
  expressMiddleware(server, {
    context: async ({ res }) => {
      return {
        uid: res.locals.uid,
      };
    },
  })
);
app.use(morgan("combined"));
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Set up Apollo Server
const PORT = process.env.PORT || 4000;
mongoose.set("strictQuery", true);
mongoose.connect(
  process.env.MONGODB_URL,
  {
    autoIndex: false,
  },
  async (err) => {
    if (err) throw new Error(err);
    console.log("Connected to Mongoose successfully!");
    await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
    console.log(`🚀 Server ready at http://localhost:${PORT}`);
  }
);
