import { Server } from "socket.io";
import type { sync, timer } from "../lib/socket";

const port = parseInt(process.env.PORT || "", 10) || 8080;

const io = new Server(port, {
  /* options */
  cors: {
    origin: "*",
    methods: "GET,PUT,POST,DELETE",
    allowedHeaders:
      "Content-Type, Authorization, X-Requested-With, X-Socket-ID",
    credentials: true,
  },
});

console.log("Server started on port ", port);

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
const client = io.of("/q");
const dashboard = io.of("/dashboard");

client.on("connection", (socket) => {
  console.log("client connected");
  let room: string = "";

  socket.on("join", (data: string) => {
    console.log("join", data);
    room = data;
    socket.join(data);

    if (room == path.toString()) {
      timer.emit("timerStart");

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

        if (syncData.page === 4) {
          timer.emit("timerStop");
        }
        io.to(room).emit("sync", syncData);
      });
    }
  });

  socket.on("disconnect", () => {
    console.log("client disconnected");
  });
});

dashboard.on("connection", (socket) => {
  console.log("dashboard connected");
  socket.on("start", () => {
    console.log("start");
    function randomIntFromInterval(min: number, max: number) {
      // min and max included
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
    path = randomIntFromInterval(1000, 999999);
    timer.emit("start", path);
  });
  socket.on("reset", () => {
    console.log("reset");
    syncData = {
      socketId: "",
      page: 0,
      text: "",
      status: 0,
    };
    timer.emit("reset");
  });
  socket.on("disconnect", () => {
    console.log("dashboard disconnected");
  });
});

io.on("connection", (socket) => {
  // ...
});
