import { client } from "@/sanity/lib/client"
import Image from "next/image"
import { Blog } from "@/app/page"
import CommentSection from "@/app/components/comment"

// Define Params interface
interface Params {
  params: { slug: string }
}

interface BlogPostProps {
  data: Blog
}

const BlogPost = async ({ params }: Params) => {
  const { slug } = params

 
  const data: Blog = await client.fetch(
    `*[_type == "blog" && slug.current == $slug]{heading, description, "slug":slug.current, "imageUrl":image.asset->url}[0]`,
    { slug }
  )

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
  )
}

export default BlogPost
