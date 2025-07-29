"use client";

import { ComponentProps, ReactNode } from "react";

type FormSubmitButtonProps = {
  children: ReactNode;
  className?: string;
  pending?: boolean; // optional prop if you want to control it manually
} & ComponentProps<"button">;

export default function FormSubmitButton({
  children,
  className = "",
  pending = false,
  ...props
}: FormSubmitButtonProps) {
  return (
    <button
      {...props}
      className={`btn btn-primary ${className}`}
      type="submit"
      disabled={pending}
    >
      {pending && <span className="loading loading-spinner mr-2" />}
      {children}
    </button>
  );
}
