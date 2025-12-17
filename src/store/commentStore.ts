import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Comment {
    id: string;
    postId: string;
    author: string;
    content: string;
    createdAt: string;
}

interface CommentStore {
    comments: Comment[];
    addComment: (comment: Omit<Comment, 'id' | 'createdAt'>) => void;
    getCommentsByPostId: (postId: string) => Comment[];
}

export const useCommentStore = create<CommentStore>()(
    persist(
        (set, get) => ({
            comments: [
                {
                    id: '1',
                    postId: '1',
                    author: 'Alice',
                    content: 'Bài viết rất hay và dễ hiểu!',
                    createdAt: '2024-03-10T09:00:00Z'
                },
                {
                    id: '2',
                    postId: '1',
                    author: 'Bob',
                    content: 'Mong chờ thêm bài về Deep RL.',
                    createdAt: '2024-03-11T10:30:00Z'
                }
            ],
            addComment: (comment) => {
                const newComment: Comment = {
                    ...comment,
                    id: Date.now().toString(),
                    createdAt: new Date().toISOString(),
                };
                set((state) => ({ comments: [...state.comments, newComment] }));
            },
            getCommentsByPostId: (postId) => {
                return get().comments
                    .filter((c) => c.postId === postId)
                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            },
        }),
        {
            name: 'rl-blog-comments',
        }
    )
);
