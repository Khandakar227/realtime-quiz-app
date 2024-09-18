import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";

dotenv.config();

export const app = express();
export const server = http.createServer(app);
export const io = new Server(server, {
    cors: {
      origin: [process.env.CLIENT_URL as string],
    },
  });
