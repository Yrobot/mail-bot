"use server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getEmailList = async (
  ...args: Parameters<typeof prisma.channel.findMany>
) => prisma.channel.findMany(...args);

export const createEmail = async (
  email: Omit<
    Parameters<typeof prisma.channel.create>[0]["data"],
    "id" | "status" | "createdAt" | "updatedAt"
  >,
) =>
  prisma.channel.create({
    data: { ...email, status: "ACTIVE" },
  });
