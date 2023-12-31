"use client";
import { Field, Form, Formik } from "formik";
import { useParams, useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useForm } from "../hooks";
import { Alert, Button } from "../ui";
import { TextField } from "./formik";
import { labelSchema } from "@/lib/yup-schemas";


const LabelForm = ({
  initialState = null,
  editMode = false,
  afterFormSubmit = () => {},
}) => {
  const params = useParams();
  const router = useRouter();
  const [form, setForm] = useForm();
  const initialValues = { name: "" };
  
  const onSubmitHandler = async (values) => {
    setForm({ loading: true, error: "" });
    const { name } = values;
    const { signal } = new AbortController();
    const body = JSON.stringify({ name });

    if (editMode) {
      await fetch(`/api/labels/${params.id}`, {
        method: "PUT",
        body,
        signal,
      })
        .then((data) => data.json())
        .then(({ error }) => {
          if (error) throw error;

          enqueueSnackbar("Label edited successfully!", { variant: "success" });
          router.refresh();
          afterFormSubmit();
        })
        .catch((error) => {
          setForm({ ...form, error: error });
        });
    } else {
      await fetch("/api/labels", {
        method: "POST",
        body,
        signal,
      })
        .then((data) => data.json())
        .then(({ error }) => {
          if (error) throw error;

          enqueueSnackbar("Label created successfully!", {
            variant: "success",
          });
          router.refresh();
          afterFormSubmit();
        })
        .catch((error) => {
          setForm({ ...form, error: error });
        });
    }
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
          maxLength={20}
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
