
import React, { useState } from 'react';
import { ImageIcon, Search, Trash2, Edit2, Sparkles, X, Maximize2 } from 'lucide-react';
import { useData } from '../context/MockDataContext';

export const Gallery = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const { gallery, currentUser, deleteImage } = useData();
  const isAdmin = currentUser?.role === 'admin';

  const filteredGallery = gallery.filter(g => 
    g.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    g.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id: string, title: string) => {
    if (!isAdmin) {
      alert("Access Denied: Admin authorization required to delete visual media assets.");
      return;
    }
    if (confirm(`Strategic Asset Deletion: Permanently purge image record "${title}"?`)) {
      deleteImage(id);
    }
  };

  return (
    <div className="animate-in fade-in duration-700 bg-slate-50 min-h-screen">
      <section className="bg-slate-900 py-24 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 backdrop-blur-md border border-blue-500/30 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6">
            <ImageIcon size={12} className="text-blue-400" /> Visual Archive
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">Visual Media</h1>
          <p className="text-xl text-slate-400 font-light max-w-2xl mx-auto leading-relaxed">
            Documenting our impact through the lens. Direct testimonies and field observations.
          </p>
        </div>
      </section>

      <section className="sticky top-[68px] z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
           <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Archived Media: {filteredGallery.length}</div>
           <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input 
                type="text" 
                placeholder="Search media by title..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-blue-500/20"
              />
           </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {filteredGallery.map((item) => (
            <div key={item.id} className="relative bg-white rounded-[2rem] overflow-hidden group shadow-sm hover:shadow-2xl transition-all border border-slate-100 break-inside-avoid">
               <img 
                 src={item.img} 
                 alt={item.title} 
                 className="w-full h-auto object-cover cursor-pointer hover:scale-105 transition-transform duration-700" 
                 onClick={() => setSelectedImg(item.img)}
               />
               <div className="p-8">
                  <h4 className="text-lg font-black text-slate-900 leading-tight mb-2">{item.title}</h4>
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{item.subtitle}</p>
               </div>
               
               <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                  <button onClick={() => setSelectedImg(item.img)} className="p-3 bg-white/90 backdrop-blur-md rounded-full text-blue-600 hover:bg-blue-600 hover:text-white shadow-xl transition-all">
                    <Maximize2 size={16} />
                  </button>
                  {currentUser && (
                    <button 
                      onClick={() => handleDelete(item.id, item.title)}
                      className={`p-3 rounded-full shadow-xl transition-all ${isAdmin ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
               </div>
            </div>
          ))}
        </div>
      </div>

      {selectedImg && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
           <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-xl" onClick={() => setSelectedImg(null)}></div>
           <div className="relative max-w-5xl w-full h-full flex items-center justify-center">
              <button onClick={() => setSelectedImg(null)} className="absolute top-10 right-10 p-4 bg-white/10 text-white rounded-full hover:bg-white/20 transition-all z-20">
                 <X size={32} />
              </button>
              <img src={selectedImg} className="max-w-full max-h-full object-contain rounded-3xl shadow-2xl animate-in zoom-in duration-300" />
           </div>
        </div>
      )}
    </div>
  );
};
