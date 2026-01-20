
import React, { useMemo } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
// Added ChevronRight to the import list below to resolve "Cannot find name 'ChevronRight'" errors.
import { Calendar, ArrowLeft, Share2, Facebook, Instagram, Mail, Sparkles, MessageCircle, Clock, User, Bookmark, ChevronRight } from 'lucide-react';
import { useData } from '../context/MockDataContext';

export const NewsDetail = () => {
  const { id } = useParams();
  const { news } = useData();

  const article = useMemo(() => news.find(n => n.id === id), [news, id]);

  if (!article) return <Navigate to="/news" />;

  // Mock content generation if fullContent is missing
  const content = article.fullContent || `
    <p class="text-xl font-medium text-slate-700 leading-relaxed mb-8">
      The situation on the ground continues to evolve as our regional teams scale their response to the ongoing humanitarian needs. ${article.excerpt}
    </p>
    <h2 class="text-3xl font-black text-slate-900 mt-12 mb-6 uppercase tracking-tight">Mission Impact Analysis</h2>
    <p class="text-slate-600 leading-relaxed mb-6">
      Our regional coordinators have reported a significant increase in community engagement over the last quarter. By prioritizing survivor-led initiatives, we have seen a direct correlation between community trust and program efficacy. In fragile environments such as the Central African Republic and the Democratic Republic of Congo, this trust is the bedrock of all sustainable operations.
    </p>
    <div class="bg-blue-50 border-l-8 border-blue-600 p-12 rounded-3xl my-12">
      <p class="text-2xl italic font-black text-blue-900 leading-relaxed">
        "We are witnessing a paradigm shift in how humanitarian aid is delivered. When survivors lead the way, the path to healing becomes much clearer for the entire community."
      </p>
      <div class="mt-6 flex items-center gap-4">
        <div class="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center text-white font-black">A</div>
        <div>
          <p class="font-black text-slate-900 text-sm uppercase">Amina N.</p>
          <p class="text-xs text-slate-500 font-bold uppercase tracking-widest">Regional Programs Director</p>
        </div>
      </div>
    </div>
    <h3 class="text-2xl font-black text-slate-900 mt-12 mb-6 uppercase tracking-tight">Next Strategic Phases</h3>
    <p class="text-slate-600 leading-relaxed mb-6">
      Moving forward, APDFE plans to integrate more mobile health screenings with our existing educational modules. This holistic approach ensures that no child or woman is left behind due to health barriers that could be addressed through early intervention.
    </p>
    <ul class="space-y-4 my-8">
      <li class="flex items-start gap-4">
        <div class="w-2 h-2 bg-blue-600 rounded-full mt-2 shrink-0"></div>
        <p class="text-slate-600 font-bold uppercase tracking-tight text-xs">Deployment of 5 new mobile health units across regional hubs.</p>
      </li>
      <li class="flex items-start gap-4">
        <div class="w-2 h-2 bg-blue-600 rounded-full mt-2 shrink-0"></div>
        <p class="text-slate-600 font-bold uppercase tracking-tight text-xs">Expansion of the "Safe Spaces" initiative to three additional conflict zones.</p>
      </li>
      <li class="flex items-start gap-4">
        <div class="w-2 h-2 bg-blue-600 rounded-full mt-2 shrink-0"></div>
        <p class="text-slate-600 font-bold uppercase tracking-tight text-xs">Scaling the survivor-led vocational training program for young women.</p>
      </li>
    </ul>
    <p class="text-slate-600 leading-relaxed mb-6">
      We remain committed to our vision of a Central Africa where dignity and safety are guaranteed for all. Thank you for standing with us in this mission.
    </p>
  `;

  return (
    <div className="animate-in fade-in duration-700 bg-white min-h-screen pb-32">
      {/* Article Header */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-end overflow-hidden">
        <img 
          src={article.image} 
          alt={article.title} 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
        
        <div className="max-w-4xl mx-auto px-6 relative z-10 w-full pb-20">
          <Link to="/news" className="inline-flex items-center gap-3 text-white/70 hover:text-white transition-all mb-12 text-[10px] font-black uppercase tracking-[0.3em] group">
            <div className="p-2 rounded-full border border-white/20 group-hover:border-white/40 transition-all"><ArrowLeft size={14} /></div>
            Back to Field Publications
          </Link>
          <div className="flex flex-wrap items-center gap-4 mb-8">
             <span className="bg-blue-600 text-white px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-2xl">{article.category}</span>
             <div className="flex items-center gap-2 text-white/60 text-[10px] font-black uppercase tracking-widest">
                <Calendar size={14} className="text-blue-400" /> {article.date}
             </div>
             <div className="flex items-center gap-2 text-white/60 text-[10px] font-black uppercase tracking-widest">
                <Clock size={14} className="text-green-400" /> 6 Min Read
             </div>
          </div>
          <h1 className="text-4xl md:text-7xl font-black text-white leading-none tracking-tighter uppercase mb-6 animate-in slide-in-from-bottom-8 duration-700">
            {article.title}
          </h1>
        </div>
      </section>

      {/* Article Content */}
      <section className="max-w-7xl mx-auto px-6 mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          
          {/* Author/Sidebar Info */}
          <aside className="lg:col-span-4 space-y-12">
            <div className="sticky top-32 space-y-12">
              <div className="p-10 bg-slate-50 rounded-[3rem] border border-slate-100 flex flex-col items-center text-center">
                 <div className="w-20 h-20 bg-slate-900 text-white rounded-[2rem] flex items-center justify-center font-black text-3xl mb-6 shadow-2xl">
                    AP
                 </div>
                 <h4 className="text-xl font-black text-slate-900 uppercase tracking-tight">Field Coordination</h4>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2 mb-8">Official News Dispatch</p>
                 <div className="w-full pt-8 border-t border-slate-200 grid grid-cols-3 gap-4">
                   <button className="flex flex-col items-center gap-2 group">
                      <div className="p-3 bg-white rounded-xl shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all"><Facebook size={16} /></div>
                      <span className="text-[8px] font-black uppercase text-slate-400">Share</span>
                   </button>
                   <button className="flex flex-col items-center gap-2 group">
                      <div className="p-3 bg-white rounded-xl shadow-sm group-hover:bg-pink-600 group-hover:text-white transition-all"><Instagram size={16} /></div>
                      <span className="text-[8px] font-black uppercase text-slate-400">Insta</span>
                   </button>
                   <button className="flex flex-col items-center gap-2 group">
                      <div className="p-3 bg-white rounded-xl shadow-sm group-hover:bg-blue-400 group-hover:text-white transition-all"><MessageCircle size={16} /></div>
                      <span className="text-[8px] font-black uppercase text-slate-400">Tweet</span>
                   </button>
                 </div>
              </div>

              <div className="bg-slate-900 text-white p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden group">
                <div className="relative z-10">
                  <h4 className="text-xl font-black mb-6 flex items-center gap-3 uppercase tracking-tight">
                    <Sparkles className="text-blue-400" /> Support Mission
                  </h4>
                  <p className="text-slate-400 text-sm leading-relaxed mb-10 font-medium">
                    "Your contribution helps us keep these operations running across Central Africa. Empower a survivor today."
                  </p>
                  <Link to="/donate" className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl flex items-center justify-center gap-2 transition-all active:scale-95">
                    Make a Difference <ChevronRight size={14} />
                  </Link>
                </div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
              </div>
            </div>
          </aside>

          {/* Main Content Body */}
          <article className="lg:col-span-8 animate-in fade-in slide-in-from-right-8 duration-1000">
             <div 
               className="prose prose-slate prose-xl max-w-none article-body" 
               dangerouslySetInnerHTML={{ __html: content }} 
             />
             
             <div className="mt-20 pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex items-center gap-4">
                   <div className="flex -space-x-3">
                      {[1,2,3].map(i => (
                        <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden shadow-sm">
                           <img src={`https://ui-avatars.com/api/?name=Staff+${i}&background=random`} alt="Staff" />
                        </div>
                      ))}
                   </div>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Reviewed by regional ops team</p>
                </div>
                <div className="flex gap-4">
                  <button className="px-6 py-3 bg-slate-50 text-slate-900 rounded-xl font-black text-[10px] uppercase tracking-widest border border-slate-100 hover:bg-slate-100 transition-all flex items-center gap-2">
                    <Bookmark size={14} /> Save for later
                  </button>
                  <button className="px-6 py-3 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg hover:bg-blue-600 transition-all flex items-center gap-2">
                    <Share2 size={14} /> Copy link
                  </button>
                </div>
             </div>
          </article>
        </div>
      </section>

      {/* Related News Section */}
      <section className="max-w-7xl mx-auto px-6 mt-32">
         <div className="flex items-end justify-between mb-16 border-l-8 border-blue-600 pl-8">
            <div>
              <p className="text-blue-600 font-black uppercase tracking-[0.3em] text-[10px] mb-2">Operational Archive</p>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter">More Field Stories</h2>
            </div>
            <Link to="/news" className="text-sm font-black text-slate-900 hover:text-blue-600 transition-colors uppercase tracking-widest border-b-2 border-slate-900 hover:border-blue-600 pb-1 flex items-center gap-2">
              View All <ChevronRight size={14} />
            </Link>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {news.filter(n => n.id !== id).slice(0, 3).map(item => (
              <Link to={`/news/${item.id}`} key={item.id} className="group">
                <div className="rounded-[2.5rem] overflow-hidden aspect-[4/3] mb-8 relative border border-slate-100 shadow-sm transition-all group-hover:shadow-2xl">
                   <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                   <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-60"></div>
                </div>
                <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">
                   <span className="text-blue-600">{item.category}</span>
                   <div className="w-1 h-1 bg-slate-200 rounded-full"></div>
                   <span>{item.date}</span>
                </div>
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight leading-tight group-hover:text-blue-600 transition-colors">{item.title}</h3>
              </Link>
            ))}
         </div>
      </section>
    </div>
  );
};
