import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Download, Calendar, User, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import { useBlogStore } from '@/store/blogStore';
import { useToast } from '@/hooks/use-toast';

const BlogPostPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const post = useBlogStore((state) => state.getPost(id || ''));

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleDownloadPDF = async () => {
    if (!post) return;

    toast({
      title: 'Đang tạo PDF...',
      description: 'Vui lòng đợi trong giây lát.',
    });

    try {
      const html2pdf = (await import('html2pdf.js')).default;
      const element = document.getElementById('blog-content');
      
      if (!element) return;

      const opt = {
        margin: [10, 10, 10, 10] as [number, number, number, number],
        filename: `${post.title.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`,
        image: { type: 'jpeg' as const, quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm' as const, format: 'a4' as const, orientation: 'portrait' as const },
      };

      await html2pdf().set(opt).from(element).save();

      toast({
        title: 'Tải xuống thành công!',
        description: 'File PDF đã được tải xuống.',
      });
    } catch (error) {
      toast({
        title: 'Lỗi',
        description: 'Không thể tạo file PDF.',
        variant: 'destructive',
      });
    }
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-20 text-center">
          <h1 className="mb-4 text-2xl font-semibold">Không tìm thấy bài viết</h1>
          <p className="mb-8 text-muted-foreground">Bài viết bạn tìm kiếm không tồn tại.</p>
          <Button onClick={() => navigate('/')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại trang chủ
          </Button>
        </div>
      </div>
    );
  }

  const renderContent = (content: string) => {
    const lines = content.split('\n');
    const elements: JSX.Element[] = [];
    let inCodeBlock = false;
    let codeContent = '';
    let codeLanguage = '';

    lines.forEach((line, index) => {
      if (line.startsWith('```')) {
        if (!inCodeBlock) {
          inCodeBlock = true;
          codeLanguage = line.slice(3).trim();
          codeContent = '';
        } else {
          elements.push(
            <pre key={index} className="my-4 overflow-x-auto rounded-lg bg-muted p-4">
              <code className="font-mono text-sm">{codeContent.trim()}</code>
            </pre>
          );
          inCodeBlock = false;
        }
        return;
      }

      if (inCodeBlock) {
        codeContent += line + '\n';
        return;
      }

      if (line.startsWith('# ')) {
        elements.push(
          <h1 key={index} className="mb-6 mt-8 text-3xl font-bold text-foreground">
            {line.slice(2)}
          </h1>
        );
      } else if (line.startsWith('## ')) {
        elements.push(
          <h2 key={index} className="mb-4 mt-8 text-2xl font-semibold text-foreground">
            {line.slice(3)}
          </h2>
        );
      } else if (line.startsWith('### ')) {
        elements.push(
          <h3 key={index} className="mb-3 mt-6 text-xl font-semibold text-foreground">
            {line.slice(4)}
          </h3>
        );
      } else if (line.startsWith('- ')) {
        elements.push(
          <li key={index} className="ml-6 list-disc text-foreground/90">
            {renderInlineFormatting(line.slice(2))}
          </li>
        );
      } else if (line.trim() === '') {
        elements.push(<div key={index} className="h-4" />);
      } else {
        elements.push(
          <p key={index} className="mb-4 leading-relaxed text-foreground/90">
            {renderInlineFormatting(line)}
          </p>
        );
      }
    });

    return elements;
  };

  const renderInlineFormatting = (text: string) => {
    const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code key={index} className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-primary">
            {part.slice(1, -1)}
          </code>
        );
      }
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index} className="font-semibold">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container max-w-4xl py-8">
        <div className="mb-8 flex items-center justify-between">
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Quay lại
            </Button>
          </Link>
          
          <Button onClick={handleDownloadPDF} className="gap-2">
            <Download className="h-4 w-4" />
            Tải PDF
          </Button>
        </div>

        <article id="blog-content" className="animate-fade-in">
          <header className="mb-8 border-b border-border pb-8">
            <div className="mb-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  <Tag className="mr-1 h-3 w-3" />
                  {tag}
                </Badge>
              ))}
            </div>
            
            <h1 className="mb-6 text-4xl font-bold leading-tight text-foreground">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <time dateTime={post.createdAt}>{formatDate(post.createdAt)}</time>
              </div>
            </div>
          </header>

          <div className="prose prose-lg max-w-none">
            {renderContent(post.content)}
          </div>
        </article>
      </main>
    </div>
  );
};

export default BlogPostPage;
