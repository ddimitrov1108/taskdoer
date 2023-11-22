"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Field, Form, Formik } from "formik";
import { loginSchema } from "@/lib/yup-schemas";
import { Alert, Button, TextLink } from "../ui";
import { PasswordField, TextField } from "./formik";
import { useForm } from "../hooks";

export default function SignInForm() {
  const router = useRouter();
  const [form, setForm] = useForm();
  const initialValues = { email: "", password: "" };

  const onSubmitHandler = async (values) => {
    setForm({ loading: true, error: "" });
    const { email, password } = values;

    await signIn("sign-in", {
      email,
      password,
      redirect: false,
    }).then(({ error }) => {
      if (!error) {
        router.replace("/me");
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
      validationSchema={loginSchema}
      onSubmit={onSubmitHandler}
    >
      <Form>
        {form.error && <Alert variant="error">{form.error}</Alert>}

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

        <div className="w-full flex mt-1 space-x-2 text-sm text-gray-400">
          <span>Dont have an account?</span>
          <TextLink
            href="/sign-up"
            className="font-[500]"
            size="small"
            title="Sign Up"
            hoverEffect={false}
            onClick={(e) => form.loading && e.preventDefault()}
          >
            Sign Up
          </TextLink>
        </div>

        <Button
          type="submit"
          className="flex justify-center mt-8"
          disabled={form.loading}
          loading={form.loading}
          fullWidth
        >
          Sign In
        </Button>
      </Form>
    </Formik>
  );
}
