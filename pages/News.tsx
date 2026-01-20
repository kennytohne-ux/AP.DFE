
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, Search, FileText, Trash2, Edit2, Sparkles } from 'lucide-react';
import { useData } from '../context/MockDataContext';

export const News = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { news, currentUser, deleteNews } = useData();
  const isStaff = !!currentUser;

  const filteredNews = news.filter(n => 
    n.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    n.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id: string, title: string) => {
    if (!isStaff) return;
    if (confirm(`Operational Purge: Permanently delete news record "${title}"?`)) {
      deleteNews(id);
    }
  };

  return (
    <div className="animate-in fade-in duration-700 bg-slate-50 min-h-screen">
      <section className="bg-slate-900 py-24 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 backdrop-blur-md border border-blue-500/30 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6">
            <Sparkles size={12} className="text-blue-400" /> Field Publications
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">Field News</h1>
          <p className="text-xl text-slate-400 font-light max-w-2xl mx-auto leading-relaxed">
            Direct operational updates and human stories from our regional coordinators.
          </p>
        </div>
      </section>

      <section className="sticky top-[68px] z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
           <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Archived Updates: {filteredNews.length}</div>
           <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input 
                type="text" 
                placeholder="Search field news..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-blue-500/20"
              />
           </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredNews.map((item) => (
            <article key={item.id} className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all group flex flex-col h-full border border-slate-100 relative">
              <div className="h-64 relative overflow-hidden">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute top-6 left-6 flex flex-col gap-2">
                  <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">{item.category}</span>
                </div>
                
                {/* Staff Control Bar */}
                {isStaff && (
                  <div className="absolute top-6 right-6 flex gap-2">
                    <Link to="/dashboard" className="p-3 bg-white text-blue-600 rounded-full shadow-xl hover:bg-blue-600 hover:text-white transition-all">
                       <Edit2 size={16} />
                    </Link>
                    <button 
                      onClick={() => handleDelete(item.id, item.title)}
                      className="p-3 bg-white text-red-600 hover:bg-red-600 hover:text-white rounded-full shadow-xl transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}
              </div>
              <div className="p-10 flex-grow flex flex-col">
                <div className="flex items-center gap-2 text-slate-400 text-xs font-bold mb-4 uppercase tracking-tighter">
                  <Calendar size={14} className="text-blue-500" /> {item.date}
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-blue-600 transition-colors leading-tight">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-grow font-medium">{item.excerpt}</p>
                <Link to={`/news/${item.id}`} className="flex items-center gap-3 text-slate-900 font-black text-xs uppercase tracking-widest hover:gap-5 transition-all group-hover:text-blue-600">
                  Read Full Story <ArrowRight size={18} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
