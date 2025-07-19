import RegisterForm from "./register-form";

export default function Page() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10 bg-muted">
      <div className="w-full max-w-sm md:max-w-3xl">
        <RegisterForm />
      </div>
    </div>
  );
}
