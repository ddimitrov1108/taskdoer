import clsx from "clsx";
import { SideBar } from "../ui";

const TaskDetailsSideBar = ({ open, onClose, task }) => {
  return (
    <SideBar
      open={open}
      onClose={onClose}
      showFrom="right"
      containerClassName={clsx("xl:hidden")}
      className="lg:w-1/3"
      headerClassName="py-4 px-6"
      bodyClassName="py-10 px-6"
      showLogo={false}
    >
      <div className="grid w-full gap-6">
        <h1 className="text-2xl font-semibold">Task details</h1>
        {JSON.stringify(task, null, 4)}
      </div>
    </SideBar>
  );
};

export default TaskDetailsSideBar;
