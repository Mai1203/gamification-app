
export type CodeFillContent = {
  htmlCode: string;
  answers: string[];
};

export type MultipleChoiceContent = {
  quizzes: {
    question: string;
    options: string[];
    correctAnswer: string;
  }[];
};

export type DragDropContent = {
  code: string;
  options: string[];
  answers: string[];
};

export type FindErrorContent = {
  code: string[];
  correctLine: number;
  explanation: string;
};

export type LiveCodeContent = {
  description: string;
  initialCode: string;
  validation: string;
  hints: string[];
  resources: { label: string; code: string }[];
  difficulty: string;
  points: number;
};

export type ActivityProps = {
  type: "fill-in-the-blanks" | "multiple-choice" | "drag-and-drop" | "find-error" | "live-coding";
  content:
    | CodeFillContent
    | MultipleChoiceContent
    | DragDropContent
    | FindErrorContent
    | LiveCodeContent;
  answers?: string[];
};
