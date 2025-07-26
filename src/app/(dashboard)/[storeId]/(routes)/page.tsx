import { PrismaClient } from "@prisma/client";

interface DashboardPageProps {
  params: Promise<{ storeId: string }>;
}
export default async function DashboardPage({ params }: DashboardPageProps) {
  const prisma = new PrismaClient();
  const { storeId } = await params;
  const store = await prisma.store.findFirst({
    where: {
      id: storeId,
    },
  });

  return <div className="p-4">{store?.name}</div>;
}

export const dynamic = "force-dynamic";
