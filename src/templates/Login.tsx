import { LoginForm } from "@/components/login-form";
import { AnimatedBackground } from "@/components/animated-background";

export default function LoginPage() {
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

