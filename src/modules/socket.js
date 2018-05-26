import { store } from '../redux/store';
import { addMessage } from '../redux/actions/messages';

const socket = new WebSocket('ws://epiblog-api.herokuapp.com');
//const socket = new WebSocket('ws://localhost:5000');

socket.onmessage = (data) => {
    if (data.data.statut) {
        store.dispatch((addMessage(data.data)));
    }
};

const sendEvent = (event) => {
    socket.send(JSON.stringify(event));
};

export default {
    sendEvent
};
