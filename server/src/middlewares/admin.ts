import fireAdmin from '../lib/firebase';
import { NextFunction, Request, Response } from "express";
import AdminModel from '../models/admin';

export const checkAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const admins = await AdminModel.find();
        const authorization = req.headers.authorization;
        
        if(!authorization) return res.status(401).json({error: false, message: "Access Denied"});
        
        const token = authorization.split(' ')[1];
        const payload = await fireAdmin.auth().verifyIdToken(token);
        const isFound = admins.find(admin => admin.email == payload.email);
        if (isFound) next();
        else res.status(401).json({error: false, message: "Access Denied"});
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