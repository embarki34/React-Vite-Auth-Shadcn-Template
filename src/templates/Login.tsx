import { LoginForm } from "@/components/login-form";
import { AnimatedBackground } from "@/components/animated-background";
import { isAuthenticated } from "@/const/login";
import { Navigate } from "react-router-dom";

export default function LoginPage() {
  if (isAuthenticated()) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <>
      <AnimatedBackground />
      <div className="flex min-h-screen flex-col items-center justify-center  p-6 md:p-10 overflow-hidden">
        <div className="w-full max-w-sm  md:max-w-3xl ">
          <LoginForm />
        </div>
      </div>
    </>
  );
}

