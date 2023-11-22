import { Modal } from "../ui";
import { ProjectForm } from "../forms";
import { HiOutlineDocumentText, HiOutlinePencilSquare } from "react-icons/hi2";

const ProjectModal = ({
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
          {editMode ? "Edit Project" : "New Project"}
        </div>
      }
      open={open}
      setOpen={setOpen}
      className="max-w-sm"
      bodyClassName="pt-4"
    >
      <ProjectForm
        editMode={editMode}
        initialState={initialState}
        afterFormSubmit={afterFormSubmit}
      />
    </Modal>
  );
};
export default ProjectModal;
