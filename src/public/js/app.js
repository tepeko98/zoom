// alert("hi");

// function, addeventlister 등 활용 가능
// 이곳 frontend에서 backend와 연결해달라고 코드 작성

// // 이 경우 protocol이 ws이 아닌 http이므로 작동하지 않는다.
// const socket = new WebSocket("http://localhost:3000");

// window.location 활용
// 여기 있는 socket은 서버로의 연결이다.
const socket = new WebSocket(`ws://${window.location.host}`);

// 서버가 open 될 경우 메시지 출력
socket.addEventListener("open", () => {
    console.log("Conneted to Server ✅");
});

// message 받을 때마다 내용 출력
socket.addEventListener("message", (message) => {
    console.log("New message: ", message.data);
});

// 서버가 close 될 경우 메시지 출력
socket.addEventListener("close", () => {
    console.log("Disconnected from Server ❎");
});

// 즉시 실행되지 않도록 기다리게 하기
setTimeout(() => {
    socket.send("hello from the browser!");
}, 10000);
