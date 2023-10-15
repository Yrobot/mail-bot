export async function POST(request: Request) {
  const { email, name } = await request.json();
  return new Response(name);
}
