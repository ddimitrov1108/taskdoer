import clsx from "clsx";
import { SideBar } from "../ui";

const TaskDetailsSideBar = ({ open, onClose, task }) => {
  return (
    <SideBar
      open={open}
      onClose={onClose}
      showFrom="right"
      containerClassName="xl:hidden"
      className="bg-black-main lg:w-1/3"
      headerClassName="py-4 px-6"
      bodyClassName="py-10 px-6"
      title="Task Details"
      showLogo={false}
    >
      <div className="grid w-full gap-6">{JSON.stringify(task, null, 4)}</div>
    </SideBar>
  );
};

export default TaskDetailsSideBar;
