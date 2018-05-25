import { createContext } from 'react';

const socket = new WebSocket('ws://localhost:5000');

const SocketContext = createContext(socket);

export default SocketContext;
