export interface Article {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishDate: string;
  category: string;
  tags: string[];
  readTime: number;
  image: string;
  likes: number;
  comments: Comment[];
  featured?: boolean;
  views: number;
  status: 'published' | 'draft' | 'archived';
}

export interface Comment {
  id: number;
  author: string;
  content: string;
  date: string;
  likes: number;
  replies?: Comment[];
}

export interface User {
  id: number;
  username: string;
  email: string;
  name: string;
  role: 'admin' | 'editor' | 'author' | 'subscriber';
  avatar: string;
  bio: string;
  joinDate: string;
  articlesCount: number;
  followersCount: number;
  followingCount: number;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  color: string;
  articleCount: number;
}

export interface SearchFilters {
  category?: string;
  tags?: string[];
  author?: string;
  dateRange?: {
    start: string;
    end: string;
  };
  sortBy?: 'date' | 'popularity' | 'readTime';
  sortOrder?: 'asc' | 'desc';
}

export interface Newsletter {
  email: string;
  subscribed: boolean;
  subscribedDate: string;
}