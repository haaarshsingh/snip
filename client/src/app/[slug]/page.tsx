import Editor, { EditorProps } from "@/components/Editor";

const example: EditorProps = {
  title: "Example",
  readOnly: true,
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

  return (
    <main>
      <Editor {...example} />
    </main>
  );
};
