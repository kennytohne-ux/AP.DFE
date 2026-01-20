
import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { CheckCircle2, ArrowLeft, Heart, Sparkles } from 'lucide-react';
import { PROGRAMS_DATA } from '../constants';

export const ProgramDetail = () => {
  const { id } = useParams();
  const program = PROGRAMS_DATA.find(p => p.id === id);

  if (!program) return <Navigate to="/programs" />;

  return (
    <div className="animate-in fade-in duration-700 bg-white min-h-screen">
      <section className="bg-slate-900 py-32 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={program.image} alt={program.title} className="w-full h-full object-cover" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Link to="/programs" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-12 text-sm font-black uppercase tracking-widest">
            <ArrowLeft size={16} /> Back to Programs
          </Link>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 backdrop-blur-md border border-blue-500/30 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8">
              <Sparkles size={12} className="text-blue-400" /> Strategic Initiative
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tight uppercase leading-none">{program.title}</h1>
            <p className="text-xl text-slate-400 font-light leading-relaxed">
              {program.description}
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          <div className="lg:col-span-8 space-y-12">
            <div className="prose prose-xl prose-slate max-w-none">
              <p className="text-2xl font-medium text-slate-700 leading-relaxed border-l-4 border-blue-600 pl-8">
                {program.fullContent}
              </p>
            </div>

            <div className="bg-slate-50 p-12 rounded-[3rem] border border-slate-100">
               <h3 className="text-2xl font-black text-slate-900 mb-10 tracking-tight uppercase">Operational Components</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {program.details.map((detail, idx) => (
                   <div key={idx} className="flex items-center gap-4 p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
                     <CheckCircle2 className="text-green-500" size={24} />
                     <span className="text-sm font-black text-slate-800 uppercase tracking-widest">{detail}</span>
                   </div>
                 ))}
               </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <div className="sticky top-32 space-y-8">
               <div className="bg-slate-900 text-white p-10 rounded-[2.5rem] shadow-2xl">
                 <h3 className="text-xl font-black mb-6 uppercase tracking-tight">Support Our Work</h3>
                 <p className="text-slate-400 text-sm mb-8 leading-relaxed font-medium">
                   Your contribution directly funds our {program.title.toLowerCase()} across Central Africa.
                 </p>
                 <Link to="/donate" className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl flex items-center justify-center gap-3 transition-all active:scale-95">
                   <Heart size={18} fill="currentColor" /> Donate Now
                 </Link>
               </div>

               <div className="p-8 bg-blue-50 rounded-[2rem] border border-blue-100">
                  <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-4">Countries Served</h4>
                  <div className="flex flex-wrap gap-2">
                    {['DRC', 'CAR', 'Republic of Congo', 'Cameroon'].map(c => (
                      <span key={c} className="px-3 py-1.5 bg-white border border-blue-100 rounded-lg text-[9px] font-black uppercase text-slate-600 tracking-wider">
                        {c}
                      </span>
                    ))}
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
