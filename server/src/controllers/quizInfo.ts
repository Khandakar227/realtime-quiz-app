import { Request, Response } from "express";
import QuizDataModel from "../models/quizdata";
import { QUIZ_INFO_ID, QuizTime } from "../lib";

export const quizInfo = async (req: Request, res: Response) => {
  try {
    const { quiz_time } = req.body;
    const quizData = await QuizDataModel.findOneAndUpdate(
      {qid: QUIZ_INFO_ID},
      { $set: { quiz_time, updated_at: Date.now() } },
      { upsert: true }
    );
    await QuizTime.update(quizData?.quiz_time);
    res.status(200).json({ error: false, data: quizData });
  } catch (error) {
    const err = error as Error;
    console.log(err.message);
    res.status(500).json({
      error: true,
      message: `Unexpected error occured on the server. ${err.message}`,
    });
  }
};

export const getQuizInfo = async (req: Request, res: Response) => {
    try {
        const data = await QuizDataModel.findOne({ qid: QUIZ_INFO_ID });
        res.status(200).json({ error: false, data });
    } catch (error) {
        const err = error as Error;
        console.log(err.message);
        res
        .status(500)
        .json({
            error: true,
            message: `Unexpected error occured on the server. ${err.message}`,
        });
    }
}