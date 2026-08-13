import { io } from "socket.io-client";

const SERVER_URL = process.env.REACT_APP_SERVER_URL || `http://${window.location.hostname}:5000`;
const socket = io(SERVER_URL);

export default socket;