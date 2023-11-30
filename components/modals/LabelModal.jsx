import { Modal } from "../ui";
import { LabelForm } from "../forms";
import { HiOutlineFolderPlus, HiOutlinePencilSquare } from "react-icons/hi2";

const LabelModal = ({
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
          <div className="text-2xl text-main">
            {editMode ? <HiOutlinePencilSquare /> : <HiOutlineFolderPlus />}
          </div>
          {editMode ? "Edit Label" : "New Label"}
        </div>
      }
      open={open}
      setOpen={setOpen}
      className="max-w-sm"
      bodyClassName="pt-4"
    >
      <LabelForm
        editMode={editMode}
        initialState={initialState}
        afterFormSubmit={afterFormSubmit}
      />
    </Modal>
  );
};
export default LabelModal;
