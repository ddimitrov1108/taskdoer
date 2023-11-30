import { SignInForm } from "@/components/forms";

const SignInPage = () => {
  return (
    <>
      <div className="grid gap-1 mb-8">
        <h1 className="text-3xl xl:text-4xl font-semibold text-white">
          Sign In
        </h1>
        <p className="text-main">Welcome back! Enter your login details.</p>
      </div>

      <div className="w-full">
        <SignInForm />
      </div>
    </>
  );
};

export default SignInPage;
