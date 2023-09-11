"use client";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { BsGithub } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";

import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import OAuthButton from "@/app/components/OAuthButton";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

type Variant = "LOGIN" | "REGISTER";
type AuthFormProps = {};

const AuthForm: React.FC<AuthFormProps> = () => {
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  // 폼 상태 초기화
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (formData) => {
    // data에 들어오는것은 FieldValues다
    setIsLoading(true);

    if (variant == "REGISTER") {
      // 회원가입
      toast.promise(
        axios.post(`${process.env.NEXT_PUBLIC_BASE_URL!}register`, {
          id: formData.email,
          password: formData.password,
        }),
        {
          loading: "회원가입을 요청 중입니다",
          success: () => {
            reset();
            toggleVariant();

            return "회원가입 완료";
          },
          error: ({ response }) => {
            if (
              response.status === 401 &&
              response.data.message.includes("이미 존재하는")
            ) {
              return "이미 존재하는 아이디입니다.";
            }

            return "회원가입에 실패햇습니다. 관리자에게 문의해주세요.";
          },
          finally: () => {
            setIsLoading(false);
          },
        }
      );
    }

    if (variant === "LOGIN") {
      // 로그인
      toast.promise(
        axios.post(`${process.env.NEXT_PUBLIC_BASE_URL!}login`, {
          id: formData.email,
          password: formData.password,
        }),
        {
          loading: "로그인을 요청 중입니다",
          success: ({ data }) => {
            reset();
            sessionStorage.setItem("loginToken", data.token); // key, 값
            router.push("/about");

            return "로그인 성공";
          },
          error: ({ response }) => {
            if (response.data.message.includes("존재하지 않는 유저입니다.")) {
              return "이미 존재하지 않는 유저입니다.";
            }

            if (
              response.data.message.includes("비밀번호가 일치하지 않습니다.")
            ) {
              return "비밀번호가 일치하지 않습니다.";
            }

            return "로그인에 실패햇습니다. 관리자에게 문의해주세요.";
          },
          finally: () => {
            setIsLoading(false);
          },
        }
      );
    }
  };

  // 소셜로그인을 함수 하나로 처리
  const onOAuth = (provider: String) => {
    setIsLoading(true);

    // 소셜로그인 작업
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === "REGISTER" && (
            <Input label="이름" id="name" register={register} errors={errors} />
          )}
          <Input
            label="이메일"
            id="email"
            type="email"
            register={register}
            errors={errors}
          />
          <Input
            label="비밀번호"
            id="password"
            type="password"
            register={register}
            errors={errors}
          />
          <div>
            <Button disabled={isLoading} fullWidth type="submit">
              {variant === "LOGIN" ? "로그인" : "회원가입"}
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-2 text-gray-400">
                소셜로그인으로 계속하기
              </span>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <OAuthButton icon={BsGithub} onClick={() => onOAuth("github")} />
            <OAuthButton icon={FcGoogle} onClick={() => onOAuth("google")} />
          </div>
        </div>

        <div className="flex gap-2 justify-center text-xs mt-6 px-2 text-gray-500">
          <div>
            {variant === "LOGIN"
              ? "아직도 회원이 아니신가요?"
              : "이미회원이신가요?"}
          </div>
          <div onClick={toggleVariant} className="underline cursor-pointer">
            {variant === "LOGIN" ? "회원가입하기" : "로그인 하러가기"}
          </div>
        </div>
      </div>
    </div>
  );
};
export default AuthForm;
