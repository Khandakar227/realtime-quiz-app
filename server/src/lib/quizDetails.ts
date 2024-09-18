import { Server } from "socket.io";
import { QUIZ_INFO_ID } from ".";
import { EV_NAMES, QUIZ_STATUS } from "../config/socket";
import QuestionModel from "../models/question";
import QuizDataModel from "../models/quizdata";

export class QuizDetails {
    // In seconds
    private static _duration:number|null;
    // In milliseconds
    private static _datetime:number|null;
    private static _intervalTimer:NodeJS.Timeout|null = null;

    public static status:QUIZ_STATUS = QUIZ_STATUS.LOADING;;

    public static get duration() {
        return this._duration || 0;
    }
    public static set duration(d:number) {
        this._duration = d;
    }
    public static get datetime() {
        return this._datetime || 0;
    }
    public static async setStartDatetime(_time?: Date | null) {
        let t: number | null = null;
        if (!_time) {
        const data = await QuizDataModel.findOne({ qid: QUIZ_INFO_ID });
        if (data) t = data?.quiz_start_time?.getTime();
        } else t = _time.getTime();

        this._datetime = t || 0;
    }
    public static async getStatus() {
        const currentTime = new Date();
        if(!this._datetime) await this.setStartDatetime();

        if (this._datetime && this._datetime - currentTime.getTime() <= 0) {
            
            if(!this._duration) this._duration = await QuizDetails.getTotalTimeOfQuiz() || 0;
            if (this._datetime + this._duration*1000 - currentTime.getTime() >= 0) {
                this.status = QUIZ_STATUS.STARTED;
            } else
                this.status = QUIZ_STATUS.ENDED;
        } else
            this.status = QUIZ_STATUS.NOT_STARTED;
        return this.status;
    }
    public static async getTotalTimeOfQuiz() {
        const data = await QuizDataModel.findOne({ qid: QUIZ_INFO_ID });
        return data?.duration;   
    }

    static sendStartingCountdown(io: Server) {
        const currentTime = new Date();
        const startTime = this._datetime || 0;
        const miliseconds = Math.max(startTime - currentTime.getTime(), 0);
        const seconds = Math.trunc(miliseconds / 1000) % 60;
        const minutes = Math.trunc(miliseconds / 1000 / 60) % 60;
        const hours = Math.trunc(miliseconds / 1000 / 3600);
        io.emit(EV_NAMES.BROADCAST, { status: this.status, countdown: {seconds, minutes, hours} });
    }
    
    static sendOngoingCountdown(io: Server) {
        const currentTime = new Date();
        const startTime = (this._datetime || 0) + ((this.duration || 0) + 2) * 1000;
        const miliseconds = Math.max(startTime - currentTime.getTime(), 0);
        const seconds = Math.trunc(miliseconds / 1000) % 60;
        const minutes = Math.trunc(miliseconds / 1000 / 60) % 60;
        const hours = Math.trunc(miliseconds / 1000 / 3600);
        io.emit(EV_NAMES.BROADCAST, { duration: this.duration, status: this.status, countdown: {seconds, minutes, hours} })
    }
    public static handleNotStarted(io:Server) {
        if(this._intervalTimer) {
            clearInterval(this._intervalTimer);
            this._intervalTimer = null;
        }
        
        if(this.status != QUIZ_STATUS.NOT_STARTED) return;

        this._intervalTimer = setInterval(async () => {
            this.status = await this.getStatus();
            
            if(this.status != QUIZ_STATUS.NOT_STARTED) {
                this.handleStarted(io);
            }
            this.sendStartingCountdown(io);
        }, 1000);
    }
    public static handleStarted(io:Server) {
        if(this._intervalTimer) {
            clearInterval(this._intervalTimer);
            this._intervalTimer = null;
        }
        
        if(this.status != QUIZ_STATUS.STARTED) return;

        this._intervalTimer = setInterval(async () => {
            this.status = await this.getStatus();
            
            if(this.status != QUIZ_STATUS.STARTED) {
                this.handleEnded(io);
            }
            this.sendOngoingCountdown(io);
        }, 1000);
    }
    public static async handleEnded(io:Server) {
        this.status = await this.getStatus();
        
        if(this._intervalTimer) {
            clearInterval(this._intervalTimer);
            this._intervalTimer = null;
        }

        if(this.status != QUIZ_STATUS.ENDED) return;
        io.emit(EV_NAMES.BROADCAST, { status: this.status });
    }
}