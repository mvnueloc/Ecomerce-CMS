import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import Navbar from "@/components/navbar";

export default async function Dashboard({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeID: string };
}) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const prisma = new PrismaClient();

  const store = await prisma.store.findFirst({
    where: {
      id: params.storeID,
      userID: userId,
    },
  });

  if (!store) {
    redirect("/sign-in");
  }

  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
