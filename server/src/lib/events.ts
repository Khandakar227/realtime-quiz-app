import EventEmitter from "events";
import { QuizDetails } from "./quizDetails";
import { QUIZ_STATUS } from "../config/socket";
import { io } from "./io";

export const QUESTION_CHANGE_EVENT = 'questionchangeevent';
export const QUIZ_DATETIME_CHANGE_EVENT = 'quizdatetimechangeevent';
export const changeEvent = new EventEmitter();

changeEvent.on(QUESTION_CHANGE_EVENT, (data) => {
    console.log('Question Changed', data);
    QuizDetails.getTotalTimeOfQuiz().then((duration) => {
        QuizDetails.duration = duration || 0
        console.log(duration);
    });
});

changeEvent.on(QUIZ_DATETIME_CHANGE_EVENT, async (data) => {
    console.log('Quiz date changed', data);
    await QuizDetails.setStartDatetime(data?.quiz_time);
    QuizDetails.duration = (data?.duration);
    
    QuizDetails.status = await QuizDetails.getStatus();

    if (QuizDetails.status == QUIZ_STATUS.NOT_STARTED) QuizDetails.handleNotStarted(io);
    else if (QuizDetails.status == QUIZ_STATUS.STARTED) QuizDetails.handleStarted(io);
    else if (QuizDetails.status == QUIZ_STATUS.ENDED) QuizDetails.handleEnded(io);
});

export function notifyInsertQuestion() {
    changeEvent.emit(QUESTION_CHANGE_EVENT, {type: 'insert'});
}

export function notifyDeleteQuestion() {
    changeEvent.emit(QUESTION_CHANGE_EVENT, {type: 'delete'});
}

export function notifyQuizDatetime(quiz_time:Date, duration:number) {
    changeEvent.emit(QUIZ_DATETIME_CHANGE_EVENT, {type: 'change', quiz_time, duration});
}