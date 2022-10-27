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

const root_URL =
  process.env.NODE_ENV !== "production"
    ? "https://fes-esc-web.vercel.app/"
    : "http://localhost:3000/";

export type { sync, timer, dashboard };
