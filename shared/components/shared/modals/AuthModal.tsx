"use client";

import React from "react";
import { LoginForm } from "./form/login-form";
import { RegisterForm } from "./form/register-form";
import { Dialog, DialogContent } from "../../ui/dialog";
import { Button } from "../../ui/button";
import { signIn } from "next-auth/react";
import { InputOTPControlled } from "../input-OT-controlled";

interface Props {
  open: boolean;
  onClose: () => void;
  type: "login" | "register" | "verification";
  setType: React.Dispatch<
    React.SetStateAction<"login" | "register" | "verification">
  >;
}

export const AuthModal: React.FC<Props> = ({
  open,
  onClose,
  type,
  setType,
}) => {
  const onSwitchType = () => {
    setType(type === "register" ? "login" : "register");
  };

  const handleClose = () => {
    if (type !== "verification") onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        {type === "verification" ? (
          <div className="w-[450px] bg-background p-10 flex flex-col gap-2 rounded-xl">
            <InputOTPControlled onClose={onClose} />
          </div>
        ) : (
          <div className="w-[450px] bg-background p-10 flex flex-col gap-2">
            {type === "login" ? (
              <LoginForm onClose={handleClose} />
            ) : (
              <RegisterForm setType={setType} onClose={handleClose} />
            )}

            <hr />
            <div className="flex gap-2">
              <Button
                disabled
                type="button"
                className="gap-2 h-12 p-2 flex-1"
                variant={"secondary"}
              >
                <img
                  className="w-6 h-6"
                  src="https://github.githubassets.com/favicons/favicon.svg"
                />
                GitHub
              </Button>

              <Button
                type="button"
                className="gap-2 h-12 p-2 flex-1"
                variant={"secondary"}
                onClick={() =>
                  signIn("google", {
                    callbackUrl: "/",
                    redirect: true,
                  })
                }
              >
                <img
                  className="w-6 h-6"
                  src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
                />
                Google
              </Button>
            </div>

            <Button
              onClick={onSwitchType}
              type="button"
              className="h-12"
              variant={"secondary"}
            >
              {type !== "login" ? "Войти" : "Регистрация"}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
