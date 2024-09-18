import { Server } from "socket.io";
import { QuizDetails } from "../lib/quizDetails";
import { QUIZ_STATUS } from "../config/socket";

export const broadcast = async (io: Server) => {
  QuizDetails.status = await QuizDetails.getStatus();
  if (QuizDetails.status == QUIZ_STATUS.NOT_STARTED) QuizDetails.handleNotStarted(io);
  else if (QuizDetails.status == QUIZ_STATUS.STARTED) QuizDetails.handleStarted(io);
  else if (QuizDetails.status == QUIZ_STATUS.ENDED) QuizDetails.handleEnded(io);
}