import { FETCH_MESSAGES, SEND_MESSAGE } from '../actionTypes';

export const fetchMessages = messages => ({
  type: FETCH_MESSAGES,
  payload: messages,
});

export const sendMessage = message => ({
  type: SEND_MESSAGE,
  payload: message,
});
