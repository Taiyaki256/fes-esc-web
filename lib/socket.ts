type sync = {
  socketId: string;

  page?: number;
  text?: string;
  status?: number;
};

type timer = {
  isStart: boolean;
  addTime: number;
  path: number;
};

type dashboard = {
  path: number;
};

const URL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000/"
    : "https://fes-esc-web.vercel.app/";

const wsURL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:8080/"
    : "wss://ws.fes.demo.zhixuan.dev/";

console.log("URL", wsURL);

export type { sync, timer, dashboard };
export { URL, wsURL };
