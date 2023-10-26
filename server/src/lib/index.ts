import { QUIZ_STATUS } from "../config/socket";

export function getQuizStatus() {
    let status = QUIZ_STATUS.LOADING;
    const currentTime = new Date();
    const startTime = new Date("2023-10-25T03:15");

    if(startTime.getTime() - currentTime.getTime() <= 0) status = QUIZ_STATUS.STARTED;
    else status = QUIZ_STATUS.NOT_STARTED;
    
    const miliseconds = Math.max(startTime.getTime() - currentTime.getTime(), 0);
    const seconds = Math.floor(miliseconds/1000) % 60;
    const minutes = Math.round((miliseconds/1000)/60)%60;
    const hours = Math.round((miliseconds/1000)/3600);

    return {
        status,
        countdown: { hours, minutes, seconds }
    }
}

export function getCountdown() {
    const MAX_DURATION = 11;
    const t = Math.round(new Date().getTime() / 1000);
    return { countdown: MAX_DURATION - (t % MAX_DURATION + 1), max_duration: MAX_DURATION - 1 };
}