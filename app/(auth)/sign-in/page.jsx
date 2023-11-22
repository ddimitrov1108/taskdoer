import { SignInForm } from "@/components/forms";

const SignInPage = () => {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl xl:text-4xl font-semibold">Sign In</h1>
        <p className="mt-1 text-slate-500">
          Welcome back! Enter your login details.
        </p>
      </div>

      <div className="w-full">
        <SignInForm />
      </div>
    </>
  );
};

export default SignInPage;
