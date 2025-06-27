import next from "next";
import express from "express";
import { createServer } from "http";
import dotenv from "dotenv";
import { WebSocketServer } from "ws";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { resolvers, typeDefs } from "./schema";
import { ApolloServer } from "@apollo/server";
import { useServer as createWSServer } from "graphql-ws/lib/use/ws";
import { expressMiddleware } from "@as-integrations/express4";
import cors from "cors";

dotenv.config();

async function start() {
  const dev = process.env.NODE_ENV !== "production";

  const app = express();
  const nextApp = next({ dev });
  const httpServer = createServer(app);
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql",
  });
  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const serverCleanup = createWSServer({ schema }, wsServer);
  const apolloServer = new ApolloServer({
    schema,
    plugins: [
      {
        async serverWillStart() {
          return {
            async drainServer() {
              serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });
  await apolloServer.start();

  const handle = nextApp.getRequestHandler();

  await nextApp.prepare();

  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(apolloServer)
  );
  app.all("*", (req, res) => handle(req, res));

  httpServer.on("upgrade", (req, socket, head) => {
    if (req.url?.startsWith("/graphql")) {
      wsServer.handleUpgrade(req, socket, head, () => {
        wsServer.emit("connection", socket, req);
      });
    }
  });

  httpServer.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
}

start();
