import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import { Button, Modal } from "../ui";
import { useForm } from "../hooks";

const DeleteConfirmationModal = ({ text, open, setOpen, onSubmit }) => {
  const [form, setForm] = useForm();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setForm({ ...form, loading: true });
    await onSubmit();
    setForm({ ...form, loading: false });
  };

  return (
    <Modal
      title={
        <div className="flex items-center gap-2">
          <div className="text-2xl text-slate-400">
            <HiOutlineExclamationTriangle />
          </div>
          Delete Confirmation
        </div>
      }
      open={open}
      setOpen={setOpen}
      className="max-w-sm"
      bodyClassName="pt-4"
    >
      <form onSubmit={onSubmitHandler}>
        <div className="mb-6">{text}</div>

        <div className="flex flex-col-reverse md:flex-row gap-2 justify-between items-center">
          <Button
            variant="text"
            className="flex justify-center"
            disabled={form.loading}
            loading={form.loading}
            loadingAnimation={false}
            onClick={() => setOpen(false)}
            fullWidth
          >
            Cancel
          </Button>

          <Button
            variant="error"
            type="submit"
            className="flex justify-center"
            disabled={form.loading}
            loading={form.loading}
            fullWidth
          >
            Delete
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default DeleteConfirmationModal;
