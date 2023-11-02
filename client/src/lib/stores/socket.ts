import io from 'socket.io-client'
import {writable} from 'svelte/store'
import { QUIZ_STATUS } from '../configs/socket';
import { SERVER_URL } from '../configs/api';

export const socket = writable(io(SERVER_URL));
export const quizStatus = writable<QUIZ_STATUS>(QUIZ_STATUS.LOADING);