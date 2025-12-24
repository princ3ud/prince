
import { Category, Book } from './types';

export const INITIAL_BOOKS: Book[] = [
  {
    id: 'pc-1',
    title: 'The Silent Horizon',
    author: 'Princewill Cosmas',
    price: 5000,
    description: 'An exclusive masterpiece from the private collection exploring the deep silence of the cosmos and the echoes of human thought. A journey through the void where only wisdom remains.',
    coverUrl: 'https://images.unsplash.com/photo-1464802686167-b939a6910659?q=80&w=400&auto=format&fit=crop',
    category: Category.OWNERSHIP_FREE,
    rating: 5.0,
    isCreatorOriginal: true,
    pages: 420,
    publishedYear: 2024
  },
  {
    id: 'pc-0',
    title: 'The Architect of Dreams',
    author: 'Princewill Cosmas',
    price: 5000,
    description: 'A surrealist exploration of the subconscious mind. This volume contains blueprints for navigating the astral planes and constructing internal sanctuaries.',
    coverUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400&auto=format&fit=crop',
    category: Category.OWNERSHIP_FREE,
    rating: 5.0,
    isCreatorOriginal: true,
    pages: 380,
    publishedYear: 2025
  },
  {
    id: 'af-1',
    title: 'Ancestral Shadows',
    author: 'Princewill Cosmas',
    price: 5000,
    description: 'A deep dive into native African spirituality and the folklore that shaped empires. Ownership-free for elite collectors who value the weight of heritage.',
    coverUrl: 'https://images.unsplash.com/photo-1523805081326-ed96227b7911?q=80&w=400&auto=format&fit=crop',
    category: Category.AFRICAN_HERITAGE,
    rating: 4.9,
    isCreatorOriginal: true,
    pages: 310,
    publishedYear: 2024
  },
  {
    id: 'sc-1',
    title: 'Quantum Resonance',
    author: 'Princewill Cosmas',
    price: 5000,
    description: 'A technical yet poetic exploration of modern science and the laws of the universe. Part of the private collection, bridging physics and philosophy.',
    coverUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=400&auto=format&fit=crop',
    category: Category.SCIENCE,
    rating: 4.9,
    isCreatorOriginal: true,
    pages: 285,
    publishedYear: 2024
  },
  {
    id: 'glob-1',
    title: 'The Alchemist Path',
    author: 'Elena Vance',
    price: 1000,
    description: 'A global bestseller following a young traveler through the deserts of ancient Egypt searching for the true source of wealth.',
    coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400&auto=format&fit=crop',
    category: Category.FICTION,
    rating: 4.5,
    isCreatorOriginal: false,
    pages: 280,
    publishedYear: 2023
  },
  {
    id: 'glob-2',
    title: 'Beyond the Void',
    author: 'Marcus Aurelius (Modern Edition)',
    price: 1000,
    description: 'Applying ancient philosophical principles to the vast emptiness of the modern digital age. A guide for the modern stoic.',
    coverUrl: 'https://images.unsplash.com/photo-1543004218-ee141104975a?q=80&w=400&auto=format&fit=crop',
    category: Category.PHILOSOPHY,
    rating: 4.7,
    isCreatorOriginal: false,
    pages: 210,
    publishedYear: 2022
  }
];
