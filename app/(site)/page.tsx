"use client";

import Image from "next/image";
import AuthForm from "./components/AuthForm";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem("loginToken");
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL!}user`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        router.push("/about");
      });

    setTimeout(() => setIsLoading(false), 300);

    toast.success("환영합니다.");
  }, []);

  if (isLoading) return <div></div>;

  return (
    <main className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-100">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          src="/logo_exam.png"
          height="48"
          width="48"
          alt="logo"
          className="mx-auto w-auto"
        />
        <h2 className="text-center mt-6 text-2xl font-bold tracking-tight text-gray-900">
          로그인하고 지금 바로 시작해보세요!
        </h2>
      </div>
      <AuthForm />
    </main>
  );
}
