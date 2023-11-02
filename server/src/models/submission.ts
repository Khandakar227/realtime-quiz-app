import { Schema, model } from "mongoose";

const schema =  new Schema({
    displayName: { type: String, required: true },
    email: { type: String, required: true },
    uid: { type: String, required: true },
    question_id: { type: String, required: true },
    option_id: { type: String, required: true },
    submitted_at: { type: Date, default: Date.now },
});

const SubmissionModel = model("submission", schema);
export default SubmissionModel;