
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, Navigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Save, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  Target, 
  MapPin, 
  Calendar, 
  Clock,
  ShieldCheck,
  Info,
  Circle,
  XCircle,
  Users,
  DollarSign,
  Activity,
  ChevronRight
} from 'lucide-react';
import { useData } from '../context/MockDataContext';
import { Project, ProjectGoal } from '../types';

export const ProjectManagement = () => {
  const { projectId } = useParams();
  const { projects, updateProject, currentUser } = useData();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState<Partial<Project>>({});
  const [newGoalText, setNewGoalText] = useState('');

  useEffect(() => {
    const found = projects.find(p => p.id === projectId);
    if (found) {
      setProject(found);
      setFormData({ ...found });
    }
  }, [projectId, projects]);

  if (!currentUser) return <Navigate to="/login" />;
  if (!project) return <div className="p-20 text-center font-bold text-slate-400">Loading Intelligence...</div>;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProject(project.id, formData);
    navigate('/dashboard');
  };

  const toggleGoal = (goalId: string) => {
    const updatedGoals = formData.goals?.map(g => 
      g.id === goalId ? { ...g, isCompleted: !g.isCompleted } : g
    );
    setFormData({ ...formData, goals: updatedGoals });
  };

  const addGoal = () => {
    if (!newGoalText.trim()) return;
    const newGoal: ProjectGoal = {
      id: `g-${Date.now()}`,
      text: newGoalText.trim(),
      isCompleted: false
    };
    setFormData({
      ...formData,
      goals: [...(formData.goals || []), newGoal]
    });
    setNewGoalText('');
  };

  const removeGoal = (id: string) => {
    setFormData({
      ...formData,
      goals: formData.goals?.filter(g => g.id !== id)
    });
  };

  const calculateProgress = () => {
    const goals = formData.goals || [];
    if (goals.length === 0) return 0;
    const completed = goals.filter(g => g.isCompleted).length;
    return Math.round((completed / goals.length) * 100);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      <header className="bg-white border-b border-slate-200 py-6 px-8 flex justify-between items-center sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="p-2.5 bg-slate-50 text-slate-600 rounded-xl hover:bg-slate-100 transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-xl font-black tracking-tight">{formData.title}</h1>
            <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Field Project Intelligence Editor</p>
          </div>
        </div>
        <button onClick={handleSave} className="px-8 py-3 bg-blue-600 text-white rounded-xl font-black text-sm flex items-center gap-2 hover:bg-blue-700 shadow-xl shadow-blue-500/20 transition-all">
          <Save size={18} /> Publish Updates
        </button>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-10">
          <section className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-200 space-y-8">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-6 mb-6">
              <Info className="text-blue-600" size={24} />
              <h2 className="text-2xl font-black">Mission Progress Controls</h2>
            </div>
            
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <h3 className="text-lg font-black text-slate-900">Strategic Goals</h3>
                <span className="text-3xl font-black text-blue-600">{calculateProgress()}%</span>
              </div>
              
              <div className="h-4 bg-slate-100 rounded-full overflow-hidden p-1 shadow-inner">
                <div style={{ width: `${calculateProgress()}%` }} className="h-full bg-blue-600 rounded-full transition-all duration-700" />
              </div>

              <div className="space-y-3 pt-6">
                {formData.goals?.map((goal) => (
                  <div key={goal.id} className="flex items-center justify-between p-5 bg-slate-50 border border-slate-100 rounded-2xl group hover:bg-white hover:border-blue-100 transition-all">
                    <div className="flex items-center gap-4 cursor-pointer flex-grow" onClick={() => toggleGoal(goal.id)}>
                      {goal.isCompleted ? (
                        <CheckCircle2 className="text-green-500" size={24} />
                      ) : (
                        <Circle className="text-slate-200" size={24} />
                      )}
                      <span className={`font-bold ${goal.isCompleted ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
                        {goal.text}
                      </span>
                    </div>
                    <button onClick={() => removeGoal(goal.id)} className="p-2 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-4 pt-6">
                <input 
                  type="text" 
                  value={newGoalText} 
                  onChange={(e) => setNewGoalText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addGoal()}
                  placeholder="Identify new strategic goal..." 
                  className="flex-grow px-6 py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium focus:ring-2 focus:ring-blue-500/10" 
                />
                <button onClick={addGoal} className="px-8 bg-slate-900 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all">
                  Add Goal
                </button>
              </div>
            </div>
          </section>

          <section className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-200">
             <h3 className="text-xl font-black mb-8 border-b border-slate-100 pb-4 uppercase tracking-tighter">Mission Intel Core</h3>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Project Title</label>
                  <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-bold text-lg" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Region of Operation</label>
                  <div className="relative">
                    <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input type="text" value={formData.region} onChange={e => setFormData({...formData, region: e.target.value})} className="w-full pl-14 pr-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-bold" />
                  </div>
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Strategic Timeline</label>
                  <div className="relative">
                    <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input type="text" value={formData.timeline} onChange={e => setFormData({...formData, timeline: e.target.value})} className="w-full pl-14 pr-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-bold text-xs" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Duration</label>
                  <div className="relative">
                    <Clock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input type="text" value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})} className="w-full pl-14 pr-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-bold text-xs" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Beneficiaries Count</label>
                  <div className="relative">
                    <Users className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input type="text" value={formData.beneficiaries} onChange={e => setFormData({...formData, beneficiaries: e.target.value})} className="w-full pl-14 pr-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-bold text-xs" />
                  </div>
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Funding Goal ($)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input type="number" value={formData.targetFunding} onChange={e => setFormData({...formData, targetFunding: Number(e.target.value)})} className="w-full pl-14 pr-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-black text-xl" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Strategic Sector</label>
                  <select value={formData.field} onChange={e => setFormData({...formData, field: e.target.value as any})} className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-bold text-sm">
                    <option value="Health">Health</option>
                    <option value="Education">Education</option>
                    <option value="Protection">Protection</option>
                    <option value="Economic">Economic</option>
                    <option value="Environment">Environment</option>
                    <option value="Peace">Peace</option>
                  </select>
                </div>
             </div>

             <div className="space-y-2 mt-10">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Mission Purpose Statement</label>
                <div className="relative">
                  <Activity className="absolute left-5 top-5 text-slate-300" size={18} />
                  <textarea rows={2} value={formData.purpose} onChange={e => setFormData({...formData, purpose: e.target.value})} className="w-full pl-14 pr-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-medium text-sm" />
                </div>
             </div>

             <div className="space-y-2 mt-10">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Detailed Field Description</label>
                <textarea rows={5} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-medium text-sm" />
             </div>
          </section>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <div className="sticky top-32 space-y-8">
            <div className="bg-slate-900 text-white p-10 rounded-[3.5rem] shadow-2xl overflow-hidden relative group">
              <h3 className="text-xl font-black mb-10 flex items-center gap-2 relative z-10"><Target size={20} className="text-blue-500" /> Operational Health</h3>
              <div className="space-y-8 relative z-10">
                 <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                   <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Completion readiness</p>
                   <p className="text-5xl font-black text-blue-500">{calculateProgress()}%</p>
                 </div>
                 <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                   <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Accumulated Funding</p>
                   <p className="text-5xl font-black text-green-500">${(formData.currentFunding || 0).toLocaleString()}</p>
                   <p className="text-[10px] text-slate-500 font-bold uppercase mt-3 tracking-widest">Of Goal: ${formData.targetFunding?.toLocaleString()}</p>
                 </div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl transition-transform group-hover:scale-150 duration-1000"></div>
            </div>
            
            <div className="p-10 bg-white rounded-[3rem] border border-slate-100 shadow-sm flex flex-col items-center text-center">
               <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mb-6">
                 <ShieldCheck size={36} />
               </div>
               <h4 className="text-lg font-black uppercase tracking-tight mb-3">Sync Authority</h4>
               <p className="text-[10px] font-bold text-slate-400 leading-relaxed uppercase tracking-widest">
                  Deploying these updates synchronizes all regional publications and field agents dashboards.
               </p>
               <button onClick={handleSave} className="mt-8 w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-black transition-all">
                  Sync mission <ChevronRight size={16} />
               </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
