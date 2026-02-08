import { WebSocketServer } from "ws";

// Koyeb بيحتاج السيرفر يسمع على بورت 8000 عشان يشتغل صح
const port = process.env.PORT || 8000;

const wss = new WebSocketServer({ port });

wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.on("message", (msg) => {
    console.log("Received:", msg.toString());
    // إرسال الرسالة لكل الأجهزة المتصلة
    wss.clients.forEach((client) => {
      if (client.readyState === 1) { // 1 تعني OPEN
        client.send(msg.toString());
      }
    });
  });
});

console.log(`WebSocket running on port ${port}`);
