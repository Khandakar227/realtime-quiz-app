import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import { EV_NAMES } from "./config/socket";
import { broadcast } from "./controllers/broadcast";
import { quizController } from "./controllers/quizcontroller";

dotenv.config();
const app = express();
app.use(cors);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
  },
});

io.on(EV_NAMES.CONNECTION, (s: Socket) => {
  // Broadcast Quiz info to all visitors
  broadcast(io);
  // Get answers from the user
  s.on(EV_NAMES.QUIZ, async (data) => quizController(s, data));
});

const port = process.env.PORT || 7071;

server.listen(port, () =>
  console.log(`Server started running at PORT ${port}...`)
);
