"use client";
import { Field, Form, Formik } from "formik";
import { useParams, useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useForm } from "../hooks";
import { Alert, Button } from "../ui";
import { ColorPickerField, TextField } from "./formik";
import { projectSchema } from "@/lib/yup-schemas";

const initialValues = { name: "", color: "#f44336" };

const ProjectForm = ({
  initialState = null,
  editMode = false,
  afterFormSubmit = () => {},
}) => {
  const params = useParams();
  const router = useRouter();
  const [form, setForm] = useForm();

  const onSubmitHandler = async (values) => {
    setForm({ loading: true, error: "" });
    const { name, color } = values;

    if (editMode) {
      await fetch(`/api/projects/${params.id}`, {
        method: "PUT",
        body: JSON.stringify({
          name,
          color,
        }),
      })
        .then(() => {
          enqueueSnackbar("Project edited successfully", {
            variant: "success",
          });
          setForm({ loading: false, error: "" });
        })
        .catch((err) => {
          setForm({ ...form, error: err });
          console.log(err);
        });
    } else {
      await fetch("/api/projects", {
        method: "POST",
        body: JSON.stringify({
          name,
          color,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          enqueueSnackbar("Project created successfully", {
            variant: "success",
          });
          setForm({ loading: false, error: "" });
          router.replace(data.href);
        })
        .catch((err) => {
          setForm({ ...form, error: err });
          console.log(err);
        });
    }

    router.refresh();
    afterFormSubmit();
  };

  return (
    <Formik
      initialValues={initialState || initialValues}
      validationSchema={projectSchema}
      onSubmit={onSubmitHandler}
    >
      <Form>
        {form.error && <Alert variant="error">{form.error}</Alert>}
        <Field
          id="name"
          name="name"
          label="Enter name"
          placeholder="My Project Name"
          disabled={form.loading}
          maxLength={40}
          component={TextField}
          fullWidth
        />

        <Field
          id="color"
          name="color"
          label="Color"
          disabled={form.loading}
          maxLength={10}
          component={ColorPickerField}
          className="mb-8"
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
            {editMode ? "Edit Project" : "Create Project"}
          </Button>
        </div>
      </Form>
    </Formik>
  );
};
export default ProjectForm;
