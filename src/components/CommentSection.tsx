import { useState } from "react";
import { User, Send } from "lucide-react";
import { useCommentStore } from "@/store/commentStore";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

interface CommentSectionProps {
    postId: string;
}

const CommentSection = ({ postId }: CommentSectionProps) => {
    const [content, setContent] = useState("");
    const [authorName, setAuthorName] = useState("");
    const { comments, addComment, getCommentsByPostId } = useCommentStore();
    const { toast } = useToast();

    const postComments = getCommentsByPostId(postId);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim()) return;

        const name = authorName.trim() || "Anonymous";

        addComment({
            postId,
            author: name,
            content: content.trim(),
        });

        setContent("");
        toast({
            title: "Bình luận đã được gửi!",
            description: "Cảm ơn bạn đã đóng góp ý kiến.",
        });
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("vi-VN", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <section className="mb-12 animate-fade-in">
            <h3 className="mb-6 text-2xl font-semibold">Bình luận ({postComments.length})</h3>

            <div className="mb-8 rounded-lg border border-border bg-card p-6 shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex gap-4">
                        <Avatar className="h-10 w-10">
                            <AvatarImage
                                src={`https://api.dicebear.com/7.x/notionists/svg?seed=${authorName || "User"
                                    }`}
                            />
                            <AvatarFallback>
                                <User />
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-4">
                            <input
                                type="text"
                                placeholder="Tên hiển thị (tùy chọn)..."
                                value={authorName}
                                onChange={(e) => setAuthorName(e.target.value)}
                                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            />
                            <Textarea
                                placeholder="Chia sẻ suy nghĩ của bạn về bài viết này..."
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="min-h-[100px]"
                            />
                            <div className="flex justify-end">
                                <Button type="submit" disabled={!content.trim()} className="gap-2">
                                    <Send className="h-4 w-4" />
                                    Gửi bình luận
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            <div className="space-y-6">
                {postComments.map((comment) => (
                    <div key={comment.id} className="flex gap-4">
                        <Avatar className="h-10 w-10 border border-border">
                            <AvatarImage src={`https://api.dicebear.com/7.x/notionists/svg?seed=${comment.author}`} />
                            <AvatarFallback>{comment.author[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1.5">
                            <div className="flex items-center gap-2">
                                <span className="font-semibold">{comment.author}</span>
                                <span className="text-xs text-muted-foreground">
                                    {formatDate(comment.createdAt)}
                                </span>
                            </div>
                            <p className="text-sm leading-relaxed text-foreground/90">
                                {comment.content}
                            </p>
                        </div>
                    </div>
                ))}
                {postComments.length === 0 && (
                    <p className="text-center text-muted-foreground italic">Chưa có bình luận nào. Hãy là người đầu tiên!</p>
                )}
            </div>
        </section>
    );
};

export default CommentSection;
