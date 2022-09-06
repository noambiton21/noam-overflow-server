const express = require("express");
const http = require("http");
const { connectDB, disconnectDB } = require("../database/database");
const bodyParser = require("body-parser");
const { applyRouteMiddleware } = require("./middlewares/routeMiddleware");
const cors = require("cors");
const { config } = require("../config/index");
const verifyJwt = require("./middlewares/verifyJwt");
const authController = require("../controllers/authController");

const server = async () => {
  const app = express();
  app.use(cors({ "Access-Control-Allow-Origin": "*" }));
  app.use(express.json());
  await connectDB(config.mongo_url);
  app.use("/login", authController);
  app.all("/api/*", verifyJwt);
  applyRouteMiddleware(app);
  startServer(app);
  return app;
};

const startServer = (app) => {
  app.set("port", config.expressPort);
  const httpServer = http.createServer(app);

  httpServer.listen(config.expressPort);
  console.log("server is up and listening on port:" + config.expressPort);

  return httpServer;
};

const endServer = async (app) => {
  httpServer.close(() =>
    console.log(`Ended server listening on port ${config.expressPort}`)
  );

  await disconnectDB(config.mongo_url);
};

module.exports = { server, startServer, endServer };

server();
