import { io } from 'socket.io-client';

const socket = io(`https://${process.env.REACT_APP_HOST}`);

const connection = () => {
    return socket;
};

export default connection;
