import CodeFillGame from "./CompleteCodeGame";
import MultipleChoiceGame from "./opcionMultiple";
import DragDropGame from "./dragDrop";
import FindError from "./findError";
import LiveCodeGame from "./livecodegames";
import {
  ActivityProps,
  CodeFillContent,
  DragDropContent,
  FindErrorContent,
  LiveCodeContent,
  MultipleChoiceContent,
} from "@/types/activities";

export default function ActivityRenderer(props: ActivityProps) {

  switch (props.type) {
    case "fill-in-the-blanks":
      const fillContent = props.content as CodeFillContent;
      return (
        <CodeFillGame
          content={fillContent.htmlCode}
          answers={fillContent.answers}
        />
      );

    case "multiple-choice":
      return (
        <MultipleChoiceGame
          quizzes={(props.content as MultipleChoiceContent).quizzes}
        />
      );

    case "drag-and-drop":
      const dragContent = props.content as DragDropContent;
      return (
        <DragDropGame
          code={dragContent.code}
          options={dragContent.options}
          answers={dragContent.answers}
        />
      );

    case "find-error":
      const errorContent = props.content as FindErrorContent;
      return (
        <FindError
          code={errorContent.code}
          correctLine={errorContent.correctLine}
          explanation={errorContent.explanation}
        />
      );

    case "live-code":
      return (
        <LiveCodeGame
          initialCode={(props.content as LiveCodeContent).code}
        />
      );

    default:
      return <p>⚠ Actividad no reconocida</p>;
  }
}
