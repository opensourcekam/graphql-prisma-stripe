import "reflect-metadata";
import { ApolloServer, gql } from "apollo-server-express";
import { importSchema } from "graphql-import";
import * as express from "express";
import * as session from "express-session";
import * as path from "path";
import * as Stripe from "stripe";

import { prisma } from "./generated/prisma-client";
import { resolvers } from "./resolvers";

const { SESSION_SECRET, STRIPE_SECRET } = process.env;

const stripe = new Stripe(STRIPE_SECRET);
const startServer = async () => {
  const server = new ApolloServer({
    typeDefs: gql(importSchema(path.resolve("src/schema.graphql"))),
    resolvers,
    context: ({ req, res }: any) => ({
      req,
      res,
      stripe,
      db: prisma
    })
  });

  const app = express();

  app.use(
    session({
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false
    })
  );

  server.applyMiddleware({
    app,
    cors: {
      credentials: true,
      origin: "http://localhost:3000"
    }
  });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

startServer();
