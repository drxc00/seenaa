export default async function Page({
  params,
}: {
  params: Promise<{ domain: string }>;
}) {
  const { domain } = await params;

  return (
    <main>
      <h1>{domain}</h1>
    </main>
  );
}
