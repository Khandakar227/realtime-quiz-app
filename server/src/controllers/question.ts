import { Request, Response } from "express";
import { QUESTION } from "../types";
import QuestionModel from "../models/question";

export const addQuestion = async (req: Request, res: Response) => {
    try {
        const { title, duration, score, type, options } = req.body as QUESTION;
        // console.log({ title, duration, score, type, options });
        const question = await QuestionModel.create({
            title,
            duration,
            score,
            type,
            options
        });
        res.status(200).json({ error: false, message: "Added new question", question });
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


export const getQuestions = async (req: Request, res: Response) => {
    try {
        const questions = await QuestionModel.find();
        res.status(200).json({error: false, questions});        
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

export const deleteQuestion = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await QuestionModel.findByIdAndDelete(id);
        res.status(200).json({error: false, message: "Question deleted Successfully"});        
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

export const publishQuestion = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { publish } = req.body;
        console.log(publish);
        await QuestionModel.findByIdAndUpdate(id, {$set: { publish }});
        res.status(200).json({ error: false, message: "Changed publish" });
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

export const updateQuestion = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, duration, score, type, options } = req.body;        
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