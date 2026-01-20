
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, Sparkles } from 'lucide-react';

export const Contact = () => {
  const [isSent, setIsSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'General Inquiry', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
    setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
  };

  return (
    <div className="animate-in fade-in duration-700 font-sans text-slate-900">
      {/* Header Section */}
      <section className="bg-slate-900 py-32 text-white text-center relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter uppercase leading-none">Contact Us</h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto font-light leading-relaxed italic">
            "Reach out to our regional coordination team for mission support, strategic partnerships, or urgent inquiries."
          </p>
        </div>
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      </section>

      {/* Main Grid Content */}
      <section className="py-32 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          
          {/* Contact Details Column */}
          <div className="space-y-16">
            <div>
              <div className="text-blue-600 font-black uppercase tracking-[0.3em] text-xs mb-4">Command Center</div>
              <h2 className="text-5xl font-black text-slate-900 mb-12 tracking-tighter leading-none uppercase">Regional Headquarters</h2>
            </div>
            
            <div className="space-y-10">
              {/* Address */}
              <div className="flex gap-8 p-10 bg-white rounded-[3rem] border border-slate-100 shadow-sm transition-all hover:shadow-2xl group">
                <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <MapPin size={32} />
                </div>
                <div>
                  <h4 className="font-black text-slate-900 mb-3 text-xl uppercase tracking-tight">Office Address</h4>
                  <p className="text-slate-500 font-bold leading-relaxed uppercase tracking-widest text-xs">
                    Kigali, Rwanda<br />
                    KG 123 Street, Near KBC
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-8 p-10 bg-white rounded-[3rem] border border-slate-100 shadow-sm transition-all hover:shadow-2xl group">
                <div className="w-20 h-20 bg-green-50 text-green-600 rounded-3xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Mail size={32} />
                </div>
                <div>
                  <h4 className="font-black text-slate-900 mb-3 text-xl uppercase tracking-tight">Email Dispatch</h4>
                  <p className="text-slate-500 font-bold leading-relaxed text-sm">
                    info@apdfe.org<br />
                    support@apdfe.org
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-8 p-10 bg-white rounded-[3rem] border border-slate-100 shadow-sm transition-all hover:shadow-2xl group">
                <div className="w-20 h-20 bg-amber-50 text-amber-600 rounded-3xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Phone size={32} />
                </div>
                <div>
                  <h4 className="font-black text-slate-900 mb-3 text-xl uppercase tracking-tight">Field Phone</h4>
                  <p className="text-slate-500 font-bold leading-relaxed text-sm">
                    +250 788 123 456<br />
                    +250 788 987 654
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex gap-8 p-10 bg-white rounded-[3rem] border border-slate-100 shadow-sm transition-all hover:shadow-2xl group">
                <div className="w-20 h-20 bg-slate-900 text-white rounded-3xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Clock size={32} />
                </div>
                <div>
                  <h4 className="font-black text-slate-900 mb-3 text-xl uppercase tracking-tight">Operational Hours</h4>
                  <p className="text-slate-500 font-bold leading-relaxed text-xs uppercase tracking-[0.2em]">
                    Mon – Fri: 08:00 – 17:00 (CAT)<br />
                    Sat: 09:00 – 13:00 (CAT)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Secure Message Form Column */}
          <div className="relative">
             <div className="bg-white p-12 md:p-20 rounded-[4rem] shadow-2xl border border-slate-100 relative z-10 overflow-hidden">
                {isSent ? (
                   <div className="h-full flex flex-col items-center justify-center text-center space-y-10 animate-in zoom-in duration-500 py-12">
                      <div className="w-32 h-32 bg-green-50 text-green-600 rounded-[2.5rem] flex items-center justify-center mx-auto shadow-inner">
                        <CheckCircle size={64} />
                      </div>
                      <h3 className="text-4xl font-black text-slate-900 uppercase tracking-tight">Secure Dispatch Successful</h3>
                      <p className="text-slate-500 font-medium max-w-sm mx-auto leading-relaxed">
                        Your message has been routed to our regional hub. Expect a response within 24 operational hours.
                      </p>
                      <button onClick={() => setIsSent(false)} className="px-12 py-5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl active:scale-95 transition-all">Send Another Inquiry</button>
                   </div>
                ) : (
                  <>
                    <div className="flex items-center gap-4 mb-12">
                      <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Sparkles size={24}/></div>
                      <h3 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Secure Messaging</h3>
                    </div>
                    <form className="space-y-8" onSubmit={handleSubmit}>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Full Name</label>
                        <input required type="text" className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 outline-none font-bold text-slate-900" placeholder="John Doe" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Secure Email</label>
                        <input required type="email" className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 outline-none font-bold text-slate-900" placeholder="john@example.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Subject Category</label>
                        <select className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 outline-none appearance-none font-black text-xs uppercase tracking-widest text-slate-600" value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})}>
                          <option>General Inquiry</option>
                          <option>Partnership Proposal</option>
                          <option>Volunteer Question</option>
                          <option>Support Request</option>
                        </select>
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Inquiry Details</label>
                        <textarea required rows={5} className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-[2.5rem] focus:ring-4 focus:ring-blue-500/10 outline-none font-medium text-slate-700" placeholder="How can we assist you?" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}></textarea>
                      </div>
                      <button type="submit" className="w-full py-6 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl hover:bg-blue-600 transition-all flex items-center justify-center gap-4 group">
                        Deploy Message <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </button>
                    </form>
                  </>
                )}
             </div>
             {/* Decorative background element */}
             <div className="absolute -bottom-16 -right-16 w-96 h-96 bg-blue-600/5 rounded-full -z-0 pointer-events-none"></div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-[700px] w-full bg-slate-100 relative overflow-hidden mt-16">
        {/* Placeholder for real interactive map or high-res stylized image */}
        <div className="absolute inset-0 bg-slate-900">
           <img 
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop" 
            className="w-full h-full object-cover grayscale opacity-30 contrast-125" 
            alt="Map background" 
           />
           <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-slate-900"></div>
        </div>
        
        <div className="absolute inset-0 flex items-center justify-center p-6">
           <div className="bg-white p-14 rounded-[4rem] shadow-2xl border border-slate-100 max-w-md text-center animate-in slide-in-from-bottom-12 duration-1000">
             <div className="w-24 h-24 bg-blue-600 text-white rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-blue-500/20">
               <MapPin size={48} />
             </div>
             <h4 className="text-3xl font-black text-slate-900 mb-4 uppercase tracking-tight">Main Regional Hub</h4>
             <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] leading-relaxed">
                Visit us at our central coordination office in Kigali to discuss mission growth.
             </p>
             <div className="mt-10 h-1 w-20 bg-blue-600 mx-auto rounded-full"></div>
           </div>
        </div>
      </section>
    </div>
  );
};
