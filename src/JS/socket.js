import { io } from 'socket.io-client';

const socket = io(`https://${process.env.REACT_APP_HOST}`);

export default socket;
