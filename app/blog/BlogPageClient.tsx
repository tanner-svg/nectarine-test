"use client";
import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import { estimateReadTime, formatPostDate } from "@/lib/blog";
import type { BlogPost, BlogCategory } from "@/types/blog";

function ArrowOutward({ color = "#380102", size = 12 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10" fill="none">
      <path d="M1 9L9 1M9 1H1M9 1V9" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SearchIcon({ color = "#380102" }: { color?: string }) {
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none">
      <circle cx="7" cy="7" r="5.5" stroke={color} strokeWidth="1.5" />
      <path d="M11.5 11.5L15 15" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CategoryPill({ category, filled = false }: { category: string; filled?: boolean }) {
  return (
    <span
      className="font-bel text-[9px] uppercase tracking-[0.155em] px-[12px] py-[8px] rounded-[15px] whitespace-nowrap"
      style={
        filled
          ? { backgroundColor: "#ffc1a7", color: "#380102", border: "1px solid transparent" }
          : { border: "1px solid #380102", color: "#380102" }
      }
    >
      {category}
    </span>
  );
}

function BlogCover({ post }: { post: BlogPost }) {
  return (
    <div
      className="w-full rounded-[8px] relative overflow-hidden flex items-center justify-center transition-transform duration-500 group-hover:scale-[1.03]"
      style={{ aspectRatio: "3/2", backgroundColor: post.coverColor }}
    >
      <Image src={post.coverIcon} alt="" width={64} height={64} className="w-[25%] h-auto opacity-80" />
    </div>
  );
}

function FeaturedPost({ post }: { post: BlogPost }) {
  return (
    <section className="px-5 sm:px-10 lg:px-[75px] pt-[90px] lg:pt-[150px] pb-10 lg:pb-[60px]" style={{ backgroundColor: "#380102" }}>
      <div className="max-w-[1290px] mx-auto">
        <Link href={`/blog/${post.slug}`} className="group flex flex-col lg:flex-row gap-8 lg:gap-[60px] items-center">
          <div className="w-full lg:w-[45%] rounded-[16px] overflow-hidden" style={{ backgroundColor: post.coverColor }}>
            <div className="relative w-full flex items-center justify-center" style={{ aspectRatio: "4/3" }}>
              <Image src={post.coverIcon} alt="" width={110} height={110} className="w-[30%] h-auto opacity-80 transition-transform duration-500 group-hover:scale-[1.05]" />
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-5 lg:gap-[25px]">
            <span
              className="font-bel text-[13px] text-[#f9ce6a] border border-[#f9ce6a] rounded-full px-[15px] py-[8px] w-fit uppercase"
              style={{ letterSpacing: "0.1em" }}
            >
              Featured
            </span>
            <h1 className="font-aleo font-bold text-[32px] lg:text-[48px] leading-[1.1] text-[#fcf8f3] group-hover:text-[#f9ce6a] transition-colors duration-300">
              {post.title}
            </h1>
            <p className="font-aleo text-[16px] lg:text-[18px] text-[#fcf8f3] opacity-80 leading-[1.5] max-w-[560px]">
              {post.excerpt}
            </p>
            <div className="flex items-center gap-[15px] flex-wrap">
              <span
                className="font-bel text-[9px] uppercase tracking-[0.155em] px-[12px] py-[8px] rounded-[15px] border border-[#fcf8f3]/60 text-[#fcf8f3]"
              >
                {post.category}
              </span>
              <span className="font-aleo text-[13px] text-[#fcf8f3] opacity-60">{formatPostDate(post.date)}</span>
              <span className="font-aleo text-[13px] text-[#fcf8f3] opacity-60">{estimateReadTime(post.body)}</span>
            </div>
            <div className="flex items-center gap-[10px] font-bel text-[13px] uppercase text-[#f9ce6a]" style={{ letterSpacing: "0.1em" }}>
              Read the Full Story
              <ArrowOutward color="#f9ce6a" size={12} />
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="flex flex-col gap-[15px] group">
      <BlogCover post={post} />
      <div className="flex flex-col gap-[10px]">
        <div className="flex items-center gap-[10px] flex-wrap">
          <CategoryPill category={post.category} />
          <span className="font-aleo text-[12px] text-[#380102] opacity-60">{formatPostDate(post.date)}</span>
        </div>
        <h3 className="font-aleo font-bold text-[22px] lg:text-[26px] leading-[1.15] text-[#380102] group-hover:text-[#d7432a] transition-colors duration-300">
          {post.title}
        </h3>
        <p className="font-aleo text-[15px] text-[#380102] opacity-70 leading-[1.4] line-clamp-2">{post.excerpt}</p>
        <span className="font-aleo text-[12px] text-[#380102] opacity-50">{estimateReadTime(post.body)}</span>
      </div>
    </Link>
  );
}

interface Props {
  featuredPost: BlogPost;
  posts: BlogPost[];
  categories: BlogCategory[];
}

export default function BlogPageClient({ featuredPost, posts, categories }: Props) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<BlogCategory | "All">("All");

  const filteredPosts = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesCategory = activeCategory === "All" || post.category === activeCategory;
      const matchesQuery =
        q.length === 0 ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [posts, query, activeCategory]);

  return (
    <div className="bg-[#fcf8f3]">
      <FeaturedPost post={featuredPost} />

      {/* Search + filter */}
      <section className="px-5 sm:px-10 lg:px-[75px] pt-10 lg:pt-[60px] pb-6 lg:pb-[30px]">
        <div className="max-w-[1290px] mx-auto flex flex-col gap-6 lg:gap-[25px]">
          <div className="flex items-center gap-[12px] border border-[#380102] rounded-full px-[20px] h-[48px] w-full lg:max-w-[420px] bg-white/40">
            <SearchIcon />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles..."
              aria-label="Search articles"
              className="flex-1 bg-transparent outline-none font-inter text-[14px] text-[#380102] placeholder-[#380102]/45"
            />
          </div>

          <div className="flex items-center gap-[10px] flex-wrap">
            {(["All", ...categories] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="font-bel text-[12px] uppercase tracking-[0.1em] px-[16px] py-[9px] rounded-full border transition-colors duration-200"
                style={
                  activeCategory === cat
                    ? { backgroundColor: "#d7432a", borderColor: "#d7432a", color: "#fcf8f3" }
                    : { backgroundColor: "transparent", borderColor: "#380102", color: "#380102" }
                }
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="px-5 sm:px-10 lg:px-[75px] pb-10 lg:pb-[75px]">
        <div className="max-w-[1290px] mx-auto">
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-[35px]">
              {filteredPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <p className="font-aleo text-[16px] text-[#380102] opacity-60 py-[40px] text-center">
              No articles match "{query}"{activeCategory !== "All" ? ` in ${activeCategory}` : ""}. Try a different search or category.
            </p>
          )}
        </div>
      </section>

      <Footer variant="dark" />
    </div>
  );
}
