import { ADD_MESSAGE, SEND_MESSAGE } from '../actionTypes';

export const addMessage = messages => ({
  type: ADD_MESSAGE,
  payload: messages,
});

export const sendMessage = message => ({
  type: SEND_MESSAGE,
  payload: message,
});
