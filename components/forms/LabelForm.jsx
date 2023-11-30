"use client";
import { Field, Form, Formik } from "formik";
import { useParams, useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useForm } from "../hooks";
import { Alert, Button } from "../ui";
import { TextField } from "./formik";
import { labelSchema } from "@/lib/yup-schemas";

const initialValues = { name: "" };

const LabelForm = ({
  initialState = null,
  editMode = false,
  afterFormSubmit = () => {},
}) => {
  const params = useParams();
  const router = useRouter();
  const [form, setForm] = useForm();

  const onSubmitHandler = async (values) => {
    setForm({ loading: true, error: "" });
    const { name } = values;

    if (editMode) {
      await fetch(`/api/labels/${params.id}`, {
        method: "PUT",
        body: JSON.stringify({ name }),
      })
        .then(() => {
          enqueueSnackbar("Label edited successfully", { variant: "success" });
          setForm({ loading: false, error: "" });
        })
        .catch((err) => {
          setForm({ ...form, error: err });
          console.log(err);
        });
    } else {
      await fetch("/api/labels", {
        method: "POST",
        body: JSON.stringify({ name }),
      })
        .then(() => {
          enqueueSnackbar("Label created successfully", { variant: "success" });
          setForm({ loading: false, error: "" });
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
      validationSchema={labelSchema}
      onSubmit={onSubmitHandler}
    >
      <Form>
        {form.error && <Alert variant="error">{form.error}</Alert>}

        <Field
          id="name"
          name="name"
          label="Enter name"
          placeholder="My Label Name"
          disabled={form.loading}
          maxLength={40}
          component={TextField}
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
            {editMode ? "Edit Label" : "Create Label"}
          </Button>
        </div>
      </Form>
    </Formik>
  );
};
export default LabelForm;
