import { writable } from "svelte/store";

type QuizData = {
    qid: string;
    quiz_start_time: Date;
    duration: number;
    updated_at: Date;
}

export const quizData = writable<QuizData | null>(null);

