import { sendMessage } from "@/services";

export async function POST(
  request: Request,
  { params }: { params: { email: string } },
) {
  try {
    const email = params.email;
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
