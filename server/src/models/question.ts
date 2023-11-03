import { Schema, model } from "mongoose";

const optionSchema = new Schema({
    id: { type: Number, required: true },
    value: { type: String, required: true },
    correct: { type: Boolean, default: false }
});

const schema =  new Schema({
    title: { type: String, required: true },
    duration: { type: Number, required: true },
    score: { type: Number, required: true },
    type: { type: String, enum: ['single', 'multiple'], default: 'multiple', required: true },
    publish: {type: Boolean, default: false, required: true},
    options: { type: Map, of: optionSchema },
    created_at: { type: Date, default: Date.now },
});

const QuestionModel = model("question", schema);
export default QuestionModel;
