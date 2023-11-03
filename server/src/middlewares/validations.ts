import { NextFunction, Request, Response } from "express";
import { QUESTION } from "../types";

export const questionValidation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, duration, score, type, options } = req.body as QUESTION;
        
        if(!title ||  !duration || !score) return res.status(401).json({error: true, message: "Missing required properties"});
        if(!options || typeof options != 'object' || !Object.keys(options).length) return res.status(401).json({error: true, message: "Invalid type of options"});

        for(let o of Object.keys(options)) {
            if(!(+o)) return res.status(401).json({error: true, message: "Option has invalid key"});
            if(typeof options[o].value !== 'string' || !options[o].id)
                return res.status(401).json({error: true, message: "Invalid type of options or option is missing some properties"});
        }
        next();
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