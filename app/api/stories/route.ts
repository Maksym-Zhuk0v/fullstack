import { prisma } from "@/prisma/prisma-clietn";
import { NextResponse } from "next/server";

export async function GET() {
  const stories = await prisma.story.findMany({
    include: {
      items: true,
    },
  });
  return NextResponse.json(stories);
}

// export async function POST(req: Request) {
//   const body = await req.json();
//   const story = await prisma.story.create({
//     data: {
//       items: {
//         createMany: {
//           data: body.items,
//         },
//       },
//     },
//   });
//   return NextResponse.json(story);
// }
