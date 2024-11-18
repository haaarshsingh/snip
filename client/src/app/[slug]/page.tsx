import Editor, { EditorProps } from "@/components/Editor";

const example: EditorProps = {
  title: "Example",
  readOnly: true,
  slug: "woqejqwoe",
  snips: [
    {
      title: "example.js",
      content: `console.log("Hello, World!");`,
      language: "JavaScript",
    },
    {
      title: "example.ts",
      content: `console.log("Hello, World!");\nconsole.log("Error");`,
      language: "TypeScript",
    },
  ],
};

export default async ({ params }: { params: Promise<{ slug: string }> }) => {
  const slug = (await params).slug;

  const requestOptions = { method: "GET" };
  const result = await fetch(
    `https://api.snip.tf/snips/get/${slug}`,
    requestOptions,
  )
    .then((response) => {
      if (!response.ok) throw new Error("Failed to fetch data");
      return response.json();
    })
    .catch((error) => {
      console.error(error);
      return null;
    });

  return (
    <main>
      <Editor readOnly {...result} />
    </main>
  );
};
