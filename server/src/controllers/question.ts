import { Request, Response } from "express";
import { QUESTION } from "../types";
import QuestionModel from "../models/question";

export const addQuestion = async (req: Request, res: Response) => {
    try {
        const { title, duration, score, type, options } = req.body as QUESTION;
        // console.log({ title, duration, score, type, options });
        if(!title ||  !duration || !score) return res.status(401).json({error: true, message: "Missing required properties"});
        if(!options || typeof options != 'object' || !Object.keys(options).length) return res.status(401).json({error: true, message: "Invalid type of options"});

        for(let o of Object.keys(options)) {
            if(!(+o)) return res.status(401).json({error: true, message: "Option has invalid key"});
            if(typeof options[o].value !== 'string' || !options[o].id)
                return res.status(401).json({error: true, message: "Invalid type of options or option is missing some properties"});
        }

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