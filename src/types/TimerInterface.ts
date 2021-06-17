export interface TimerInterface {
  name: string;
  uri: string;
  totalTime?: string;
  limitTime: number;
  currentTime: number | null;
}

export interface TimersInterface {
  [key: string]: TimerInterface;
}
