"use client";
import { Field, Form, Formik } from "formik";
import { enqueueSnackbar } from "notistack";
import { useForm } from "../hooks";
import { Alert, Button } from "../ui";
import {
  ChipSelectField,
  DatePickerField,
  TextAreaField,
  TextField,
} from "./formik";
import { taskSchema } from "@/lib/yup-schemas";
import { format } from "date-fns";
import useSWR from "swr";
import { fetcher } from "@/lib/swr-fetcher";

const initialValues = {
  name: "",
  description: "",
  dueDate: format(new Date(), "yyyy-MM-dd"),
  taskLabels: [],
};

const TaskForm = ({
  initialState = null,
  editMode = false,
  afterFormSubmit = () => {},
}) => {
  const { data, isLoading } = useSWR("/api/labels", fetcher);
  const [form, setForm] = useForm();

  const onSubmitHandler = async (values) => {
    setForm({ loading: true, error: "" });
    const { name, description, dueDate, taskLabels } = values;

    if (editMode) {
      console.log(`editMode`);
      console.log(values);
    } else {
      console.log(`newTask`);
      console.log(values);
    }

    setForm({ loading: false, error: "" });
    // mutate("/api/labels");
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
          label="Enter name"
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
          id="taskLabels"
          name="taskLabels"
          label="Task Labels"
          disabled={form.loading}
          component={ChipSelectField}
          options={data}
          fullWidth
        />

        <Field
          id="description"
          name="description"
          label="Enter task description"
          placeholder="Walk the doggo"
          disabled={form.loading}
          maxLength={255}
          component={TextAreaField}
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
            Edit Task
          </Button>
        </div>
      </Form>
    </Formik>
  );
};
export default TaskForm;
