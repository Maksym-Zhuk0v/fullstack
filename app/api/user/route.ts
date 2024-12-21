import { changeEmail } from "@/app/actions";
import { getUserSession } from "@/shared/lib/get-user-session";
import { prisma } from "@/prisma/prisma-clietn";
import { hashSync } from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  await prisma.user.create({
    data: {
      email: body.email,
      fullName: body.fullName,
      password: body.password,
    },
  });

  return NextResponse.json("email");
}

export async function DELETE(req: NextRequest) {
  const body = await req.json();

  await prisma.user.deleteMany({
    where: {
      email: body.email,
    },
  });

  return NextResponse.json("deleted");
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const session = await getUserSession();

    if (!session) {
      throw new Error("You are not logged in");
    }

    const currentUser = await prisma.user.findFirst({
      where: {
        id: +session.id,
      },
    });

    if (!currentUser) {
      throw new Error("User not found");
    }

    const isEmailAlike =
      body.email.toLowerCase() === currentUser.email.toLocaleLowerCase();

    if (!isEmailAlike) {
      const userByEmail = await prisma.user.findFirst({
        where: {
          email: body.email,
        },
      });
      if (userByEmail) {
        throw new Error("Email already exists");
      }
      changeEmail(body);
    }

    const isFullNameAlike = body.fullName === currentUser.fullName;

    if (!isFullNameAlike) {
      await prisma.user.update({
        where: {
          id: +session?.id,
        },
        data: {
          fullName: body.fullName,
        },
      });
    }

    await prisma.user.update({
      where: {
        id: +session?.id,
      },
      data: {
        password:
          body.password.lenght >= 8
            ? hashSync(body.password, 10)
            : currentUser.password,
      },
    });

    return NextResponse.json("undated");
  } catch (err) {
    console.log("Error [GET_PROFILE]", err);
  }
}
