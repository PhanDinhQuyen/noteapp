import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import morgan from "morgan";
import { data } from "./fakeData/index.js";
import * as dotenv from "dotenv";

dotenv.config();

async function main() {
  // The GraphQL schema
  const typeDefs = `#graphql
  type Folder {
    id: String,
    name: String,
    createdAt: String,
    author: Author,
    notes: [Note]
  }

  type Note {
    id: String,
    content: String
  }

  type Author {
    id: String,
    name: String,
  }

  type Query {
    folders: [Folder],
    folder(folderId: String): Folder 
  }
`;

  // A map of functions which return data for the schema.
  const resolvers = {
    Query: {
      folders: () => data.folders,
      folder: (_, args) => {
        const folderId = args.folderId;
        console.log(folderId);
        return data.folders.find((folder) => folder.id === folderId);
      },
      // note: (parent, args) => {},
    },
    Folder: {
      author: (parent) => {
        const authorId = parent.authorId;
        return data.authors.find((auth) => auth.id === authorId);
      },
      notes: (parent, args) => {
        console.log(["parent"], parent);
        // return [];
        return data.notes.filter((note) => note.folderId === parent.id);
      },
    },
  };

  const app = express();
  const httpServer = http.createServer(app);

  // Set up Apollo Server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();

  // app.use(morgan("combined"));
  app.use(
    express.urlencoded({
      extended: true,
    })
  );

  const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
  };
  console.log(corsOptions);
  app.use(cors(corsOptions));
  app.use(express.json(), expressMiddleware(server));

  await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000`);
}

main();
