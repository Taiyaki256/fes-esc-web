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

export type { sync, timer, dashboard };
