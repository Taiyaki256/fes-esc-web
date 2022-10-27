import { Server } from "socket.io";
import type { sync } from "../lib/socket";

const io = new Server(8080, {
  /* options */
  cors: {
    origin: "*",
    methods: "GET,PUT,POST,DELETE",
    allowedHeaders:
      "Content-Type, Authorization, X-Requested-With, X-Socket-ID",
    credentials: true,
  },
});

console.log("Server started on port 8080");

// for root setting
let path: number = 0;
let timerLong: number = 10000;

let syncData: sync = {
  socketId: "",

  page: 0,
  text: "",
  status: 0,
};

// a namespace for timer
const timer = io.of("/timer");
const client = io.of(/^\/q-\d+$/);
const dashboard = io.of("/dashboard");

client.on("connection", (socket) => {
  console.log("client connected");
  const namespace = socket.nsp;
  if (namespace.name === "/q-" + path) {
    socket.emit("sync", syncData);

    socket.on("sync", (data: sync) => {
      console.log("sync", data);
      syncData.socketId = data.socketId;
      if (data.page !== undefined) {
        syncData.page = data.page;
      }
      if (data.text !== undefined) {
        syncData.text = data.text;
      }
      if (data.status !== undefined) {
        syncData.status = data.status;
      }
      socket.broadcast.emit("sync", syncData);
    });
  }

  socket.on("disconnect", () => {
    console.log("client disconnected");
  });
});

io.on("connection", (socket) => {
  // ...
});
