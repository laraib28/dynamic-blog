import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { Blog } from "@/app/page";
import CommentSection from "@/app/components/comment";

// Define Params interface
interface Params {
  params: { slug: string };
}

// Define BlogPost component
const BlogPost = async ({ params }: Params) => {
  const { slug } = params;

  // Fetch blog data from Sanity
  const data: Blog | null = await client.fetch(
    `*[_type == "blog" && slug.current == $slug]{heading, description, "slug": slug.current, "imageUrl": image.asset->url}[0]`,
    { slug }
  );

  // Handle case when data is null
  if (!data) {
    return (
      <main className="max-w-5xl my-20 mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold">Blog Post Not Found</h1>
      </main>
    );
  }

  return (
    <main className="max-w-5xl my-20 shadow-xl rounded-lg mx-auto p-4 flex flex-col gap-4 items-center">
      <div>
        <Image
          src={data.imageUrl}
          alt={data.heading}
          height={600}
          width={1024}
          className="rounded-lg object-cover h-[20rem]"
        />
      </div>
      <div>
        <h2 className="text-3xl font-bold my-10">{data.heading}</h2>
        <p>{data.description}</p>
      </div>
      <CommentSection />
    </main>
  );
};

export default BlogPost;
