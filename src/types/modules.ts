export type Lesson = {
  title: string;
  completed: boolean;
  locked: boolean;
};

export type ModuleWithProgress = {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
};

export type UserProgress = {
  id: string;
  lessons: {
    completed: boolean;
    locked: boolean;
    title: string;
  }[];
};