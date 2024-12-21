"use client";

import * as React from "react";
import { REGEXP_ONLY_DIGITS } from "input-otp";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/shared/components/ui/input-otp";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { Api } from "@/shared/services/api-client";

interface InputOTPControlledProps {
  onClose: () => void;
}

export function InputOTPControlled({ onClose }: InputOTPControlledProps) {
  const [value, setValue] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (code: number) => {
    try {
      setLoading(true);
      await Api.user.verify(code.toString());
    } catch (error) {
      console.error("Error [SEND_MAIL]", error);
    } finally {
      setLoading(false);
      onClose();
      toast.success("Email was verified", { icon: "✅" });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="font-bold text-xl">Enter code</p>
        <p className="text-gray-400">we send you a code to the mail</p>
      </div>
      <InputOTP
        value={value}
        onChange={setValue}
        className="w-full"
        maxLength={6}
        pattern={REGEXP_ONLY_DIGITS}
      >
        <InputOTPGroup className="w-full flex h-16">
          <InputOTPSlot className="flex-grow h-full" index={0} />
          <InputOTPSlot className="flex-grow h-full" index={1} />
          <InputOTPSlot className="flex-grow h-full" index={2} />
          <InputOTPSlot className="flex-grow h-full" index={3} />
          <InputOTPSlot className="flex-grow h-full" index={4} />
          <InputOTPSlot className="flex-grow h-full" index={5} />
        </InputOTPGroup>
      </InputOTP>
      <Button loading={loading} onClick={() => onSubmit(Number(value))}>
        Confirm
      </Button>
    </div>
  );
}
