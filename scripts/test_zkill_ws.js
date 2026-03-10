const WebSocket = require("ws");

const url = "wss://zkillboard.com/websocket/";

console.log("Connecting to:", url);

const ws = new WebSocket(url);

ws.on("open", () => {
    console.log("Connected");

    ws.send(JSON.stringify({
        action: "sub",
        channel: "killstream"
    }));

    console.log("Subscribed to killstream");
});

ws.on("message", (data) => {
    try {
        const msg = JSON.parse(data);
        console.log(new Date().toISOString(), msg);
    } catch (e) {
        console.log("Raw message:", data.toString());
    }
});

ws.on("close", () => {
    console.log("Connection closed");
});

ws.on("error", (err) => {
    console.error("Error:", err);
});
