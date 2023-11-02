import express from 'express';
import { addQuestion, getQuestions } from '../controllers/question';
import dotenv from 'dotenv';
import { checkAdmin } from '../middlewares/admin';

dotenv.config();

const questionRoute = express.Router();
questionRoute.get("/", checkAdmin, getQuestions);
questionRoute.post("/", checkAdmin, addQuestion);
// if(process.env.ENVIRONMENT == 'development') questionRoute.post("/", addAdmin);

export default questionRoute;
