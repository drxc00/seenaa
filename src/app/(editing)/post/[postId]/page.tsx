import { Editor } from "@/components/editor";
import { getPostData } from "@/data/post-dal";

type PostData = Awaited<ReturnType<typeof getPostData>>;

export default async function PostPage({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
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
