"use client";
import { cn } from "@/lib/utils";
import { Button } from "@nextui-org/react";
import React, { FC } from "react";

interface MyButtonProps {
  title: string;
  className?: string;
}
const MyButton: FC<MyButtonProps> = ({ title, className }) => {
  return (
    <>
      <Button
        radius="sm"
        className={cn("bg-red-primary text-white rounded-md", className)}
      >
        {title}
      </Button>
    </>
  );
};

export default MyButton;
