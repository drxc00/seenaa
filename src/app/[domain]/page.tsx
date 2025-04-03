import { isSubDomainValid } from "@/data/domain-dal";

export default async function Page({
  params,
}: {
  params: Promise<{ domain: string }>;
}) {
  const { domain } = await params;

  const domainCheck = await isSubDomainValid(domain);

  if (!domainCheck) throw new Error("Invalid Seenaa Blog");

  return (
    <main>
      <h1>{domain}</h1>
    </main>
  );
}
