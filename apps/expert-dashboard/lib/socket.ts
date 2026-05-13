import { io, Socket } from "socket.io-client";
import { getErrorMessage } from "@repo/lib";

import { BACKEND_URL } from "./config";
const SOCKET_URL = BACKEND_URL;



export const socket: Socket = io(SOCKET_URL, {
    transports: ["websocket"],
    autoConnect: false,
});

// Expert specific chat socket
export const chatSocket: Socket = io(`${SOCKET_URL}/chat`, {
    transports: ["websocket"],
    autoConnect: false,
});

// Expert specific call socket
export const callSocket: Socket = io(`${SOCKET_URL}/call`, {
    transports: ["websocket"],
    autoConnect: false,
});

socket.on("connect", () => {
});

socket.on("connect_error", (err) => {
    console.error("[Socket] ❌ Dashboard Connection Error:", getErrorMessage(err));
});

chatSocket.on("connect", () => {
});

chatSocket.on("connect_error", (err) => {
    console.error("[ChatSocket] ❌ Connection Error:", getErrorMessage(err));
});

callSocket.on("connect", () => {
});

callSocket.on("connect_error", (err) => {
    console.error("[CallSocket] ❌ Connection Error:", getErrorMessage(err));
});


