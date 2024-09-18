import { Socket } from "socket.io";
import fireAdmin from "../lib/firebase";

export const quizController = async (s: Socket, data: any) => {
  let interval: NodeJS.Timeout;
  const token = data.token;

  if (!token) s.data = {};
  else {
    const payload = await fireAdmin.auth().verifyIdToken(token);
    s.data = payload;
  }

  // if (s.data.uid && (await getQuizStatus()).status == QUIZ_STATUS.STARTED) {
  //   // send quiz data
  //   interval = setInterval(async () => {
  //     s.emit(EV_NAMES.QUIZ, { ...getCountdown(), total: QuizDuration.get() });
  //     if (!s.data.uid || (await getQuizStatus()).status != QUIZ_STATUS.STARTED) {
  //       clearInterval(interval);
  //       s.emit(EV_NAMES.BROADCAST, {status: QUIZ_STATUS.ENDED});
  //     }
  //   }, 1000);
  // }
};
