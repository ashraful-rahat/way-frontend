export interface Blog {
  _id: string;
  title: string;
  shortDescription: string;
  content: string;
  author: string;
  image: string;
  tags: string[];
  category: string;
  isPublished: boolean;
  publishedAt?: Date;
  metaTitle?: string;
  metaDescription?: string;
  createdAt: Date;
  updatedAt: Date;
  readTime?: number;
  views?: number;
}

export interface BlogApiResponse {
  success: boolean;
  data: Blog | Blog[];
  message?: string;
}