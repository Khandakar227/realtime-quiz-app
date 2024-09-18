import { Request, Response } from "express";
import QuizDataModel from "../models/quizdata";
import { QUIZ_INFO_ID } from "../lib";
import { notifyQuizDatetime } from "../lib/events";

export const quizInfo = async (req: Request, res: Response) => {
  try {
    const { quiz_start_time, duration } = req.body;
    const quizTime = new Date(quiz_start_time);
    const quizData = await QuizDataModel.findOneAndUpdate(
      {qid: QUIZ_INFO_ID},
      { $set: { quiz_start_time, updated_at: Date.now(), duration } },
      { upsert: true }
    );
    if(quizData && quizData?.quiz_start_time) notifyQuizDatetime(quizTime);
    
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