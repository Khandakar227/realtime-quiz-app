import { SERVER_URL } from "../configs/api";

export type ADMIN = {
    _id: string,
    name: string,
    email: string,
    created_at: string,
    logged_in_at: string,
}
export type OPTION = {
    id: number,
    value: string,
    correct: boolean
}

export type QUESTION = {
    title: string,
    duration: number | null,
    score: number | null,
    publish: boolean,
    type: "multiple" | "single" | "",
    options: { [id:string]: OPTION }
}

export type QUIZ_INFO = {
    quiz_start_time?:Date | string | number,
    duration: number | string,
}

export const getAdmins = async () => {
    const res = await fetch(`${SERVER_URL}/api/v1/admin`);
    const data = await res.json();
    if(data.error) throw new Error(data.message);
    let admins = [] as string[];
    data.admins.forEach((admin:ADMIN) => admins.push(admin.email));
    return admins;
}

export const setQuizDatetime = async (data:QUIZ_INFO, token:string) => {
    const res = await fetch(`${SERVER_URL}/api/v1/quiz-info`, {
        method: "POST",
        credentials: 'include',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    });
    const _data = await res.json();
    if(_data.error) throw new Error(_data.message);
}

export const getQuizInfo = async () => {
    const res = await fetch(`${SERVER_URL}/api/v1/quiz-info`, {
        method: "GET",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
        },
    })
    const _data = await res.json();
    if(_data.error) throw new Error(_data.message);
    return _data.data;
}

export const addNewQuestion = async (data:QUESTION, token:string) => {
    const res = await fetch(`${SERVER_URL}/api/v1/question`, {
        method: "POST",
        credentials: 'include',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    })
    const _data = await res.json();
    if(_data.error) throw new Error(_data.message);
}

export const getQuestions =async (token:string) => {
    const res = await fetch(`${SERVER_URL}/api/v1/question`, {
        method: "GET",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    })
    const _data = await res.json();
    if(_data.error) throw new Error(_data.message);
    return _data.questions;
}