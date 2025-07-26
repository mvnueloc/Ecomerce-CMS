import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    const body = await req.json();
    const { name } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is requiered", { status: 400 });
    }

    const prisma = new PrismaClient();

    const store = await prisma.store.create({
      data: { name: name, userID: userId },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.warn("[STORE_POST]", error);
    return new NextResponse("Internarl error ", { status: 500 });
  }
}
