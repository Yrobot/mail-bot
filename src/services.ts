"use server";
import type { Channel } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { PrismaClient } from "@prisma/client";
import { Status } from "@/constant";

const prisma = new PrismaClient();

export const getEmailList = async () =>
  // where: Parameters<typeof prisma.channel.findMany>[0] ,
  prisma.channel.findMany({
    where: {
      status: {
        in: [Status.ACTIVE, Status.CLOSED],
      },
    },
  });

export const deleteEmail = async (email: string) =>
  prisma.channel
    .update({
      where: { account: email },
      data: { status: Status.DELETED },
    })
    .then((res) => {
      revalidatePath("/");
      return res;
    });

export const activeEmail = async (email: string) =>
  prisma.channel
    .update({
      where: { account: email },
      data: { status: Status.ACTIVE },
    })
    .then((res) => {
      revalidatePath("/");
      return res;
    });

export const closeEmail = async (email: string) =>
  prisma.channel
    .update({
      where: { account: email },
      data: { status: Status.CLOSED },
    })
    .then((res) => {
      revalidatePath("/");
      return res;
    });

export const createEmail = async (
  email: Omit<
    Parameters<typeof prisma.channel.create>[0]["data"],
    "id" | "status" | "createdAt" | "updatedAt"
  >,
) =>
  prisma.channel
    .create({
      data: { ...email, status: "ACTIVE" },
    })
    .then((res) => {
      revalidatePath("/");
      return res;
    });

export const updateEmail = async ({
  account,
  token,
  port,
  host,
  export: export_,
  status,
}: Partial<Channel>) =>
  prisma.channel
    .update({
      where: { account },
      data: { token, port, host, export: export_, status },
    })
    .then((res) => {
      revalidatePath("/");
      return res;
    });
