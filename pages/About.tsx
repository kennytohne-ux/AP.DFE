
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Heart, Users, CheckCircle, Mail, Phone, MapPin, Globe, History, Target, ShieldAlert, Sparkles, Activity, Search, Scale, GraduationCap } from 'lucide-react';
import { TEAM_MEMBERS, TIMELINE_EVENTS } from '../constants';

export const About = () => {
  return (
    <div className="animate-in fade-in duration-700 font-sans text-slate-900 overflow-x-hidden">
      {/* Hero */}
      <section className="bg-slate-900 py-40 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <div className="flex justify-center mb-8">
            <div className="bg-white p-4 rounded-[2.5rem] shadow-2xl">
              <img src="./images/logo.jpg" alt="A.P.D.F.E" className="h-20 w-auto" />
            </div>
          </div>
          <h1 className="text-6xl md:text-9xl font-black mb-6 tracking-tighter uppercase leading-none">A.P.D.F.E</h1>
          <p className="text-xl md:text-2xl text-blue-400 font-black tracking-[0.4em] uppercase mb-4">Building Better Futures</p>
          <p className="text-slate-400 max-w-3xl mx-auto font-bold text-xs uppercase tracking-[0.3em] opacity-60">
            Action Pour le Développement de la Femme et de l'Enfant
          </p>
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/5 -skew-x-12 transform translate-x-20"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-full bg-green-500/5 -skew-x-12 transform -translate-x-20"></div>
      </section>

      {/* Identity Section */}
      <section id="who-we-are" className="py-32 max-w-7xl mx-auto px-6 scroll-mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-12">
            <div className="inline-block px-5 py-2 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100">Our Identity</div>
            <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-none uppercase">Survivor-Led & <br/><span className="text-blue-600">Community Driven</span></h2>
            <div className="space-y-8 text-slate-600 leading-relaxed font-medium text-lg">
              <p>
                Action Pour le Développement de la Femme et de l'Enfant (APDFE) is a survivor-led, women- and child-centered humanitarian organization founded in 2019 by two human rights defenders who transformed their personal experiences of violence and loss into a powerful force for collective healing and systemic change.
              </p>
              <div className="bg-slate-900 text-white p-14 rounded-[4rem] shadow-2xl border-l-[16px] border-blue-600 relative overflow-hidden group">
                <p className="relative z-10 font-bold italic text-2xl leading-relaxed text-blue-50">
                  "We are not just an organization that works for vulnerable populations—we ARE those populations. Our staff, leadership, and community mobilizers are survivors."
                </p>
                <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"></div>
              </div>
              <p>
                Operating in four of Central Africa's most fragile and conflict-affected countries—Central African Republic, Democratic Republic of Congo, Republic of Congo, and Cameroon—we deliver trauma-informed, locally-led interventions.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="rounded-[5rem] overflow-hidden shadow-[0_60px_120px_-20px_rgba(0,0,0,0.25)] h-[800px] relative z-10 border border-white">
               <img src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=2070&auto=format&fit=crop" alt="Empowerment" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-16 -left-16 w-80 h-80 bg-green-500/10 rounded-[4rem] -z-10 animate-pulse"></div>
            <div className="absolute -top-16 -right-16 w-80 h-80 bg-blue-600/10 rounded-full -z-10"></div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section id="mission" className="py-32 bg-slate-900 scroll-mt-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white/5 backdrop-blur-xl p-16 rounded-[4rem] border border-white/10 group hover:bg-white/10 transition-all">
              <div className="w-20 h-20 bg-blue-600 text-white rounded-3xl flex items-center justify-center mb-10 shadow-2xl shadow-blue-600/40"><Target size={36} /></div>
              <h3 className="text-4xl font-black text-white mb-8 uppercase tracking-tight">Our Mission</h3>
              <p className="text-blue-100 text-2xl leading-relaxed italic font-medium">
                "To empower, protect, and advocate for vulnerable women and children living in conflict and post-conflict environments across Central Africa by providing holistic, trauma-informed services."
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-xl p-16 rounded-[4rem] border border-white/10 group hover:bg-white/10 transition-all">
              <div className="w-20 h-20 bg-green-500 text-white rounded-3xl flex items-center justify-center mb-10 shadow-2xl shadow-green-500/40"><Globe size={36} /></div>
              <h3 className="text-4xl font-black text-white mb-8 uppercase tracking-tight">Our Vision</h3>
              <p className="text-green-50 text-2xl leading-relaxed italic font-medium">
                "A Central Africa where every woman and child—regardless of conflict or poverty—lives with dignity, safety, and the full realization of their rights."
              </p>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 p-40 opacity-5 pointer-events-none">
          <Sparkles size={400} />
        </div>
      </section>

      {/* Values */}
      <section id="values" className="py-32 max-w-7xl mx-auto px-6 scroll-mt-24">
        <div className="text-center mb-24 space-y-4">
          <div className="text-blue-600 font-black uppercase tracking-[0.3em] text-xs">The APDFE DNA</div>
          <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter uppercase">Our Strategic Core</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {[
            { icon: <Users size={40} />, title: "Survivor-Centered", desc: "Our programs are designed BY survivors, FOR survivors." },
            { icon: <Heart size={40} />, title: "Dignity & Respect", desc: "We restore hope, autonomy, and self-worth to those society has marginalized." },
            { icon: <Scale size={40} />, title: "Community-Led", desc: "We empower local leaders and support grassroots solutions." },
            { icon: <CheckCircle size={40} />, title: "Do No Harm", desc: "Safety, confidentiality, and trauma-informed care are at the heart of our work." }
          ].map((v, idx) => (
            <div key={idx} className="bg-white p-14 rounded-[4rem] shadow-sm border border-slate-100 text-center hover:shadow-2xl transition-all group hover:-translate-y-4">
              <div className="text-blue-600 flex justify-center mb-10 group-hover:scale-125 transition-transform duration-700">{v.icon}</div>
              <h3 className="text-xl font-black mb-6 text-slate-900 uppercase tracking-tight">{v.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed font-bold uppercase tracking-tight opacity-70">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Regional Team */}
      <section id="team" className="py-32 bg-slate-50 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12 border-b border-slate-200 pb-12">
            <div>
              <div className="text-blue-600 font-black uppercase tracking-[0.3em] text-xs mb-4">Leadership Collective</div>
              <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter uppercase leading-none">Our Regional Team</h2>
            </div>
            <p className="text-slate-500 font-bold max-w-md uppercase tracking-tight">
              A dedicated, diverse team of field experts and leaders across Central Africa and beyond.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {TEAM_MEMBERS.map((member, idx) => (
              <div key={idx} className="bg-white rounded-[3rem] p-10 border border-slate-200 shadow-sm hover:shadow-2xl transition-all group overflow-hidden relative">
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-24 h-24 bg-slate-900 text-white rounded-[2rem] flex items-center justify-center font-black text-3xl mb-8 group-hover:scale-110 transition-transform">
                    {member.name[0]}
                  </div>
                  <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter mb-2">{member.name}</h3>
                  <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-6">{member.role}</p>
                  <div className="flex items-center gap-2 px-4 py-1.5 bg-slate-100 rounded-full text-[9px] font-black uppercase tracking-widest text-slate-500">
                    <MapPin size={10} className="text-green-500" /> {member.country}
                  </div>
                </div>
                <div className="mt-10 pt-8 border-t border-slate-50 relative z-10">
                   <button className="w-full py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-colors">View Profile</button>
                </div>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-slate-50 rounded-full group-hover:scale-150 transition-transform -z-0"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* History */}
      <section id="history" className="py-32 bg-white scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <div className="text-blue-600 font-black uppercase tracking-[0.3em] text-xs mb-4">The APDFE Journey</div>
            <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter uppercase leading-none">A Legacy of Survival <br/>& Growth</h2>
          </div>
          <div className="space-y-16">
            {TIMELINE_EVENTS.map((event, idx) => (
              <div key={idx} className="flex flex-col md:flex-row gap-12 items-start group">
                <div className="w-full md:w-1/4 text-6xl font-black text-blue-600 tracking-tighter group-hover:scale-110 transition-transform flex items-center gap-6">
                   {event.year}
                   <div className="h-0.5 flex-grow bg-slate-100 rounded-full hidden md:block"></div>
                </div>
                <div className="w-full md:w-3/4 p-16 bg-slate-50 rounded-[4rem] border border-slate-100 hover:bg-white hover:shadow-2xl transition-all shadow-sm">
                  <h3 className="text-3xl font-black text-slate-900 mb-6 uppercase tracking-tight">{event.title}</h3>
                  <p className="text-slate-600 text-xl leading-relaxed font-medium">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regional Footprint */}
      <section id="footprint" className="py-32 bg-slate-900 text-white scroll-mt-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div>
                 <div className="text-blue-400 font-black uppercase tracking-[0.3em] text-xs mb-8">Operational Reach</div>
                 <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-none mb-12">Where We Work</h2>
                 <p className="text-slate-400 text-xl leading-relaxed mb-16 font-medium">
                    Our operations span across the most fragile environments in Central Africa, focusing on cross-border coordination and grassroots protection.
                 </p>
                 <div className="grid grid-cols-2 gap-8">
                   {[
                     { country: "DR Congo", stats: "12 active missions", color: "text-blue-400" },
                     { country: "C.A.R", stats: "8 regional hubs", color: "text-green-400" },
                     { country: "Cameroon", stats: "6 medical centers", color: "text-amber-400" },
                     { country: "Rep. Congo", stats: "5 safe spaces", color: "text-red-400" },
                   ].map((item, idx) => (
                     <div key={idx} className="p-8 bg-white/5 border border-white/10 rounded-[2.5rem] hover:bg-white/10 transition-all">
                       <h4 className="text-xl font-black mb-2 uppercase">{item.country}</h4>
                       <p className={`text-[10px] font-black uppercase tracking-widest ${item.color}`}>{item.stats}</p>
                     </div>
                   ))}
                 </div>
              </div>
              <div className="relative">
                 <div className="bg-slate-800 rounded-[5rem] p-12 aspect-square flex items-center justify-center relative overflow-hidden group">
                   <div className="relative z-10 text-center space-y-8">
                      <Globe size={180} className="mx-auto text-blue-500 animate-spin-slow opacity-30" />
                      <div>
                        <div className="text-6xl font-black tracking-tighter uppercase">Regional</div>
                        <div className="text-2xl font-black text-blue-400 tracking-[0.3em] uppercase">Impact</div>
                      </div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Protecting the most vulnerable populations across borders.</p>
                   </div>
                   <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 to-transparent"></div>
                 </div>
                 <div className="absolute -bottom-8 -right-8 p-12 bg-blue-600 rounded-[3rem] shadow-2xl animate-bounce">
                    <MapPin size={48} className="text-white" />
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Global Contact Summary */}
      <section className="py-24 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center p-14 bg-slate-50 rounded-[4rem] border border-slate-100 hover:bg-white hover:shadow-2xl transition-all group">
              <Mail className="text-blue-600 mb-8 group-hover:scale-110 transition-transform" size={48} />
              <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Direct Inquiry</h4>
              <a href="mailto:info@apdfe.org" className="text-3xl font-black text-slate-900 hover:text-blue-600 transition-colors tracking-tight">info@apdfe.org</a>
            </div>
            <div className="flex flex-col items-center text-center p-14 bg-slate-50 rounded-[4rem] border border-slate-100 hover:bg-white hover:shadow-2xl transition-all group">
              <Phone className="text-green-600 mb-8 group-hover:scale-110 transition-transform" size={48} />
              <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Operational Support</h4>
              <a href="tel:+250788123456" className="text-3xl font-black text-slate-900 hover:text-green-600 transition-colors tracking-tight">+250 788 123 456</a>
            </div>
            <div className="flex flex-col items-center text-center p-14 bg-slate-900 text-white rounded-[4rem] shadow-2xl hover:bg-black transition-all group relative overflow-hidden">
              <ShieldAlert className="text-blue-400 mb-8 group-hover:scale-110 transition-transform" size={48} />
              <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4">Staff HQ Access</h4>
              <Link to="/login" className="text-3xl font-black uppercase tracking-tighter hover:text-blue-400 transition-colors">A.P.D.F.E L_</Link>
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
