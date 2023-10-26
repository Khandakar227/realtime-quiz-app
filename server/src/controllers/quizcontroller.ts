import { Socket } from "socket.io";
import fireAdmin from "../lib/firebase";
import { getCountdown, getQuizStatus } from "../lib";
import { EV_NAMES, QUIZ_STATUS } from "../config/socket";

export const quizController = async (s: Socket, data: any) => {
  let interval: NodeJS.Timeout;
  const token = data.token;

  if (!token) s.data = {};
  else {
    const payload = await fireAdmin.auth().verifyIdToken(token);
    s.data = payload;
  }

  if (s.data.uid && getQuizStatus().status == QUIZ_STATUS.STARTED) {
    // send quiz data
    interval = setInterval(() => {
      s.emit(EV_NAMES.QUIZ, { ...getCountdown() });
      if (!s.data.uid) clearInterval(interval);
    }, 1000);
  }
};
