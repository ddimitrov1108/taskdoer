import { TaskForm } from "../forms";
import { Modal } from "../ui";
import { HiOutlineDocumentText, HiOutlinePencilSquare } from "react-icons/hi2";

const TaskModal = ({
  open,
  setOpen,
  editMode = false,
  initialState = null,
  afterFormSubmit = () => {},
}) => {
  return (
    <Modal
      title={
        <div className="flex items-center gap-2">
          <div className="text-2xl text-slate-400">
            {editMode ? <HiOutlinePencilSquare /> : <HiOutlineDocumentText />}
          </div>
          {editMode ? "Edit Task" : "New Task"}
        </div>
      }
      open={open}
      setOpen={setOpen}
      className="max-w-sm"
      bodyClassName="pt-4"
    >
      <TaskForm
        editMode={editMode}
        initialState={initialState}
        afterFormSubmit={afterFormSubmit}
      />
    </Modal>
  );
};
export default TaskModal;
