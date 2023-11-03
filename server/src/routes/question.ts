import express from 'express';
import { addQuestion, deleteQuestion, getQuestions, publishQuestion, updateQuestion } from '../controllers/question';
import dotenv from 'dotenv';
import { checkAdmin } from '../middlewares/admin';
import { questionValidation } from '../middlewares/validations';

dotenv.config();

const questionRoute = express.Router();
questionRoute.get("/", checkAdmin, getQuestions);
questionRoute.post("/", checkAdmin, questionValidation, addQuestion);
questionRoute.put("/:id", checkAdmin, questionValidation, updateQuestion);
questionRoute.put("/publish/:id",checkAdmin, publishQuestion);
questionRoute.delete("/:id", checkAdmin, deleteQuestion);
// if(process.env.ENVIRONMENT == 'development') questionRoute.post("/", addAdmin);

export default questionRoute;
