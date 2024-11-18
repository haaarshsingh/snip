export default async ({ params }: { params: Promise<{ slug: string }> }) => {
  const slug = (await params).slug;
  return <pre>{slug}</pre>;
};
