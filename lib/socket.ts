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

const wsURL = "https://89b2-138-2-46-153.jp.ngrok.io/";
// process.env.NODE_ENV !== "production"
//   ? "https://0.tcp.jp.ngrok.io:17544"
//   : "https://ws.fes.demo.zhixuan.dev/";

console.log("URL", wsURL);

export type { sync, timer, dashboard };
export { URL, wsURL };
