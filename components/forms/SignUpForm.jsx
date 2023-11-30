"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Field, Form, Formik } from "formik";
import { registerSchema } from "@/lib/yup-schemas";
import { Alert, Button, TextLink } from "../ui";
import { PasswordField, TextField } from "./formik";
import { useForm } from "../hooks";

export default function SignUpForm() {
  const router = useRouter();
  const [form, setForm] = useForm();

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const onSubmitHandler = async (values) => {
    setForm({ loading: true, error: "" });
    const { firstName, lastName, email, password } = values;

    await signIn("sign-up", {
      firstName,
      lastName,
      email,
      password,
      redirect: false,
    }).then(({ error }) => {
      if (!error) {
        router.replace("/todo");
        return;
      }

      setForm({
        loading: false,
        error: error || "Something went wrong. Please try again laterl.",
      });
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={registerSchema}
      onSubmit={onSubmitHandler}
    >
      <Form>
        {form.error && <Alert variant="error">{form.error}</Alert>}

        <div className="md:flex gap-2 justify-between">
          <Field
            id="firstName"
            name="firstName"
            label="First Name"
            placeholder="e.g. Daniel"
            disabled={form.loading}
            maxLength={60}
            component={TextField}
            fullWidth
          />
          <Field
            id="lastName"
            name="lastName"
            label="Last Name"
            placeholder="e.g. Dimitrov"
            disabled={form.loading}
            maxLength={60}
            component={TextField}
            fullWidth
          />
        </div>

        <Field
          id="email"
          name="email"
          type="email"
          label="Email Address"
          placeholder="name@address.com"
          disabled={form.loading}
          maxLength={60}
          component={TextField}
          fullWidth
        />

        <Field
          id="password"
          name="password"
          type="password"
          label="Password"
          placeholder="••••••••••"
          disabled={form.loading}
          maxLength={20}
          component={PasswordField}
          fullWidth
        />

        <Field
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          label="Confirm Password"
          placeholder="••••••••••"
          disabled={form.loading}
          maxLength={20}
          component={PasswordField}
          fullWidth
        />

        <div className="w-full flex mt-1 space-x-2 text-sm text-main">
          <span>Already have an account?</span>
          <TextLink
            href="/sign-in"
            className="font-medium"
            size="small"
            title="Sign In"
            hoverEffect={false}
            onClick={(e) => form.loading && e.preventDefault()}
          >
            Sign In
          </TextLink>
        </div>

        <Button
          type="submit"
          className="flex justify-center mt-8"
          disabled={form.loading}
          loading={form.loading}
          fullWidth
        >
          Sign Up
        </Button>
      </Form>
    </Formik>
  );
}
