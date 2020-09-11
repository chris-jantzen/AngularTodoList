export interface Todo {
  userId?: number;
  id: number;
  title: string;
  completed: boolean;
  notes?: string;
  location?: string;
  time?: Time;
  date?: Date;
}

interface Time {
  hour: number;
  minute: number
}

interface Date {
  year: number;
  month: number;
  day: number;
}
