import { sendMessage } from "@/services";
import { Status } from "@/constant";
import prisma from "@/db";

export async function POST(
  request: Request,
  { params }: { params: { email: string } },
) {
  try {
    const email = params.email;
    const channel = await prisma.channel.findUnique({
      where: { account: email, status: Status.ACTIVE },
    });
    if (!channel) throw new Error("Email not found");
    if (!channel.export)
      throw new Error(
        "This email not allowed to be called through http directly",
      );
    const message = (await request.json()) as Parameters<typeof sendMessage>[0];
    await sendMessage({ ...message, email });
    return new Response("ok", {
      status: 200,
    });
  } catch (error: Error | any) {
    return new Response(error.message, {
      status: 400,
    });
  }
}
