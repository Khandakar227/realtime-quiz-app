export type OPTION = {
    id: number,
    value: string,
    correct: boolean
}

export type QUESTION = {
    title: string,
    duration: number,
    score: number,
    type: "multiple" | "single",
    options: { [id:string]: OPTION }
}