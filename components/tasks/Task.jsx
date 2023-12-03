"use client";
import { HiCheck, HiDocumentText, HiStar } from "react-icons/hi2";
import Link from "next/link";
import { Chip, IconButton } from "../ui";
import { format, isPast, isToday, isTomorrow } from "date-fns";
import { enUS } from "date-fns/locale";
import { TaskContext } from "../providers/TaskProvider";
import { useContext } from "react";
import clsx from "clsx";
import { TaskInteractiveButtons } from "../interactive-buttons";

const Task = ({ task }) => {
  const taskContext = useContext(TaskContext);
  const isPastDue = isPast(task.dueDate);

  const getDueDateText = () => {
    if (isToday(task.dueDate)) return "Today";
    if (isTomorrow(task.dueDate)) return "Tomorrow";
    return format(task.dueDate, "EEE, d MMM, yy", { locale: enUS });
  };

  const onTaskClickHandler = () => {
    alert("show task details");
  };

  const onCompletedHandler = () => taskContext.setCompleted(task);
  const onImportantHandler = () => taskContext.setImportant(task);

  return (
    <div
      onClick={onTaskClickHandler}
      className="transition-all cursor-pointer group flex gap-4 items-start bg-black-main hover:bg-black-main/80 p-2 border border-transparent border-b-black-light/20 last:border-b-transparent first:rounded-t-md last:rounded-b-md"
    >
      <div className="p-2">
        <button
          className={clsx(
            "text-base transition-all p-0.5 w-fit h-fit min-w-fit min-h-fit rounded-full grid items-center justify-center border border-gray-600/40",
            task.completed
              ? "text-black-main bg-success-main border-success-main"
              : "text-transparent hover:text-success-main"
          )}
          onClick={(e) => {
            e.stopPropagation();
            onCompletedHandler();
          }}
        >
          <HiCheck />
        </button>
      </div>

      <div className="w-full grid gap-1">
        <div className="w-full flex justify-between items-center">
          <div className="grow grid">
            <h1
              className={clsx(
                "transition-all font-[500] w-full max-w-[400px] truncate ...",
                task.completed
                  ? "line-through text-main"
                  : "text-light group-hover:text-light"
              )}
            >
              {task.name}
            </h1>

            <div className="flex items-center gap-1">
              <div
                className={clsx(
                  "max-w-fit max-h-fit text-xs xxs:text-sm",
                  isPastDue ? "text-error-main" : "text-primary-main"
                )}
              >
                {getDueDateText()}
              </div>
              {task.description && (
                <>
                  <span className="text-main">&#8226;</span>
                  <HiDocumentText className="text-sm text-main" />
                </>
              )}
            </div>
          </div>

          <div className="w-fit flex items-center">
            <IconButton
              className={clsx(
                "p-1 transition-all text-xl",
                task.important
                  ? "text-warning-main"
                  : "text-main hover:text-light"
              )}
              onClick={(e) => {
                e.stopPropagation();
                onImportantHandler();
              }}
            >
              <HiStar />
            </IconButton>

            <TaskInteractiveButtons task={task} />
          </div>
        </div>

        {task.labels.length > 0 && (
          <div className="flex w-full items-center gap-1 py-1 overflow-auto styled-overflow-horizontal">
            {task.labels.map((label) => (
              <Link key={label.id} href={`/todo/labels/${label.id}`}>
                <Chip
                  text={label.name}
                  prependSymbol="@"
                  onClick={(e) => e.stopPropagation()}
                />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default Task;
