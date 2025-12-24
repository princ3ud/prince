
export enum Category {
  FICTION = 'Fiction',
  SCIFI = 'Sci-Fi',
  FANTASY = 'Fantasy',
  BIOGRAPHY = 'Biography',
  PHILOSOPHY = 'Philosophy',
  OWNERSHIP_FREE = 'Ownership Free',
  FOLKLORE = 'Folklore',
  SCIENCE = 'Science',
  AFRICAN_HERITAGE = 'African Heritage'
}

export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  description: string;
  coverUrl: string;
  category: Category;
  rating: number;
  isCreatorOriginal: boolean;
  pages: number;
  publishedYear: number;
}

export interface CartItem extends Book {
  quantity: number;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
