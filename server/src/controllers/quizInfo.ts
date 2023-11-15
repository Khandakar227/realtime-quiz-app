import { Request, Response } from "express";
import QuizDataModel from "../models/quizdata";

const QUIZ_INFO_ID = "QUIZ-INFO-7f25";
export const quizInfo = async (req: Request, res: Response) => {
  try {
    const { quiz_time } = req.body;
    const quizData = await QuizDataModel.findByIdAndUpdate(
      QUIZ_INFO_ID,
      { $set: { quiz_time } },
      { upsert: true }
    );
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
        const data = await QuizDataModel.findById(QUIZ_INFO_ID);
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