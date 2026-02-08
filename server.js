import { WebSocketServer } from "ws";

const wss = new WebSocketServer({
  port: process.env.PORT || 8000
});

wss.on("connection", ws => {
  console.log("Client connected");

  ws.on("message", msg => {
    console.log(msg.toString());
    wss.clients.forEach(c => c.send(msg.toString()));
  });
});

console.log("WebSocket running");
