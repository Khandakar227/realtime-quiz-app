import { Schema, model } from "mongoose";
import { QUIZ_INFO_ID } from "../lib";

const schema =  new Schema({
    qid: {type:String, default: QUIZ_INFO_ID},
    quiz_time: { type: Date, required: true },
    updated_at: { type: Date, default: Date.now(), required: true }
});

const QuizDataModel = model("quizdata", schema);
export default QuizDataModel;