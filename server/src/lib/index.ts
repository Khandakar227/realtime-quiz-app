import { QUIZ_STATUS } from "../config/socket";
import QuestionModel from "../models/question";
import QuizDataModel from "../models/quizdata";

export const QUIZ_INFO_ID = "QUIZ-INFO-7f25";


export class QuizTime {
  private static time: number | null;
  
  public static async update(_time?: Date | null) {
    let t: number | null = null;
    if (!_time) {
      const data = await QuizDataModel.findOne({ qid: QUIZ_INFO_ID });
      if (data) t = data?.quiz_time.getTime();
    } else t = _time.getTime();

    this.time = t;

    return t;
  }

  public static get() {
    return QuizTime.time;
  }
}

export async function getQuizStatus() {
  let status = QUIZ_STATUS.LOADING;
  let startTime: number | null = QuizTime.get() || 0;
  const currentTime = new Date();

  if (!startTime) startTime = (await QuizTime.update()) || 0;

  if (startTime && startTime - currentTime.getTime() <= 0) {
        const totalDuration = await getTotalTimeOfQuiz();
        if(startTime + totalDuration - currentTime.getTime() <= 0) status = QUIZ_STATUS.STARTED;
        else status = QUIZ_STATUS.ENDED;
    }
  else status = QUIZ_STATUS.NOT_STARTED;

  const miliseconds = Math.max(startTime - currentTime.getTime(), 0);
  const seconds = Math.trunc(miliseconds / 1000) % 60;
  const minutes = Math.trunc(( miliseconds / 1000 ) / 60) % 60;
  const hours = Math.trunc(( miliseconds / 1000 ) / 3600);

  return {
    status,
    countdown: { hours, minutes, seconds },
  };
}

export function getCountdown() {
  const MAX_DURATION = 11;
  const t = Math.round(new Date().getTime() / 1000);
  return {
    countdown: MAX_DURATION - ((t % MAX_DURATION) + 1),
    max_duration: MAX_DURATION - 1,
  };
}

export const getTotalTimeOfQuiz = async () => {
  const qs = await QuestionModel.aggregate([
    {
      $group: {
        _id: null,
        totalTime: { $sum: "$duration" },
      },
    },
  ]);

  return qs.length > 0 ? qs[0].totalTime : 0;
};

function listenForQuestionsChange() {
  const changeStream = QuizDataModel.watch();
  changeStream.on('change', () => {
    // calculate total quiz time
  });
}