import Link from "next/link";
import { LoginForm } from "./login-form";
import { BookOpen } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-4 sm:p-6 bg-muted">
      <div className="w-full max-w-sm md:max-w-3xl">
        <Link
          href="/"
          className="flex items-center space-x-1 justify-center focus-within:outline-none outline-none focus:outline-none mb-1">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-1 rounded-sm">
            <BookOpen className="h-4 w-4 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent focus:outline-none">
            Techtales.
          </h1>
        </Link>
        <LoginForm />
      </div>
    </div>
  );
}
