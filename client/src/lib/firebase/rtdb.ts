// import { get, ref, set } from 'firebase/database';
// import {rtdb} from './config';


// const START_DATE_TIME_PATH = "admin/quiz_time";
// const ADMIN_EMAILS_PATH = "admin/email";

// export const getAdmins = async () => {
//     const adminEmailsRef = ref(rtdb, ADMIN_EMAILS_PATH);
//     const snapshot = await get(adminEmailsRef);
//     if(snapshot.exists()) return snapshot.val() as string[]
//     else return [] as string[];
// }

// export const setQuizDatetime =async (timestamp:number) => {
//     const datetimeRef = ref(rtdb, START_DATE_TIME_PATH);
//     set(datetimeRef, {start_datetime: timestamp});
// }
