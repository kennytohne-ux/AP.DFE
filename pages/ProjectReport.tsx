
import React, { useState, useMemo } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { 
  CheckCircle2, 
  AlertCircle, 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Heart, 
  X, 
  ShieldCheck, 
  ChevronRight,
  TrendingUp,
  Target,
  Circle
} from 'lucide-react';
import { useData } from '../context/MockDataContext';

export const ProjectReport = () => {
  const { projectId } = useParams();
  const { projects } = useData();
  const [showDonateModal, setShowDonateModal] = useState(false);
  const [donateStep, setDonateStep] = useState(1);

  const project = projects.find(p => p.id === projectId);

  const { completedGoals, activeGoals } = useMemo(() => {
    if (!project) return { completedGoals: [], activeGoals: [] };
    const completed = project.goals.filter(g => g.isCompleted);
    const active = project.goals.filter(g => !g.isCompleted);
    return { completedGoals: completed, activeGoals: active };
  }, [project]);

  if (!project) {
    return <Navigate to="/projects" />;
  }

  const handleDonateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDonateStep(2);
  };

  return (
    <div className="animate-in fade-in duration-700 bg-slate-50 min-h-screen pb-24">
      {/* Header Info Banner */}
      <section className="bg-slate-900 pt-32 pb-20 text-white relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Link to="/projects" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 text-sm font-bold uppercase tracking-widest">
            <ArrowLeft size={16} /> Back to Projects
          </Link>
          <div className="max-w-4xl">
             <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Project Report</span>
                <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full">
                  <MapPin size={12} /> {project.region}
                </div>
             </div>
             <h1 className="text-4xl md:text-6xl font-black mb-10 leading-tight uppercase tracking-tighter">{project.title}</h1>
             
             <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
               <div className="space-y-1">
                 <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Target</div>
                 <div className="text-xl font-bold flex items-center gap-2">
                   <Target size={18} className="text-blue-500" /> {project.beneficiaries}
                 </div>
               </div>
               <div className="space-y-1">
                 <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Timeline</div>
                 <div className="text-xl font-bold flex items-center gap-2">
                   <Calendar size={18} className="text-blue-500" /> {project.timeline}
                 </div>
               </div>
               <div className="space-y-1">
                 <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Status</div>
                 <div className="text-xl font-bold flex items-center gap-2 uppercase">
                   {project.status === 'Completed' ? (
                     <><CheckCircle2 size={18} className="text-green-500" /> Completed</>
                   ) : (
                     <><TrendingUp size={18} className="text-amber-500" /> Active</>
                   )}
                 </div>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* Main Report Details */}
      <div className="max-w-7xl mx-auto px-6 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-8 space-y-12">
            {/* Project Overview Section */}
            <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-slate-100">
               <h2 className="text-2xl font-black text-slate-900 mb-6 uppercase tracking-tight">Project Overview</h2>
               <p className="text-slate-600 leading-relaxed text-lg mb-10 font-medium">
                 {project.description}
               </p>
               
               <div className="space-y-4">
                 <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-black text-slate-900 uppercase tracking-widest">Operational Readiness</span>
                    <span className="text-2xl font-black text-blue-600">{project.progress}%</span>
                 </div>
                 <div className="h-4 bg-slate-100 rounded-full overflow-hidden p-1 shadow-inner">
                   <div 
                     style={{ width: `${project.progress}%` }} 
                     className="h-full bg-blue-600 rounded-full transition-all duration-1000 shadow-lg"
                   />
                 </div>
               </div>
            </div>

            {/* Strategic Goals - Completed */}
            <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-slate-100">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center">
                  <CheckCircle2 size={24} />
                </div>
                <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Completed Milestones</h2>
              </div>
              <div className="space-y-4">
                {completedGoals.length > 0 ? completedGoals.map((goal) => (
                  <div key={goal.id} className="flex gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-white transition-colors group">
                    <CheckCircle2 size={20} className="text-green-500 shrink-0 mt-0.5" />
                    <span className="text-slate-500 font-bold text-sm leading-relaxed uppercase tracking-tight line-through">{goal.text}</span>
                  </div>
                )) : (
                  <p className="text-slate-400 italic font-medium p-10 border-2 border-dashed border-slate-100 rounded-2xl text-center uppercase text-[10px] tracking-widest">Initial project phases are currently in progress.</p>
                )}
              </div>
            </div>

            {/* Strategic Goals - Active */}
            {project.status !== 'Completed' && (
              <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-slate-100">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center">
                    <AlertCircle size={24} />
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Active Mission Objectives</h2>
                </div>
                <div className="space-y-4">
                  {activeGoals.length > 0 ? activeGoals.map((goal) => (
                    <div key={goal.id} className="flex gap-4 p-5 bg-amber-50/20 rounded-2xl border border-amber-100 group">
                      <Circle size={20} className="text-amber-500 shrink-0 mt-0.5" />
                      <span className="text-slate-900 font-black text-sm leading-relaxed uppercase tracking-tight">{goal.text}</span>
                    </div>
                  )) : (
                    <p className="text-slate-400 italic font-medium p-10 border-2 border-dashed border-slate-100 rounded-2xl text-center uppercase text-[10px] tracking-widest">All current operational objectives have been achieved.</p>
                  )}
                </div>
              </div>
            )}
            
            <div className="p-8 bg-blue-50 rounded-[2.5rem] border border-blue-100 flex items-center gap-6">
               <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Heart size={32} />
               </div>
               <div>
                  <h4 className="font-black text-slate-900 uppercase tracking-tight">Impact Verification Node</h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-bold uppercase tracking-widest">This mission is verified by regional coordinators. 100% of contributions assigned here fund these active objectives.</p>
               </div>
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="lg:col-span-4 space-y-8">
            <div className="sticky top-32 space-y-8">
              
              {/* Support Call to Action */}
              <div className="bg-blue-600 text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                <div className="relative z-10">
                  <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">Support This Mission</h3>
                  <p className="text-blue-100 text-xs mb-8 leading-relaxed font-black uppercase tracking-widest">
                    Your contribution to this specific project directly funds the active objectives listed in this report.
                  </p>
                  <button 
                    onClick={() => setShowDonateModal(true)}
                    className="w-full py-5 bg-white text-blue-600 rounded-2xl font-black hover:bg-slate-50 transition-all flex items-center justify-center gap-3 active:scale-95 shadow-lg uppercase text-[10px] tracking-[0.2em]"
                  >
                    Direct Fund Mission <ChevronRight size={18} />
                  </button>
                  <div className="mt-8 flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-blue-200">
                     <ShieldCheck size={14} /> 100% Transparency Chain
                  </div>
                </div>
                {/* Decorative circle */}
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full transition-transform duration-1000 group-hover:scale-150"></div>
              </div>

              {/* Update Metadata */}
              <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
                 <div>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em] mb-3">Intelligence Frequency</p>
                    <p className="text-sm text-slate-900 font-black uppercase tracking-tight">Field updates are posted every 45 operational days.</p>
                 </div>
                 <div className="pt-8 border-t border-slate-100">
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em] mb-3">Last Log Entry</p>
                    <p className="text-sm text-slate-900 font-black uppercase tracking-tight">{project.lastUpdated || 'Dec 12, 2024'}</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Donation Modal Logic */}
      {showDonateModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setShowDonateModal(false)}></div>
          <div className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
            <button onClick={() => setShowDonateModal(false)} className="absolute top-6 right-6 p-2 text-slate-400 hover:bg-slate-50 rounded-full"><X size={20} /></button>
            {donateStep === 1 ? (
              <div className="p-8 md:p-12">
                <div className="text-center mb-10">
                  <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6"><Heart size={32} /></div>
                  <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Direct Funding</h3>
                  <p className="text-[10px] text-slate-500 mt-2 font-black uppercase tracking-widest">{project.title}</p>
                </div>
                <form className="space-y-6" onSubmit={handleDonateSubmit}>
                  <div className="grid grid-cols-2 gap-4">
                    <input required type="text" placeholder="First Name" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold uppercase text-xs" />
                    <input required type="text" placeholder="Last Name" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold uppercase text-xs" />
                  </div>
                  <input required type="email" placeholder="Email Address" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold uppercase text-xs" />
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-slate-400">$</span>
                    <input required type="number" defaultValue="50" className="w-full pl-8 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-black text-2xl" />
                  </div>
                  <button type="submit" className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-500/20 active:scale-95 transition-all">Proceed to Payment Gate</button>
                </form>
              </div>
            ) : (
              <div className="p-12 text-center">
                <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce"><CheckCircle2 size={40} /></div>
                <h3 className="text-3xl font-black text-slate-900 mb-4 uppercase tracking-tight">Request Sent</h3>
                <p className="text-slate-500 leading-relaxed mb-10 font-bold uppercase text-[10px] tracking-widest">Thank you for your support. A regional coordinator will contact you with specific payment instructions for this mission fund.</p>
                <button onClick={() => setShowDonateModal(false)} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black shadow-lg text-[10px] uppercase tracking-widest">Close Intelligence Report</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
