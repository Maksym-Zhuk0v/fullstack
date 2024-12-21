"use client";

import React from "react";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import { Input } from "../ui/input";
import { FileLock2, Mail, User as UserIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Api } from "@/shared/services/api-client";

interface Props {
  user: any;
}

const ProfileCart = ({ user }: Props) => {
  const [loading, setLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: user.email,
      fullName: user.fullName,
      password: user.password,
    },
  });

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      await Api.user.update(data);
    } catch (error) {
      toast.error("This email is already in use");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full border border-secondary rounded-md px-4 py-6">
      <p className="text-2xl font-bold">You can change your profile</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center rounded-md px-3 py-2">
          <Mail className="w-5 h-5 text-gray-500 mr-2" />
          <Input
            type="email"
            placeholder="Enter your email"
            className="mt-2 border rounded-md px-3 py-2"
            {...register("email")}
          />
        </div>
        <div className="flex items-center rounded-md px-3 py-2">
          <FileLock2 className="w-5 h-5 text-gray-500 mr-2" />
          <Input
            type="text"
            placeholder="Enter your password"
            className="mt-2 border rounded-md px-3 py-2"
          />
        </div>
        <div className="flex items-center rounded-md px-3 py-2">
          <UserIcon className="w-5 h-5 text-gray-500 mr-2" />
          <Input
            type="text"
            placeholder="Enter your full name"
            className="mt-2 border rounded-md px-3 py-2"
            {...register("fullName")}
          />
        </div>
        <Button
          loading={loading}
          type="submit"
          className="mt-2 w-full bg-primary text-primary-foreground rounded-md"
        >
          Save
        </Button>
      </form>
      <Button
        loading={loading}
        onClick={() => signOut({ callbackUrl: "/" })}
        type="button"
        className="w-full mt-2"
        variant={"secondary"}
      >
        Log out
      </Button>
    </div>
  );
};

export default ProfileCart;
