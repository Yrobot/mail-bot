import { getEmailList } from "@/services";
import ListEmpty from "@/components/ListEmpty";

export default async function Home() {
  const emails = await getEmailList();
  const isEmpty = emails.length === 0;
  return (
    <main className="h-full p-4">
      <ListEmpty />
    </main>
  );
}
