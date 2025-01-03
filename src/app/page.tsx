import Image from 'next/image';
import { client } from '@/sanity/lib/client';
import Link from 'next/link';
import CommentSection from './components/comment';

export interface Blog {
  heading: string;
  description: string;
  slug: string;
  imageUrl: string;
}

export default async function Home() {
  const data: Blog[] = await client.fetch(
    `*[_type == "blog"]{
      heading,
      description,
      "slug":slug.current,
      "imageUrl":image.asset->url
    }`
  );

  return (
    <main className="min-h-screen flex flex-col items-center gap-10 p-4 bg-gray-100">
      {/* Header */}
      <div className="text-blue-900 font-bold text-5xl text-center">
        BlogWeb
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.map((blog, index) => (
          <Link key={index} href={`/blog/${blog.slug}`}>
            <div className="p-4 shadow-lg rounded-lg bg-white hover:scale-105 transition-transform cursor-pointer">
              {/* Blog Image */}
              <div className="h-40 w-full overflow-hidden rounded-md">
                <Image
                  src={blog.imageUrl}
                  alt="title"
                  height={160}
                  width={240}
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Blog Content */}
              <div className="p-2">
                <h2 className="text-lg font-semibold text-gray-800 truncate">
                  {blog.heading}
                </h2>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {blog.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <CommentSection/>
    </main>
  );
}
