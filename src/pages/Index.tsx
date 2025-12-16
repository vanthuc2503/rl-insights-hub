import { Brain, BookOpen, Code, Sparkles } from 'lucide-react';
import Header from '@/components/Header';
import BlogCard from '@/components/BlogCard';
import { useBlogStore } from '@/store/blogStore';

const Index = () => {
  const posts = useBlogStore((state) => state.posts);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-ocean-light via-background to-background">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--ocean)/0.1),transparent_50%)]" />
        <div className="container relative py-20 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 animate-fade-in items-center justify-center rounded-2xl bg-primary shadow-ocean">
            <Brain className="h-8 w-8 text-primary-foreground" />
          </div>
          
          <h1 className="mx-auto mb-4 max-w-3xl animate-fade-in text-4xl font-bold leading-tight text-foreground md:text-5xl" style={{ animationDelay: '100ms' }}>
            Khám phá thế giới{' '}
            <span className="text-primary">Reinforcement Learning</span>
          </h1>
          
          <p className="mx-auto mb-8 max-w-2xl animate-fade-in text-lg text-muted-foreground" style={{ animationDelay: '200ms' }}>
            Nơi chia sẻ kiến thức, thuật toán và ứng dụng của học tăng cường - 
            từ những khái niệm cơ bản đến các kỹ thuật tiên tiến nhất.
          </p>

          <div className="flex animate-fade-in flex-wrap justify-center gap-6" style={{ animationDelay: '300ms' }}>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <BookOpen className="h-4 w-4 text-primary" />
              <span>{posts.length} bài viết</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Code className="h-4 w-4 text-primary" />
              <span>Code examples</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Sparkles className="h-4 w-4 text-primary" />
              <span>Cập nhật thường xuyên</span>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="container py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-foreground">Bài viết mới nhất</h2>
          <p className="mt-1 text-muted-foreground">
            Các bài viết về thuật toán, lý thuyết và ứng dụng RL
          </p>
        </div>

        {posts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-border bg-muted/30 py-20 text-center">
            <Brain className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
            <p className="text-muted-foreground">Chưa có bài viết nào.</p>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-8">
        <div className="container text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            <span className="font-semibold">RL Blog</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 Reinforcement Learning Blog. Chia sẻ kiến thức RL cho cộng đồng.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
