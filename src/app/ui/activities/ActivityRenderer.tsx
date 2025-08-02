import CodeFillGame from "./CompleteCodeGame";
import MultipleChoiceGame from "./opcionMultiple";
import DragDropGame from "./dragDrop";
import FindError from "./findError";
import LiveCodingActivity from "./livecodegames";
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
          description={props.description}
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

    case "live-coding":
      const liveContent = props.content as LiveCodeContent;
      return (
        <LiveCodingActivity 
          content={liveContent}
        />
      );

    default:
      return <p>⚠ Actividad no reconocida</p>;
  }
}
