'use strict';

import { store } from '../redux/store';

// const socket = new WebSocket('ws://epiblog-api.herokuapp.com');
const socket = new WebSocket('ws://localhost:5000');

socket.onmessage = (data) => {
  console.log(data.data);
};

const sendEvent = (event) => {
  socket.send(JSON.stringify(event));
};

export default {
  sendEvent
};
