import io from 'socket.io-client'
import {writable} from 'svelte/store'
import { QUIZ_STATUS } from '../configs/socket';

export const socket = writable(io(import.meta.env.VITE_SERVER_URL));
export const quizStatus = writable<QUIZ_STATUS>(QUIZ_STATUS.LOADING);