import { authOptions } from "@/shared/constants/auth-options";
import { getServerSession } from "next-auth";

export const getUserSession: any = async () => {
  const session = await getServerSession(authOptions);

  return session?.user ?? null;
};
