
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, Image as ImageIcon, Briefcase, ChevronRight, Clock, MapPin, Users, FileText, CheckCircle, Search, Filter, Sparkles } from 'lucide-react';
import { useData } from '../context/MockDataContext';

export const Publication = () => {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { news, projects, gallery } = useData();

  const filteredNews = news.filter(n => 
    (filter === 'all' || filter === 'news') && 
    (n.title.toLowerCase().includes(searchQuery.toLowerCase()) || n.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredProjects = projects.filter(p => 
    (filter === 'all' || filter === 'projects') && 
    (p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.region.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredGallery = gallery.filter(g => 
    (filter === 'all' || filter === 'images') && 
    (g.title.toLowerCase().includes(searchQuery.toLowerCase()) || g.subtitle.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="animate-in fade-in duration-700 bg-slate-50 min-h-screen">
      {/* Header Section */}
      <section className="bg-slate-900 py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1512314889357-e157c22f938d?q=80&w=2071&auto=format&fit=crop" alt="Background" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 backdrop-blur-md border border-blue-500/30 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6">
            <Sparkles size={12} className="text-blue-400" /> Official APDFE Press & Reports
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">Intelligence Hub</h1>
          <p className="text-xl text-slate-400 font-light max-w-2xl leading-relaxed">
            Direct field insights, operational reports, and community stories from across Central Africa.
          </p>
        </div>
      </section>

      {/* Filter & Search Bar - Fixed offset to handle sticky navbar height (approx 68px when scrolled) */}
      <section className="sticky top-[68px] z-40 bg-white border-b border-slate-200 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 py-4">
            <div className="flex items-center gap-6 overflow-x-auto no-scrollbar pb-2 md:pb-0">
              {[
                { id: 'all', label: 'All Content' },
                { id: 'news', label: 'Field News' },
                { id: 'projects', label: 'Regional Projects' },
                { id: 'images', label: 'Visual Media' }
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  className={`text-xs font-black uppercase tracking-widest transition-all pb-2 -mb-2 border-b-2 whitespace-nowrap ${
                    filter === f.id ? 'text-blue-600 border-blue-600' : 'text-slate-400 border-transparent hover:text-slate-600'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search publications..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-64 pl-12 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-20 space-y-32">
        {/* News Section */}
        {filteredNews.length > 0 && (
          <section id="news" className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="flex items-end justify-between mb-12 border-l-4 border-blue-600 pl-6">
              <div>
                <span className="text-xs font-black text-blue-600 uppercase tracking-widest block mb-2">Public Record</span>
                <h2 className="text-4xl font-black text-slate-900 tracking-tight">Field News & Updates</h2>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredNews.map((item) => (
                <article key={item.id} className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all group flex flex-col h-full border border-slate-100 relative">
                  <div className="h-64 relative overflow-hidden">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                    <div className="absolute top-6 left-6">
                      <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">{item.category}</span>
                    </div>
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
          </section>
        )}

        {/* Projects Section */}
        {filteredProjects.length > 0 && (
          <section id="projects" className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="flex items-end justify-between mb-12 border-l-4 border-amber-500 pl-6">
              <div>
                <span className="text-xs font-black text-amber-500 uppercase tracking-widest block mb-2">Operational Oversight</span>
                <h2 className="text-4xl font-black text-slate-900 tracking-tight">Ongoing Regional Projects</h2>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-10">
              {filteredProjects.map((project) => (
                <div key={project.id} className="bg-white rounded-[3rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-slate-100 group">
                  <div className="grid grid-cols-1 lg:grid-cols-12">
                    <div className="lg:col-span-8 p-10 md:p-14 space-y-8">
                      <div className="flex flex-wrap items-center gap-4">
                        <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${project.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700 animate-pulse'}`}>
                          {project.status === 'Completed' ? <CheckCircle size={14} /> : <Clock size={14} />} {project.status}
                        </div>
                        <div className="flex items-center gap-2 text-slate-500 text-[10px] font-black uppercase tracking-widest bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
                          <MapPin size={14} className="text-blue-500" /> {project.region}
                        </div>
                      </div>
                      <h3 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 group-hover:text-blue-600 transition-colors tracking-tight leading-none">{project.title}</h3>
                      <p className="text-slate-500 leading-relaxed text-lg max-w-3xl font-medium">{project.description}</p>
                    </div>
                    <div className="lg:col-span-4 bg-slate-50 p-10 md:p-14 flex flex-col justify-center items-center text-center space-y-10 border-l border-slate-100">
                      <div className="w-full">
                        <div className="flex justify-between items-end mb-4">
                          <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Readiness</div>
                          <div className="text-4xl font-black text-blue-600">{project.progress}%</div>
                        </div>
                        <div className="h-4 w-full bg-slate-200 rounded-full overflow-hidden p-1 shadow-inner">
                          <div style={{ width: `${project.progress}%` }} className={`h-full rounded-full transition-all duration-1000 ease-out shadow-lg ${project.progress === 100 ? 'bg-green-500' : 'bg-blue-600'}`} />
                        </div>
                      </div>
                      <Link to={`/project-report/${project.id}`} className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-black transition-all shadow-xl">
                        <FileText size={18} /> Access Full Report
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
