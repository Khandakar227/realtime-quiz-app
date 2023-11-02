import { Schema, model } from "mongoose";

const schema =  new Schema({
    quiz_time: { type: Date, required: true },
    updated_at: { type: Date, default: Date.now(), required: true }
});

const QuizDataModel = model("quizdata", schema);
export default QuizDataModel;