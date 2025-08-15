import { Snip } from "@/app/editor";
import { FC } from "react";

export const runtime = "edge";

export default (async ({ params }) => {
  const { slug, id } = params;

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

  const raw = result?.snips.find((snip: Snip) => snip._id === id)?.content;
  return <pre className="text-xs">{raw}</pre>;
}) as FC<{ params: { slug: string; id: string } }>;
