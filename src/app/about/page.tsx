import { parse } from "marked";
import PageHead from "@/components/PageHead";
import { route } from "@/routes";
import readme from "README.md";

async function AboutPage() {
  return (
    <main className="h-full p-4">
      <PageHead title={route.about.name} extend={<></>} />
      <div className="pb-8">
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{
            __html: parse(readme),
          }}
        />
      </div>
    </main>
  );
}

export default AboutPage;
