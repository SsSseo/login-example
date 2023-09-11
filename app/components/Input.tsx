import { register } from "module";
import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import clsx from "clsx";


type InputProps = {
  label: string;
  id: string; // 입력필드와 라벨의 연결을 위한 id
  disabled?: boolean; // 입력 필드의 활성화 여부
  register: UseFormRegister<FieldValues>; // 입력 필드를 폼과 연결하는데 사용
  required?: boolean; // 필수인가 아닌가
  errors: FieldErrors;
  type?: string;
};

const Input: React.FC<InputProps> = ({ type, label, id, disabled, errors, register, required }) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-xs font-medium leading text-gray-600 ml-[2px] mb-1"
      >
        {label}
      </label>
      <div>
        <input 
          id={id} 
          autoComplete={id} 
          type={type}
          disabled={disabled} 
          {...register(id, {required})}
          className={clsx("form-input block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:test:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6 transition-all",
          errors[id] && "focus:ring-rose-500",
          disabled && "opacity-50 cursor-default"
          )}
        />
      </div>
    </div>
  );
};
export default Input;
