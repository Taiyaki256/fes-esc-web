import { Server } from "socket.io";

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

type Game = {
  page: number;
  answer: string;
  startTime: Date;
  timerLong: number;
};

type Answer = {
  answer: string;
  socketId: string;
};

const Game = {
  page: 0,
  answer: "",
  startTime: new Date(),
  timerLong: 10000,
};

// a namespace for timer
const timer = io.of("/timer");
timer.on("connection", () => {
  console.log("timer connected");
});

// timer.emit("start", {
//   page: nowPage,
//   answer: nowAnswer,
//   startTime: startTime,
//   timerLong: timerLong,
// });

// a dynamic namespace
// ex: /q-{path}

const question = io.of(/^\/q-\d+$/);
question.on("connection", (socket) => {
  console.log("connected");
  const namespace = socket.nsp;
  if (namespace.name === "/q-" + path.toString()) {
    timer.emit("timerStart", true);

    question.on("answer", (data: string) => {
      Game.answer = data;
      const rep: Answer = {
        answer: data,
        socketId: socket.id,
      };
      namespace.emit("answer", rep);
    });
    namespace.on("check", () => {
      namespace.emit("check", socket.id);
    });
    namespace.on("next", (data: number) => {
      Game.page = data;
      namespace.emit("next", Game.page);
    });
  }
});

// a namespace for the dashboard
// ex: /dashboard
// method:
//  - reset
//  - start

const dashboard = io.of("/dashboard");
dashboard.on("connection", (socket) => {
  console.log("connected");
  const namespace = socket.nsp;
  namespace.on("reset", () => {
    Game.page = 0;
    Game.answer = "";
    Game.timerLong = 10000;
    timer.emit("reset", true);
  });
  namespace.on("start", () => {
    Game.page = 0;
    Game.answer = "";
    Game.timerLong = 10000;
    Game.startTime = new Date();
    timer.emit("start", true);
  });
});

io.on("connection", (socket) => {
  // ...
});
