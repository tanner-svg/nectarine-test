import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import { getAllPosts, getPostBySlug, getRelatedPosts, estimateReadTime, formatPostDate } from "@/lib/blog";

function ArrowOutward({ color = "#380102", size = 12 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10" fill="none">
      <path d="M1 9L9 1M9 1H1M9 1V9" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt },
    twitter: { card: "summary_large_image", title: post.title, description: post.excerpt },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const relatedPosts = getRelatedPosts(slug, 3);
  const paragraphs = post.body.split(/\n\n+/);

  return (
    <div className="bg-[#fcf8f3]">
      {/* Hero */}
      <section className="px-5 sm:px-10 lg:px-[75px] pt-[90px] lg:pt-[150px] pb-8 lg:pb-[50px]">
        <div className="max-w-[860px] mx-auto flex flex-col gap-5 lg:gap-[25px]">
          <Link
            href="/blog"
            className="font-bel text-[12px] uppercase text-[#d7432a] flex items-center gap-[8px] w-fit"
            style={{ letterSpacing: "0.1em" }}
          >
            <span className="rotate-180 inline-flex"><ArrowOutward color="#d7432a" size={10} /></span>
            Back to Blog
          </Link>
          <span
            className="font-bel text-[12px] text-[#380102] border border-[#380102] rounded-full px-[15px] py-[8px] w-fit uppercase"
            style={{ letterSpacing: "0.1em" }}
          >
            {post.category}
          </span>
          <h1 className="font-aleo font-bold text-[32px] lg:text-[48px] leading-[1.1] text-[#380102]">{post.title}</h1>
          <div className="flex items-center gap-[15px] flex-wrap font-aleo text-[14px] text-[#380102] opacity-60">
            <span>{post.author}</span>
            <span>·</span>
            <span>{formatPostDate(post.date)}</span>
            <span>·</span>
            <span>{estimateReadTime(post.body)}</span>
          </div>
        </div>
      </section>

      {/* Cover */}
      <section className="px-5 sm:px-10 lg:px-[75px] pb-10 lg:pb-[60px]">
        <div className="max-w-[860px] mx-auto rounded-[16px] overflow-hidden flex items-center justify-center" style={{ aspectRatio: "16/9", backgroundColor: post.coverColor }}>
          <Image src={post.coverIcon} alt="" width={130} height={130} className="w-[20%] h-auto opacity-80" />
        </div>
      </section>

      {/* Body */}
      <section className="px-5 sm:px-10 lg:px-[75px] pb-10 lg:pb-[75px]">
        <div className="max-w-[860px] mx-auto flex flex-col gap-[24px]">
          {paragraphs.map((p, i) => (
            <p key={i} className="font-aleo text-[17px] lg:text-[18px] leading-[1.7] text-[#380102]">
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <section className="px-5 sm:px-10 lg:px-[75px] pb-10 lg:pb-[75px]">
          <div className="max-w-[1290px] mx-auto flex flex-col gap-8 lg:gap-[35px]">
            <h2 className="font-aleo font-bold text-[26px] lg:text-[32px] text-[#380102]">More from the Blog</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-[35px]">
              {relatedPosts.map((rp) => (
                <Link key={rp.slug} href={`/blog/${rp.slug}`} className="flex flex-col gap-[15px] group">
                  <div
                    className="w-full rounded-[8px] relative overflow-hidden flex items-center justify-center transition-transform duration-500 group-hover:scale-[1.03]"
                    style={{ aspectRatio: "3/2", backgroundColor: rp.coverColor }}
                  >
                    <Image src={rp.coverIcon} alt="" width={64} height={64} className="w-[25%] h-auto opacity-80" />
                  </div>
                  <h3 className="font-aleo font-bold text-[20px] leading-[1.15] text-[#380102] group-hover:text-[#d7432a] transition-colors duration-300">
                    {rp.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer variant="dark" />
    </div>
  );
}
