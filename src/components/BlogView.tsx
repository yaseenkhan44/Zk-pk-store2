import React, { useState } from 'react';
import { BookOpen, Clock, User, ArrowRight, X, Sparkles } from 'lucide-react';
import { BLOG_POSTS } from '../data/blog';
import { BlogPost } from '../types';

export const BlogView: React.FC = () => {
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Blog Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-300 text-xs font-semibold uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" />
          <span>ZK.PK Horology Knowledge Base</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-luxury">
          The Watch Connoisseur's Guide
        </h1>
        <p className="text-sm sm:text-base text-slate-300 font-light">
          Master the art of wearing, maintaining, and choosing high-performance wristwatches. Original insights written specifically for watch enthusiasts across Pakistan.
        </p>
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {BLOG_POSTS.map((post) => (
          <article
            key={post.id}
            onClick={() => setActivePost(post)}
            className="group bg-[#12141f] border border-white/10 hover:border-amber-400/50 rounded-2xl overflow-hidden cursor-pointer flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10"
          >
            <div>
              {/* Cover Image */}
              <div className="relative aspect-video overflow-hidden bg-black">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 flex gap-1.5">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="bg-black/70 backdrop-blur-sm border border-white/10 text-amber-300 text-[10px] font-semibold px-2 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-5 space-y-3">
                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <span>{post.date}</span>
                  <span>·</span>
                  <span>{post.readTime}</span>
                </div>

                <h2 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-400 transition-colors leading-snug line-clamp-2">
                  {post.title}
                </h2>

                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            </div>

            <div className="p-5 pt-0 border-t border-white/5 flex items-center justify-between text-xs text-amber-400 font-bold group-hover:translate-x-1 transition-transform">
              <span>Read Full Article</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </article>
        ))}
      </div>

      {/* Article Reader Modal */}
      {activePost && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in">
          <div className="relative w-full max-w-3xl bg-[#11131c] rounded-3xl border border-white/15 p-6 sm:p-10 shadow-2xl space-y-6 my-auto max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setActivePost(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-black/60 hover:bg-black text-slate-300 hover:text-white border border-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="space-y-3 pr-8">
              <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold uppercase tracking-wider">
                <span>{activePost.date}</span>
                <span>·</span>
                <span>{activePost.readTime}</span>
                <span>·</span>
                <span className="text-slate-400">By {activePost.author}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-luxury leading-tight">
                {activePost.title}
              </h2>
            </div>

            {/* Featured Image */}
            <div className="aspect-video rounded-2xl overflow-hidden bg-black border border-white/10">
              <img
                src={activePost.image}
                alt={activePost.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content Paragraphs */}
            <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed font-light">
              {activePost.content.map((p, idx) => (
                <p key={idx} className="whitespace-pre-line">
                  {p}
                </p>
              ))}
            </div>

            {/* Post Footer */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span>Tags:</span>
                {activePost.tags.map((t) => (
                  <span key={t} className="text-amber-400 font-medium">#{t}</span>
                ))}
              </div>
              <button
                onClick={() => setActivePost(null)}
                className="px-5 py-2 rounded-xl bg-amber-400 text-black font-bold text-xs hover:bg-amber-300 transition-colors"
              >
                Close Article
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
