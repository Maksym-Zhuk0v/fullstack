import React from "react";
import { Button } from "../ui/button";
import { cn } from "@/shared/lib/utils";

interface Props {
  setIsLogIn: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenAuthModal: React.Dispatch<React.SetStateAction<boolean>>;
  status: "authenticated" | "loading" | "unauthenticated";
}

const RegisratoinComponent = ({
  setIsLogIn,
  setOpenAuthModal,
  status,
}: Props) => {
  return (
    <div className="w-full flex flex-col gap-4">
      <Button
        onClick={() => {
          setIsLogIn(true);
          setOpenAuthModal(true);
        }}
      >
        Log in
      </Button>
      <Button
        loading={status === "loading"}
        className={cn("group relative", {
          "w-[105px]": status === "loading",
        })}
        onClick={() => {
          setIsLogIn(false);
          setOpenAuthModal(true);
        }}
        variant={"ghost"}
      >
        Sign up
      </Button>
    </div>
  );
};

export default RegisratoinComponent;
