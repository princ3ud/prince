
import React, { useState, useMemo } from 'react';
import { Search, ShoppingCart, Archive, Zap, X, ChevronRight, Filter, Plus, ShieldCheck, Ticket, ExternalLink, Sparkles, BookOpen, Share2 } from 'lucide-react';
import { INITIAL_BOOKS } from './constants';
import { Book, Category, CartItem } from './types';
import { BookCard } from './components/BookCard';
import { LibrarianChat } from './components/LibrarianChat';

const App: React.FC = () => {
  const [books, setBooks] = useState<Book[]>(INITIAL_BOOKS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [purchaseComplete, setPurchaseComplete] = useState<{ code: string } | null>(null);

  const [newBook, setNewBook] = useState<Partial<Book>>({
    title: '',
    author: 'Princewill Cosmas',
    category: Category.OWNERSHIP_FREE,
    description: '',
    coverUrl: '',
    isCreatorOriginal: true,
    rating: 5.0,
    pages: 300,
    publishedYear: 2024
  });

  const filteredBooks = useMemo(() => {
    return books.filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            book.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory, books]);

  const cartTotal = useMemo(() => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }, [cart]);

  const addToCart = (book: Book) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === book.id);
      if (existing) {
        return prev.map(item => item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...book, quantity: 1 }];
    });
    setSelectedBook(null);
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const copyArchiveLink = () => {
    navigator.clipboard.writeText('https://stellar-archive.io/princewill-cosmas');
    alert('Main Archive Link Copied to Neural Buffer');
  };

  const handleCheckout = () => {
    window.open('https://paylink.monnify.com/Stellararchive', '_blank');
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = 'STELLAR-';
    for (let i = 0; i < 8; i++) {
      if (i === 4) code += '-';
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPurchaseComplete({ code });
    setCart([]);
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    const price = newBook.isCreatorOriginal ? 5000 : 1000;
    const bookToAdd: Book = {
      ...newBook,
      id: `custom-${Date.now()}`,
      price,
      rating: 5.0
    } as Book;
    setBooks(prev => [bookToAdd, ...prev]);
    setIsUploadOpen(false);
    setNewBook({
      title: '',
      author: 'Princewill Cosmas',
      category: Category.OWNERSHIP_FREE,
      description: '',
      coverUrl: '',
      isCreatorOriginal: true,
      rating: 5.0,
      pages: 300,
      publishedYear: 2024
    });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-gray-300 selection:bg-indigo-500/30 overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent"></div>
        <div className="stars-container absolute inset-0"></div>
      </div>

      <nav className="sticky top-0 z-50 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 px-6 py-5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => setSelectedCategory('All')}>
            <div className="w-11 h-11 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-900/40 group-hover:rotate-12 transition-all duration-500">
              <Sparkles className="text-white w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black text-white tracking-tighter uppercase leading-none">STELLAR</span>
              <span className="text-[10px] font-black text-indigo-500 tracking-[0.3em] uppercase">Archive</span>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-10 text-[10px] font-black uppercase tracking-[0.25em]">
            <button onClick={() => setSelectedCategory('All')} className="hover:text-indigo-400 transition-colors">The Vault</button>
            <button onClick={() => setSelectedCategory(Category.OWNERSHIP_FREE)} className="hover:text-indigo-400 transition-colors">Private Collection</button>
            <button onClick={() => setSelectedCategory(Category.AFRICAN_HERITAGE)} className="hover:text-indigo-400 transition-colors">Heritage</button>
            <button onClick={() => setIsUploadOpen(true)} className="flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 px-4 py-2 rounded-full hover:bg-indigo-500/20 transition-all text-indigo-300">
               <Plus className="w-3.5 h-3.5" />
               New Volume
            </button>
          </div>

          <div className="flex items-center gap-5">
            <div className="relative group hidden sm:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-indigo-500 transition-colors" />
              <input 
                type="text" 
                placeholder="Search the archive..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-2xl pl-11 pr-5 py-3 text-sm focus:outline-none focus:border-indigo-500/50 w-72 transition-all backdrop-blur-md"
              />
            </div>
            <button onClick={() => setIsCartOpen(true)} className="relative p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all group">
              <ShoppingCart className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-indigo-500 text-white text-[10px] font-black w-5 h-5 rounded-lg flex items-center justify-center animate-pulse border-2 border-[#050505]">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-10 relative">
        <section className="relative mb-24 rounded-[4.5rem] overflow-hidden bg-gradient-to-br from-indigo-950/40 via-black to-black border border-white/10 p-10 md:p-28 group">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-indigo-500/40 shadow-[0_0_25px_rgba(99,102,241,1)] animate-[scan_10s_ease-in-out_infinite] pointer-events-none z-20"></div>
          
          <div className="max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-3 bg-indigo-600/10 text-indigo-300 px-5 py-2 rounded-full text-[9px] font-black tracking-[0.2em] mb-12 border border-indigo-500/20 uppercase">
              <Zap className="w-3.5 h-3.5 text-indigo-400" />
              Direct Ownership Protocol Active
            </div>
            <h1 className="text-7xl md:text-[10rem] font-serif text-white mb-12 leading-[0.85] tracking-tighter">
              The <span className="italic text-indigo-400 underline decoration-indigo-500/20">Infinity</span> <br />Library.
            </h1>
            <p className="text-gray-400 text-2xl mb-16 leading-relaxed max-w-2xl font-light">
              Acquire permanent <span className="text-white font-bold">Ownership Free</span> records for ₦5,000 or explore the global collection for ₦1,000.
            </p>
            <div className="flex flex-wrap gap-8">
              <button onClick={() => setSelectedCategory(Category.OWNERSHIP_FREE)} className="bg-indigo-600 hover:bg-indigo-500 text-white px-14 py-6 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] transition-all shadow-[0_15px_40px_rgba(79,70,229,0.3)] hover:scale-105 active:scale-95">
                The Private Vault
              </button>
              <button onClick={() => window.scrollTo({ top: 1200, behavior: 'smooth'})} className="bg-white/5 hover:bg-white/10 text-white px-14 py-6 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] border border-white/10 transition-all backdrop-blur-sm">
                Browse Archives
              </button>
            </div>
          </div>
          <div className="absolute right-0 top-0 h-full w-2/3 pointer-events-none hidden lg:block overflow-hidden opacity-40">
             <div className="absolute inset-0 bg-gradient-to-l from-indigo-500/20 via-transparent to-transparent"></div>
             <img src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1200" className="w-full h-full object-cover mix-blend-screen scale-110 group-hover:scale-105 transition-transform duration-[20s]" />
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          <div className="lg:col-span-8">
            <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
              <div className="flex flex-col">
                <h2 className="text-5xl font-serif text-white mb-2">Vault Sectors</h2>
                <p className="text-gray-600 text-[10px] font-black uppercase tracking-[0.4em]">Available Records: {filteredBooks.length}</p>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide w-full md:w-auto">
                {(['All', ...Object.values(Category)] as const).map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-7 py-3.5 rounded-2xl text-[9px] font-black uppercase tracking-[0.25em] whitespace-nowrap transition-all border ${
                      selectedCategory === cat 
                        ? 'bg-indigo-600 text-white border-indigo-500 shadow-2xl shadow-indigo-900/40' 
                        : 'bg-white/5 text-gray-500 hover:text-white border-white/5'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-12">
              {filteredBooks.map(book => (
                <BookCard key={book.id} book={book} onSelect={setSelectedBook} />
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 space-y-16">
             <section className="sticky top-32">
               <div className="flex items-center justify-between mb-8">
                 <div className="flex flex-col">
                   <h3 className="text-white font-serif text-3xl">Oracle Link</h3>
                   <span className="text-indigo-500 text-[9px] font-black uppercase tracking-[0.4em]">AI Consultation</span>
                 </div>
                 <div className="w-12 h-12 bg-indigo-600/10 rounded-2xl flex items-center justify-center border border-indigo-500/20">
                   <BookOpen className="w-6 h-6 text-indigo-400" />
                 </div>
               </div>
               <LibrarianChat currentBooks={books} />
               
               <div className="mt-10 p-10 bg-white/5 rounded-[3rem] border border-white/10 backdrop-blur-md relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-6 text-indigo-500/20 group-hover:text-indigo-500/40 transition-colors">
                    <ShieldCheck className="w-20 h-20" />
                  </div>
                  <h4 className="text-white font-black text-[10px] uppercase tracking-[0.3em] mb-8 relative z-10">Archive Metadata</h4>
                  <div className="space-y-6 relative z-10">
                    <div className="flex justify-between items-center pb-4 border-b border-white/5">
                      <span className="text-gray-500 text-xs uppercase tracking-widest font-bold">Uptime</span>
                      <span className="text-emerald-500 font-mono font-black">99.99%</span>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b border-white/5">
                      <span className="text-gray-500 text-xs uppercase tracking-widest font-bold">Encrypted</span>
                      <span className="text-indigo-400 font-mono font-black">SHA-512</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 text-xs uppercase tracking-widest font-bold">Master Code</span>
                      <span className="text-amber-500 font-mono font-black">PBUY2</span>
                    </div>
                  </div>
               </div>
             </section>
          </div>
        </div>
      </main>

      {/* Book Detail Modal */}
      {selectedBook && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/98 backdrop-blur-2xl" onClick={() => setSelectedBook(null)}></div>
          <div className="relative bg-[#0d0d0d] border border-white/10 w-full max-w-6xl rounded-[4rem] overflow-hidden shadow-[0_0_120px_rgba(79,70,229,0.3)] flex flex-col md:flex-row animate-in fade-in zoom-in duration-500">
            <div className="w-full md:w-[48%] aspect-[3/4] md:aspect-auto relative group overflow-hidden">
              <img src={selectedBook.coverUrl} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              {selectedBook.isCreatorOriginal && (
                <div className="absolute top-12 left-12 bg-amber-500 text-black px-8 py-3 rounded-full font-black text-[10px] uppercase shadow-2xl tracking-[0.2em] animate-pulse">
                   Private Custody
                </div>
              )}
            </div>
            <div className="flex-1 p-16 md:p-24 flex flex-col bg-gradient-to-br from-[#0d0d0d] to-black">
              <button onClick={() => setSelectedBook(null)} className="absolute top-12 right-12 p-5 hover:bg-white/10 rounded-full text-gray-500 transition-all active:scale-90">
                <X className="w-8 h-8" />
              </button>
              <div className="flex-1">
                <div className="flex items-center gap-6 text-indigo-400 text-[11px] font-black uppercase tracking-[0.5em] mb-10">
                   <div className="w-10 h-[2px] bg-indigo-500"></div>
                   {selectedBook.category}
                </div>
                <h2 className="text-7xl md:text-8xl font-serif text-white mb-8 leading-none tracking-tighter">{selectedBook.title}</h2>
                <p className="text-indigo-400/80 text-3xl mb-16 italic font-light tracking-tight">Preserved by {selectedBook.author}</p>
                <div className="grid grid-cols-3 gap-8 mb-16">
                  <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/5 text-center transition-all hover:bg-indigo-500/5 hover:border-indigo-500/20">
                    <div className="text-gray-600 text-[10px] font-black tracking-[0.3em] mb-3 uppercase">PAGES</div>
                    <div className="text-white font-black text-2xl">{selectedBook.pages}</div>
                  </div>
                  <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/5 text-center transition-all hover:bg-indigo-500/5 hover:border-indigo-500/20">
                    <div className="text-gray-600 text-[10px] font-black tracking-[0.3em] mb-3 uppercase">ERA</div>
                    <div className="text-white font-black text-2xl">{selectedBook.publishedYear}</div>
                  </div>
                  <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/5 text-center transition-all hover:bg-indigo-500/5 hover:border-indigo-500/20">
                    <div className="text-gray-600 text-[10px] font-black tracking-[0.3em] mb-3 uppercase">RANK</div>
                    <div className="text-white font-black text-2xl">★ {selectedBook.rating}</div>
                  </div>
                </div>
                <p className="text-gray-400 leading-relaxed mb-20 text-2xl font-light max-w-2xl">{selectedBook.description}</p>
              </div>
              <div className="flex items-center gap-12 pt-12 border-t border-white/5">
                <div className="flex flex-col">
                  <span className="text-[11px] font-black text-gray-600 tracking-[0.4em] uppercase mb-2">Aggregate Tribute</span>
                  <div className="text-6xl font-black text-white tracking-tighter">₦{selectedBook.price.toLocaleString()}</div>
                </div>
                <button onClick={() => addToCart(selectedBook)} className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-black py-8 rounded-[2.5rem] flex items-center justify-center gap-5 shadow-2xl shadow-indigo-900/50 text-xl transition-all active:scale-95 group">
                  <ShoppingCart className="w-8 h-8 group-hover:rotate-12 transition-transform" />
                  Acquire Full Rights
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart Sidebar */}
      <div className={`fixed inset-y-0 right-0 w-full max-w-xl bg-[#080808] border-l border-white/5 z-[150] shadow-[-20px_0_120px_rgba(0,0,0,1)] transition-transform duration-700 ease-in-out transform ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="h-full flex flex-col">
          <div className="p-12 border-b border-white/5 flex items-center justify-between bg-black/40 backdrop-blur-xl">
            <div className="flex flex-col">
              <h3 className="text-4xl font-serif text-white">Transfer Queue</h3>
              <span className="text-indigo-500 text-[9px] font-black uppercase tracking-[0.4em]">Ready for custody</span>
            </div>
            <button onClick={() => setIsCartOpen(false)} className="p-4 hover:bg-white/5 rounded-full text-gray-600 transition-all">
              <X className="w-7 h-7" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-12 space-y-12 scrollbar-hide">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-10 opacity-20">
                <Archive className="w-32 h-32" />
                <p className="text-[14px] font-black uppercase tracking-[0.5em]">The queue is empty</p>
              </div>
            ) : (
              cart.map(item => (
                <div key={item.id} className="flex gap-10 group animate-in slide-in-from-right duration-500">
                  <div className="w-28 h-40 flex-shrink-0 bg-white/5 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                    <img src={item.coverUrl} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <h4 className="text-white text-3xl font-serif truncate mb-3">{item.title}</h4>
                    <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em] mb-6">{item.isCreatorOriginal ? 'Private Custody Record' : 'Global Volume'}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-indigo-400 font-black text-3xl tracking-tighter">₦{(item.price * item.quantity).toLocaleString()}</span>
                      <button onClick={() => removeFromCart(item.id)} className="text-gray-700 hover:text-red-500 text-[10px] font-black uppercase tracking-widest transition-colors">Discard</button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          {cart.length > 0 && (
            <div className="p-12 bg-black/90 border-t border-white/5 space-y-10">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 text-[14px] font-black tracking-[0.4em] uppercase">Aggregate</span>
                <span className="text-6xl font-black text-white tracking-tighter">₦{cartTotal.toLocaleString()}</span>
              </div>
              <button 
                onClick={handleCheckout}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black py-9 rounded-[3rem] flex items-center justify-center gap-6 shadow-2xl shadow-indigo-900/40 transition-all group active:scale-[0.98] text-xl"
              >
                SECURE OWNERSHIP
                <ExternalLink className="w-8 h-8 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
              <div className="text-center opacity-40">
                <p className="text-[11px] text-indigo-500 uppercase font-black tracking-[0.5em]">Neural Encryption Key: PBUY2</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Upload Modal */}
      {isUploadOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-3xl" onClick={() => setIsUploadOpen(false)}></div>
          <div className="relative bg-[#0d0d0d] border border-white/10 w-full max-w-2xl rounded-[4rem] p-16 shadow-2xl animate-in zoom-in duration-300">
            <h2 className="text-5xl font-serif text-white mb-10 tracking-tighter">Archive Transmission</h2>
            <form onSubmit={handleUpload} className="space-y-8">
              <input required value={newBook.title} onChange={e => setNewBook({...newBook, title: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 focus:border-indigo-500 outline-none text-white text-xl transition-all" placeholder="Volume Title..." />
              <div className="grid grid-cols-2 gap-6">
                <input required value={newBook.author} onChange={e => setNewBook({...newBook, author: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-indigo-500 outline-none text-white" placeholder="Origin/Author..." />
                <select value={newBook.category} onChange={e => setNewBook({...newBook, category: e.target.value as Category})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-indigo-500 outline-none text-white appearance-none cursor-pointer">
                  {Object.values(Category).map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <input required value={newBook.coverUrl} onChange={e => setNewBook({...newBook, coverUrl: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-indigo-500 outline-none text-white" placeholder="Cover Image URL..." />
              <div className="flex items-center gap-5 p-6 bg-indigo-500/5 border border-indigo-500/10 rounded-[2rem] transition-all hover:bg-indigo-500/10">
                 <input type="checkbox" id="isOriginal" className="w-7 h-7 accent-indigo-500 rounded-lg cursor-pointer" checked={newBook.isCreatorOriginal} onChange={e => setNewBook({...newBook, isCreatorOriginal: e.target.checked})} />
                 <label htmlFor="isOriginal" className="text-sm font-black text-white uppercase tracking-widest cursor-pointer">Mark as Ownership Free (₦5,000)</label>
              </div>
              <div className="flex gap-6 pt-6">
                <button type="button" onClick={() => setIsUploadOpen(false)} className="flex-1 py-5 text-gray-600 font-black uppercase text-[10px] tracking-widest hover:text-white transition-colors">Abort</button>
                <button type="submit" className="flex-2 bg-indigo-600 hover:bg-indigo-500 text-white font-black py-5 rounded-[2rem] shadow-2xl shadow-indigo-900/40 uppercase tracking-widest text-xs transition-all active:scale-95">Transmit Volume</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {purchaseComplete && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
           <div className="absolute inset-0 bg-black/98 backdrop-blur-3xl" onClick={() => setPurchaseComplete(null)}></div>
           <div className="relative bg-white text-black w-full max-w-2xl rounded-[5rem] p-20 text-center shadow-2xl animate-in zoom-in duration-700">
              <div className="w-24 h-24 bg-indigo-600/10 rounded-[2.5rem] flex items-center justify-center mx-auto mb-12">
                <ShieldCheck className="w-12 h-12 text-indigo-600 animate-[bounce_2s_infinite]" />
              </div>
              <h2 className="text-6xl font-serif font-black mb-6 tracking-tighter">Transfer Verified</h2>
              <p className="text-gray-500 mb-14 leading-relaxed text-2xl font-light">Your permanent neural access key is active in the network.</p>
              <div className="bg-gray-50 p-12 rounded-[3.5rem] mb-14 border-2 border-dashed border-gray-200 group relative cursor-pointer overflow-hidden transition-all hover:border-indigo-200" onClick={() => {
                navigator.clipboard.writeText(purchaseComplete.code);
              }}>
                 <div className="text-[11px] font-black text-gray-300 uppercase tracking-[0.5em] mb-5">Neural Unlock Key</div>
                 <div className="text-5xl font-mono font-black text-indigo-600 tracking-tighter">{purchaseComplete.code}</div>
                 <div className="absolute inset-0 bg-indigo-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity uppercase font-black text-sm tracking-[0.3em]">Click to Copy Key</div>
              </div>
              <div className="space-y-6">
                <button onClick={() => setPurchaseComplete(null)} className="w-full bg-black text-white font-black py-7 rounded-[2.5rem] uppercase tracking-[0.3em] text-sm transition-all active:scale-95 shadow-xl hover:bg-gray-900">Return to Vault</button>
                <div className="flex items-center justify-center gap-3 text-[10px] font-black text-gray-400 uppercase tracking-[0.4em]">
                  <Ticket className="w-4 h-4 text-amber-500" />
                  Global Protocol Bypass: PBUY2
                </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default App;
