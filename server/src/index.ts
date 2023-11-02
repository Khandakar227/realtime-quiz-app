import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import { EV_NAMES } from "./config/socket";
import { broadcast } from "./controllers/broadcast";
import { quizController } from "./controllers/quizcontroller";
import adminRoute from "./routes/admin";
import { connect } from "mongoose";
import questionRoute from "./routes/question";


dotenv.config();
const app = express();
app.use(cors({
  origin: [process.env.CLIENT_URL as string],
  methods: '*',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = http.createServer(app);

// Connect to mongodb
connect(process.env.MONGODB_URL as string, { dbName: process.env.DBNAME })
.then((_) => console.log("Connected to database"))
.catch((error) => { console.log("connection failed! ", error) });


const io = new Server(server, {
  cors: {
    origin: [process.env.CLIENT_URL as string],
  },
});

io.on(EV_NAMES.CONNECTION, (s: Socket) => {
  // Broadcast Quiz info to all visitors
  broadcast(io);
  // Get answers from the user
  s.on(EV_NAMES.QUIZ, async (data) => quizController(s, data));
});

app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/question", questionRoute);

const socketPort = process.env.SOCKET_PORT || 7071;

server.listen(socketPort, () =>
console.log(`Socket Server started running at PORT ${socketPort}...`)
);
