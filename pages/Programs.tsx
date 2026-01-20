import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

const PROGRAMS_DATA = [
  {
    id: 1,
    title: 'Health Programs',
    description: 'Initiatives focused on improving health outcomes and access to healthcare services.',
    image: '/images/program-health.jpg', // replace with your actual image path
    details: ['Community health outreach', 'Vaccination campaigns', 'Health education programs']
  },
  {
    id: 2,
    title: 'Youth and Women Economic Empowerment',
    description: 'Programs empowering youth and women through skills training and economic opportunities.',
    image: '/images/program-empowerment.jpg',
    details: ['Vocational training', 'Microfinance initiatives', 'Entrepreneurship support']
  },
  {
    id: 3,
    title: 'Child Protection and Child Rights Governance',
    description: 'Ensuring children’s rights are protected and advocating for child welfare governance.',
    image: '/images/program-child.jpg',
    details: ['Child rights advocacy', 'Child protection services', 'Policy engagement']
  },
  {
    id: 4,
    title: 'Environmental Protection',
    description: 'Projects focused on environmental conservation and sustainable practices.',
    image: '/images/program-environment.jpg',
    details: ['Reforestation projects', 'Waste management initiatives', 'Environmental education']
  },
  {
    id: 5,
    title: 'Education Programs',
    description: 'Providing access to quality education and learning resources for communities.',
    image: '/images/program-education.jpg',
    details: ['School construction', 'Teacher training', 'Scholarship programs']
  },
  {
    id: 6,
    title: 'Peace Building and Governance',
    description: 'Promoting peace, conflict resolution, and good governance in communities.',
    image: '/images/program-peace.jpg',
    details: ['Conflict resolution workshops', 'Community dialogue', 'Governance training']
  }
];

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
                  {program.details.map((detail, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-[11px] font-black uppercase tracking-wider text-slate-800">
                      <CheckCircle2 size={16} className="text-green-500 flex-shrink-0" />
                      {detail}
                    </div>
                  ))}
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
    </div>
  );
};
