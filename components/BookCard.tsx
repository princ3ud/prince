
import React from 'react';
import { Book } from '../types';
import { Share2 } from 'lucide-react';

interface BookCardProps {
  book: Book;
  onSelect: (book: Book) => void;
}

export const BookCard: React.FC<BookCardProps> = ({ book, onSelect }) => {
  const copyLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    const mockLink = `https://stellar-archive.io/vault/${book.id}`;
    navigator.clipboard.writeText(mockLink);
    alert('Archive Link Copied to Neural Buffer');
  };

  return (
    <div 
      onClick={() => onSelect(book)}
      className="group relative bg-[#121212] border border-white/5 rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:border-indigo-500/50 hover:shadow-[0_0_40px_rgba(99,102,241,0.15)]"
    >
      <div className="aspect-[3/4] overflow-hidden relative">
        <img 
          src={book.coverUrl} 
          alt={book.title}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
          <button className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl transition-all shadow-lg transform translate-y-4 group-hover:translate-y-0 duration-300">
            Secure Volume
          </button>
        </div>
        <div className="absolute top-4 left-4 flex gap-2 z-10">
          {book.isCreatorOriginal && (
            <div className="bg-amber-500 text-black text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-tighter shadow-xl">
              Ownership Free
            </div>
          )}
        </div>
        <button 
          onClick={copyLink}
          className="absolute top-4 right-4 p-2.5 bg-black/40 backdrop-blur-md border border-white/10 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-indigo-600 hover:border-indigo-400 z-20"
          title="Copy Link"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[9px] font-black text-indigo-500 uppercase tracking-[0.2em]">{book.category}</span>
        </div>
        <h3 className="text-white font-serif text-xl leading-tight mb-1 group-hover:text-indigo-400 transition-colors line-clamp-1">{book.title}</h3>
        <p className="text-gray-500 text-xs mb-5 italic">Record by {book.author}</p>
        <div className="flex items-center justify-between border-t border-white/5 pt-5">
          <div className="flex flex-col">
            <span className="text-[8px] font-black text-gray-600 uppercase tracking-widest">Tribute</span>
            <span className="text-indigo-400 font-black text-2xl tracking-tighter">₦{book.price.toLocaleString()}</span>
          </div>
          <div className="flex items-center text-[10px] font-black text-amber-500 bg-amber-500/5 px-3 py-1.5 rounded-xl border border-amber-500/10">
            <span className="mr-1.5 text-xs">★</span>
            {book.rating}
          </div>
        </div>
      </div>
    </div>
  );
};
