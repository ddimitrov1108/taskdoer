import { HiPlus } from "react-icons/hi2";
import { Button } from "../ui";
import clsx from "clsx";

const AddTaskButton = ({ className, onClick, ...restProps }) => {
  return (
    <Button
      size="sm"
      variant="primary"
      className={clsx("px-3 flex items-center gap-1 justify-center", className)}
      onClick={onClick}
      {...restProps}
    >
      <HiPlus className="text-xl" /> Add task
    </Button>
  );
};
export default AddTaskButton;
