import {io} from "socket.io-client";

// const URL = "https://fb.webguru188.xyz";
const URL = "http://192.168.3.18:1337";
const socket = io(URL, {autoConnect: false});

socket.onAny((event, ...args) => {
    console.log(event, args);
});
// socket.on("message", (msg) => {
//     console.log(msg);
// });
export default socket;
