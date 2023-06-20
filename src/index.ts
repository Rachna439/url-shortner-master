import "dotenv/config";
// const dotenv = require("dotenv");

// dotenv.config();
import { Server } from "./server";

const server = new Server(process.env.PORT as String);

server.start();
