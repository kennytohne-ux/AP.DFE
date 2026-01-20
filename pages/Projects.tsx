
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Target, MapPin, Clock, CheckCircle, FileText, Trash2, Edit2, Search, Filter, Sparkles, Circle, CheckCircle2 } from 'lucide-react';
import { useData } from '../context/MockDataContext';

export const Projects = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { projects, currentUser, deleteProject } = useData();
  const isStaff = !!currentUser;

  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.field.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id: string, title: string) => {
    if (!isStaff) return;
    if (confirm(`Operational Purge: Permanently delete project record "${title}"?`)) {
      deleteProject(id);
    }
  };

  return (
    <div className="animate-in fade-in duration-700 bg-slate-50 min-h-screen">
      <section className="bg-slate-900 py-32 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/20 backdrop-blur-md border border-blue-500/30 rounded-full text-[10px] font-black uppercase tracking-[0.25em] mb-10">
            <Target size={12} className="text-blue-400" /> Operational Publications
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-none uppercase">Ongoing Projects</h1>
          <p className="text-xl text-slate-400 font-light max-w-3xl mx-auto leading-relaxed opacity-80">
            Real-time tracking of regional missions. Strategic goals and completed milestones.
          </p>
        </div>
      </section>

      <section className="sticky top-[68px] z-40 bg-white border-b border-slate-200 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-6">
           <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
             <Filter size={14} /> Mission Records: {filteredProjects.length}
           </div>
           <div className="relative w-full md:w-96">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <input 
                type="text" 
                placeholder="Search projects..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-[1.5rem] text-sm font-bold outline-none focus:ring-4 focus:ring-blue-500/5 focus:bg-white transition-all"
              />
           </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-24 space-y-20">
        {filteredProjects.map((project) => (
          <div key={project.id} className="bg-white rounded-[4rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-slate-100 group relative">
            
            {isStaff && (
              <div className="absolute top-10 right-10 z-20 flex gap-3">
                 <Link to={`/dashboard/project/${project.id}`} className="p-4 bg-white text-blue-600 rounded-2xl shadow-xl border border-slate-100 hover:bg-blue-600 hover:text-white transition-all scale-100 active:scale-90">
                    <Edit2 size={18} />
                 </Link>
                 <button onClick={() => handleDelete(project.id, project.title)} className="p-4 bg-white text-red-600 hover:bg-red-600 hover:text-white rounded-2xl shadow-xl border border-slate-100 transition-all scale-100 active:scale-90">
                    <Trash2 size={18} />
                 </button>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-8 p-12 md:p-20 space-y-12">
                <div className="flex flex-wrap items-center gap-6">
                  <div className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm ${project.status === 'Completed' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700 animate-pulse'}`}>
                    {project.status === 'Completed' ? <CheckCircle size={14} /> : <Clock size={14} />} {project.status}
                  </div>
                  <div className="flex items-center gap-2 text-slate-500 text-[10px] font-black uppercase tracking-widest bg-slate-50 px-5 py-2.5 rounded-full border border-slate-100">
                    <MapPin size={14} className="text-blue-500" /> {project.region}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
                   <div className="order-2 md:order-1">
                      <h3 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 group-hover:text-blue-600 transition-colors tracking-tighter leading-none uppercase">{project.title}</h3>
                      <p className="text-slate-500 leading-relaxed text-lg font-medium">{project.description}</p>
                   </div>
                   {project.image && (
                     <div className="order-1 md:order-2 rounded-[2.5rem] overflow-hidden shadow-xl aspect-video border border-slate-100">
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                     </div>
                   )}
                </div>

                <div className="space-y-6 pt-6 border-t border-slate-50">
                  <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Project Milestones & Goals</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.goals.map((goal) => (
                      <div key={goal.id} className="flex items-start gap-4 p-5 bg-slate-50 rounded-3xl border border-slate-100 hover:bg-white hover:shadow-md transition-all group/goal">
                         {goal.isCompleted ? (
                           <CheckCircle2 size={20} className="text-green-500 shrink-0 mt-0.5" />
                         ) : (
                           <Circle size={20} className="text-slate-200 shrink-0 mt-0.5 group-hover/goal:text-blue-200 transition-colors" />
                         )}
                         <span className={`text-xs font-black uppercase tracking-tight leading-tight ${goal.isCompleted ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
                           {goal.text}
                         </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 bg-slate-50 p-12 md:p-20 flex flex-col justify-center items-center text-center space-y-12 border-l border-slate-100">
                <div className="w-full">
                  <div className="flex justify-between items-end mb-6 px-2">
                    <div className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">Mission Completion</div>
                    <div className="text-5xl font-black text-blue-600">{project.progress}%</div>
                  </div>
                  <div className="h-5 w-full bg-white rounded-full overflow-hidden p-1.5 shadow-inner border border-slate-200">
                    <div style={{ width: `${project.progress}%` }} className={`h-full rounded-full transition-all duration-[1.5s] ease-out shadow-lg ${project.progress === 100 ? 'bg-green-500' : 'bg-blue-600'}`} />
                  </div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase mt-6 tracking-[0.1em]">
                    {project.goals.filter(g => g.isCompleted).length} of {project.goals.length} Strategic Goals Verified
                  </p>
                </div>

                <div className="w-full space-y-4">
                  <div className="flex justify-between text-[11px] font-black uppercase text-slate-500 px-2 tracking-widest">
                    <span>Direct Funding</span>
                    <span className="text-slate-900">${project.currentFunding.toLocaleString()}</span>
                  </div>
                  <div className="h-2.5 w-full bg-white rounded-full overflow-hidden border border-slate-100">
                    <div 
                      style={{ width: `${Math.min((project.currentFunding / (project.targetFunding || 1)) * 100, 100)}%` }} 
                      className="h-full bg-green-500 transition-all duration-1000" 
                    />
                  </div>
                </div>

                <Link to={`/project-report/${project.id}`} className="w-full py-6 bg-slate-900 text-white rounded-[1.5rem] font-black text-xs uppercase tracking-[0.25em] flex items-center justify-center gap-3 hover:bg-black transition-all shadow-2xl scale-100 active:scale-95">
                  <FileText size={18} /> Full Intel Report
                </Link>
              </div>
            </div>
          </div>
        ))}
        {filteredProjects.length === 0 && (
          <div className="py-60 text-center space-y-8">
             <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-200"><Search size={48} /></div>
             <p className="text-slate-400 font-black uppercase text-xs tracking-[0.3em] animate-pulse">No Mission Records Matching Query</p>
          </div>
        )}
      </div>
    </div>
  );
};
