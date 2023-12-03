"use client";
import { useContext, useId } from "react";
import { TaskContext } from "../providers/TaskProvider";
import {
  HiEllipsisVertical,
  HiOutlinePencilSquare,
  HiOutlineSquares2X2,
  HiOutlineTrash,
} from "react-icons/hi2";
import { Dropdown, DropdownListItem, IconButton } from "../ui";

const TaskInteractiveButtons = ({ task }) => {
  const taskContext = useContext(TaskContext);

  const onTaskDetailsHandler = () => {
    taskContext.setSelectedTask(task);
    taskContext.setOpenDetailsTaskModal(true);
  };
  const onTaskEditHandler = () => {
    taskContext.setSelectedTask(task);
    taskContext.setOpenDetailsTaskModal(true);
  };

  const onTaskDeleteHandler = () => {
    taskContext.setSelectedTask(task);
    taskContext.setOpenDeleteTaskModal(true);
  };

  const taskInteractions = [
    {
      id: useId(),
      name: "Details",
      icon: <HiOutlineSquares2X2 />,
      onClick: onTaskDetailsHandler,
      className: "text-light hover:text-white",
      iconClassName: "text-primary-main",
    },
    {
      id: useId(),
      name: "Edit",
      icon: <HiOutlinePencilSquare />,
      onClick: onTaskEditHandler,
      className: "text-light hover:text-white",
      iconClassName: "text-primary-main",
    },
    {
      id: useId(),
      name: "Delete",
      icon: <HiOutlineTrash />,
      onClick: onTaskDeleteHandler,
      className: "text-error-main",
      iconClassName: "text-error-main",
    },
  ];

  return (
    <Dropdown
      btn={
        <IconButton className="text-xl p-1">
          <HiEllipsisVertical />
        </IconButton>
      }
    >
      {taskInteractions.map(
        ({ id, className, iconClassName, onClick, ...item }) => (
          <DropdownListItem
            key={id}
            as="button"
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
            item={item}
            className={className}
            iconClassName={iconClassName}
          />
        )
      )}
    </Dropdown>
  );
};
export default TaskInteractiveButtons;
