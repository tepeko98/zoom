import http from "http";
import WebSocket from "ws";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));


const handleListen = () => console.log(`Listening on http://localhost:3000`);

const server = http.createServer(app);
// web socket server 생성
const wss = new WebSocket.Server({server});

// socket은 브라우저와 유저 사이의 연결이므로 따로 저장해놔야 한다.
// function handleConnection(socket) {
//     // 여기 있는 socket(연결된 브라우저)이 실시간으로 frontend와 소통할 수 있다.
//     console.log(socket);
// };
// websocket에서는 .on만으로 event:connection, function 받을 수 있다.
// 새로운 연결을 기다리고, 작동할 함수 작성
// wss.on("connection", handleConnection);
// 최적화, connection이 생겼을 때 socket으로 즉시 메시지(socket.send("hello!")) 보낸다.
wss.on("connection", (socket) => {
    // socket에 있는 메서드 send 활용, 메시지 전송
    // frontend에서 메시지 받기 event도 작성해야 한다.
    console.log("Conneted to Browser ✅");
    // socket에서 event listen하기
    socket.on("close", () => {console.log("Disconnected from Browser ❎")});
    socket.on("message", (message) => {
        console.log(message.toString('utf8'));
    });
    socket.send("hello!");
});

server.listen(3000, handleListen);
