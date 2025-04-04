import { Editor } from "@/components/editor";
import { getAuthData } from "@/data/auth-data";
import { getPostData } from "@/data/post-dal";
import { redirect } from "next/navigation";

type PostData = Awaited<ReturnType<typeof getPostData>>;

export default async function PostPage({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const authData = await getAuthData();
  if (!authData?.session) redirect("/signin");

  const { postId } = await params;
  const postData: PostData = (await getPostData(postId)) as PostData;
  return (
    <main>
      <Editor
        post={{
          ...postData[0],
          postId,
        }}
      />
    </main>
  );
}
