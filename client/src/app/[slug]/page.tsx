import Editor from "@/components/Editor";

export const runtime = "edge";

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
