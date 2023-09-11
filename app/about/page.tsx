"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import clsx from "clsx";
import Button from "../components/Button";

type AboutProps = {};

const About: React.FC<AboutProps> = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [fadeout, setFadeOut] = useState(false);

  const router = useRouter();

  const handleLogout = () => {
    sessionStorage.removeItem("loginToken");
    return router.replace("/");
  };

  useEffect(() => {
    const token = sessionStorage.getItem("loginToken");
    if (!token) return router.replace("/");
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL!}user`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .catch(() => {
        return router.replace("/");
      });
    setFadeOut(true);
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  if (isLoading)
    return (
      <main className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-100">
        <div
          className={clsx(
            "sm:mx-auto sm:w-full sm:max-w-md",
            fadeout
              ? "opacity-0 transition-opacity duration-1000"
              : "opacity-100"
          )}
        >
          <Image
            src="/logo_exam.png"
            height="64"
            width="64"
            alt="logo"
            className="mx-auto w-auto"
          />
          <h2 className="text-center mt-6 text-2xl font-bold tracking-tight text-gray-900">
            서현 메신저!
          </h2>
        </div>
      </main>
    );

  return (
    <div>
      <div>이 페이지는 로그인 상태에서만 접속이 가능합니다.</div>
      <Button onClick={handleLogout} fullWidth type="button">
        로그아웃
      </Button>
    </div>
  );
};
export default About;
