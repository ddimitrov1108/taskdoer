"use client";
import { Field, Form, Formik } from "formik";
import { enqueueSnackbar } from "notistack";
import { useForm } from "../hooks";
import { Alert, Button } from "../ui";
import {
  LabelsSelectField,
  DatePickerField,
  TextAreaField,
  TextField,
  CheckBoxField,
} from "./formik";
import { taskSchema } from "@/lib/yup-schemas";
import { format } from "date-fns";
import { useParams, useRouter } from "next/navigation";

const initialValues = {
  name: "",
  description: "",
  dueDate: format(new Date(), "yyyy-MM-dd"),
  labels: [],
  important: false,
};

const TaskForm = ({
  initialState = null,
  editMode = false,
  afterFormSubmit = () => {},
}) => {
  const params = useParams();
  const router = useRouter();
  const [form, setForm] = useForm();

  const onSubmitHandler = async (values) => {
    setForm({ loading: true, error: "" });
    const { signal } = new AbortController();

    if (editMode) {
      await fetch(`/api/tasks/${initialState.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          dueDate: new Date(values.dueDate),
          editLabels: true,
        }),
        signal,
      })
        .then(() => {
          enqueueSnackbar("Task edited successfully", { variant: "success" });
          setForm({ loading: false, error: "" });
          router.refresh();
        })
        .catch((err) => {
          setForm({ ...form, error: err });
          console.log(err);
        });
    } else {
      await fetch(`/api/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          pid: params.id,
          dueDate: new Date(values.dueDate),
          editLabels: true,
        }),
        signal,
      })
        .then(() => {
          enqueueSnackbar("Task created successfully", { variant: "success" });
          setForm({ loading: false, error: "" });
          router.refresh();
        })
        .catch((err) => {
          setForm({ ...form, error: err });
          console.log(err);
        });
    }

    setForm({ loading: false, error: "" });
    router.refresh();
    afterFormSubmit();
  };

  return (
    <Formik
      initialValues={
        initialState
          ? {
              ...initialState,
              dueDate: format(new Date(initialState.dueDate), "yyyy-MM-dd"),
            }
          : initialValues
      }
      validationSchema={taskSchema}
      onSubmit={onSubmitHandler}
    >
      <Form>
        {form.error && <Alert variant="error">{form.error}</Alert>}

        <Field
          id="name"
          name="name"
          label="Name"
          placeholder="My Task Name"
          disabled={form.loading}
          maxLength={40}
          component={TextField}
          fullWidth
        />

        <Field
          id="dueDate"
          name="dueDate"
          label="Due Date"
          disabled={form.loading}
          component={DatePickerField}
          fullWidth
        />

        <Field
          id="labels"
          name="labels"
          label="Labels"
          disabled={form.loading}
          component={LabelsSelectField}
          fullWidth
        />

        <Field
          id="description"
          name="description"
          label="Description"
          placeholder="Walk the doggo"
          disabled={form.loading}
          maxLength={255}
          component={TextAreaField}
          fullWidth
        />

        <Field
          id="important"
          name="important"
          label="Important"
          type="checkbox"
          disabled={form.loading}
          maxLength={4}
          component={CheckBoxField}
          fullWidth
        />

        <div className="flex flex-col-reverse md:flex-row gap-2 justify-between items-center">
          <Button
            variant="text"
            className="flex justify-center"
            disabled={form.loading}
            loading={form.loading}
            loadingAnimation={false}
            onClick={afterFormSubmit}
            fullWidth
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="flex justify-center"
            disabled={form.loading}
            loading={form.loading}
            fullWidth
          >
            {editMode ? "Edit Task" : "Create Task"}
          </Button>
        </div>
      </Form>
    </Formik>
  );
};
export default TaskForm;
