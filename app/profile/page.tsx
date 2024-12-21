import { getUserSession } from "@/shared/lib/get-user-session";
import { prisma } from "@/prisma/prisma-clietn";
import Container from "@/shared/components/shared/Container";
import ProfileCart from "@/shared/components/shared/profile-cart";
import { redirect } from "next/navigation";
import GetInLineSection from "@/shared/components/shared/get-in-line-section";
import { EditCalendar } from "@/shared/components/shared/edit-calendar";

const page = async () => {
  const session = await getUserSession();

  if (!session) {
    redirect("/not-authorized");
  }

  const user = await prisma.user.findFirst({
    where: {
      id: +session.id,
    },
  });

  if (!user) {
    redirect("/not-authorized");
  }

  return (
    <Container className="w-full flex justify-center gap-4 items-start my-12">
      <div className="w-[420px] flex flex-col gap-4">
        <ProfileCart user={user} />
        {session.role === "ADMIN" && <EditCalendar />}
      </div>
      <GetInLineSection isImage={false} />
    </Container>
  );
};

export default page;
