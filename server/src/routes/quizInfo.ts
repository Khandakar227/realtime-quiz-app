import express from 'express';
import { checkAdmin } from '../middlewares/admin';
import { quizInfo, getQuizInfo } from '../controllers/quizInfo';

const quizInfoRoute = express.Router();

quizInfoRoute.get("/", getQuizInfo);
quizInfoRoute.post("/", checkAdmin, quizInfo);

export default quizInfoRoute;