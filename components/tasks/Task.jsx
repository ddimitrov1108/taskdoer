import {
  HiCheck,
  HiDocumentText,
  HiOutlineEllipsisVertical,
  HiOutlineSquares2X2,
  HiOutlineStar,
  HiOutlineTrash,
  HiStar,
} from "react-icons/hi2";
import Link from "next/link";
import { Chip, Dropdown, DropdownListItem } from "../ui";
import { format, isPast, isToday, isTomorrow } from "date-fns";
import { enUS } from "date-fns/locale";
import { TaskContext } from "../providers/TaskProvider";
import { useContext } from "react";
import clsx from "clsx";

const Task = ({
  task,
  onCompletedHandler = () => {},
  onImportantHandler = () => {},
}) => {
  const taskContext = useContext(TaskContext);

  const onTaskClickHandler = () => {
    taskContext.setSelectedTask(task);
    taskContext.setOpenDetailsTaskModal(true);
  };

  const onTaskDeleteHandler = () => {
    taskContext.setSelectedTask(task);
    taskContext.setOpenDeleteTaskModal(true);
  };

  const taskInteractions = [
    {
      name: "Details",
      icon: <HiOutlineSquares2X2 />,
      onClick: onTaskClickHandler,
      className: "text-light hover:text-white",
      iconClassName: "text-primary-main",
    },
    {
      name: "Delete",
      icon: <HiOutlineTrash />,
      onClick: onTaskDeleteHandler,
      className: "text-error-main hover:text-error-main",
      iconClassName: "text-error-main",
    },
  ];

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
            onCompletedHandler(task);
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
                  : "text-light group-hover:text-white"
              )}
            >
              {task.name}
            </h1>

            <div className="flex items-center gap-1">
              <div
                className={clsx(
                  "max-w-fit max-h-fit text-xs xxs:text-sm",
                  isPast(task.dueDate) ? "text-error-main" : "text-primary-main"
                )}
              >
                {isToday(task.dueDate)
                  ? "Today"
                  : isTomorrow(task.dueDate)
                  ? "Tomorrow"
                  : format(task.dueDate, "EEE, d MMM, yy", {
                      locale: enUS,
                    })}
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
            <button
              className={clsx(
                "transition-all p-1 text-xl hover:bg-transparent",
                task.important
                  ? "text-warning-main"
                  : "text-slate-500 hover:text-white"
              )}
              onClick={(e) => {
                e.stopPropagation();
                onImportantHandler(task);
              }}
            >
              {task.important ? <HiStar /> : <HiOutlineStar />}
            </button>

            <Dropdown
              btnClassName="transition-all text-2xl text-main w-full p-1 hover:text-white rounded-md flex items-center gap-3"
              btn={<HiOutlineEllipsisVertical />}
              menuItemsClassName="border border-black-light/40 bg-black-main p-2"
              chevronClassName="pr-0.5"
            >
              {taskInteractions.map(
                ({ id, className, iconClassName, onClick, ...item }, index) => (
                  <DropdownListItem
                    key={index}
                    as="button"
                    onClick={onClick}
                    item={item}
                    className={clsx(className, "hover:bg-black-light/10")}
                    iconClassName={iconClassName}
                  />
                )
              )}
            </Dropdown>
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
