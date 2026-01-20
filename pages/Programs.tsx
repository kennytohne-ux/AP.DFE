
import React from 'react';
import { Link } from 'react-router-dom';
import { PROGRAMS_DATA } from '../constants';
import { CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

export const Programs = () => {
  return (
    <div className="animate-in fade-in duration-700">
      <section className="bg-slate-900 py-32 text-white text-center relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 backdrop-blur-md border border-blue-500/30 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8">
            <Sparkles size={12} className="text-blue-400" /> Operational Portfolio
          </div>
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-none uppercase">Our Programs</h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto font-light leading-relaxed italic">
            "Comprehensive initiatives designed to create lasting change and empower communities across Central Africa."
          </p>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="mb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
          <div>
            <h2 className="text-4xl font-black text-slate-900 mb-6 tracking-tight uppercase">Transforming Lives Through Action</h2>
            <p className="text-lg text-slate-600 leading-relaxed font-medium">
              APDFE operates across Central African Republic, Democratic Republic of Congo, Congo-Brazzaville, and Cameroon with six core program areas addressing the most critical needs in our communities.
            </p>
          </div>
          <div className="flex gap-4">
            <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl flex-grow">
               <div className="text-3xl font-black text-blue-600 mb-1">9</div>
               <div className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Active Sectors</div>
            </div>
            <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl flex-grow">
               <div className="text-3xl font-black text-green-600 mb-1">4</div>
               <div className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Nations Reached</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {PROGRAMS_DATA.map((program) => (
            <div key={program.id} className="bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all flex flex-col group h-full">
              <div className="h-64 relative overflow-hidden">
                <img src={program.image} alt={program.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-8 left-8">
                  <h3 className="text-xl font-black text-white uppercase tracking-tight leading-tight">{program.title}</h3>
                </div>
              </div>
              <div className="p-10 flex-grow">
                <p className="text-slate-500 text-sm leading-relaxed mb-8 font-medium line-clamp-3">
                  {program.description}
                </p>
                <div className="space-y-3 mb-8">
                  {program.details.slice(0, 3).map((detail, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-[11px] font-black uppercase tracking-wider text-slate-800">
                      <CheckCircle2 size={16} className="text-green-500 flex-shrink-0" />
                      {detail}
                    </div>
                  ))}
                  {program.details.length > 3 && (
                    <div className="text-[10px] text-slate-400 font-bold uppercase pl-7">+ {program.details.length - 3} more modules</div>
                  )}
                </div>
              </div>
              <div className="px-10 pb-10">
                <Link to={`/program/${program.id}`} className="w-full py-4 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all flex items-center justify-center gap-2 shadow-xl active:scale-95">
                  Learn More <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Impact summary section */}
      <section className="bg-blue-900 py-32 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            <div>
              <div className="text-5xl md:text-7xl font-black mb-4">50,000+</div>
              <div className="text-[11px] uppercase tracking-[0.3em] text-blue-300 font-black">Lives Directly Impacted</div>
            </div>
            <div>
              <div className="text-5xl md:text-7xl font-black mb-4">4</div>
              <div className="text-[11px] uppercase tracking-[0.3em] text-blue-300 font-black">Countries of Operation</div>
            </div>
            <div>
              <div className="text-5xl md:text-7xl font-black mb-4">65%</div>
              <div className="text-[11px] uppercase tracking-[0.3em] text-blue-300 font-black">Women & Girls Reached</div>
            </div>
            <div>
              <div className="text-5xl md:text-7xl font-black mb-4">120+</div>
              <div className="text-[11px] uppercase tracking-[0.3em] text-blue-300 font-black">Communities Served</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
