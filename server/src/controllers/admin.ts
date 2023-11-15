import { Request, Response } from "express";
import AdminModel from "../models/admin";
import QuizDataModel from "../models/quizdata";

export const getAdmin = async (req: Request, res: Response) => {
  try {
    const admins = await AdminModel.find();
    res.status(200).json({ error: false, admins });
  } catch (error) {
    const err = error as Error;
    console.log(err.message);
    res.status(500).json({
      error: true,
      message: `Unexpected error occured on the server. ${err.message}`,
    });
  }
};

export const addAdmin = async (req: Request, res: Response) => {
  try {
    const { email, name } = req.body;
    const admin = await AdminModel.findOne({ email });
    if (admin)
      res
        .status(401)
        .json({ error: true, message: "Admin with given email already exist" });
    else {
      const _admin = await AdminModel.create({ email, name });
      res.status(200).json({ error: false, admin: _admin });
    }
  } catch (error) {
    const err = error as Error;
    console.log(err.message);
    res.status(500).json({
      error: true,
      message: `Unexpected error occured on the server. ${err.message}`,
    });
  }
};
