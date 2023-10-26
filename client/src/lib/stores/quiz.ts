import { writable } from "svelte/store";

type QuizData = {
    countdown: number,
    max_duration: number,
}

export const quizData = writable<QuizData | null>(null);

