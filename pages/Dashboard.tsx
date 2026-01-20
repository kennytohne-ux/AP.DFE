
import React, { useState, useRef, useMemo } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { useData } from '../context/MockDataContext';
import { 
  Users, Heart, Plus, Wallet, LogOut, FileText, LayoutDashboard, 
  TrendingUp, X, Image as ImageIcon, Clock, ChevronRight, ChevronLeft, 
  Upload, Zap, ShieldCheck, Target, Calendar, Edit2, Trash2, MapPin, 
  DollarSign, Activity, UserCircle, ShieldAlert, Search, Filter, Mail,
  ArrowUpRight, ArrowDownRight, CreditCard, Landmark, History, Download,
  PiggyBank, Receipt
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { ProjectGoal, User, Donation, Expense } from '../types';

export const Dashboard = () => {
  const { 
    currentUser, logout, news, projects, gallery, donations, expenses,
    volunteers, helpers, addNews, updateNews, deleteNews, addImage,
    updateImage, deleteImage, addProject, updateProject, deleteProject,
    getAggregates, registerStaff, updateUser, addDonation, addExpense
  } = useData();
  
  const navigate = useNavigate();
  const uploadInputRef = useRef<HTMLInputElement>(null);
  const stats = useMemo(() => getAggregates(), [donations, expenses, projects, volunteers]);

  // Tab & Navigation State
  const [tab, setTab] = useState<'overview' | 'publications' | 'volunteers' | 'wallet' | 'staff' | 'profile'>('overview');
  const [contentSubTab, setContentSubTab] = useState<'All' | 'News' | 'Images' | 'Projects'>('All');
  const [walletSubTab, setWalletSubTab] = useState<'overview' | 'intake' | 'withdrawals'>('overview');
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  // Modal & Form States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [creationStep, setCreationStep] = useState<'select' | 'form'>('select');
  const [selectedCreateType, setSelectedCreateType] = useState<'News' | 'Images' | 'Projects' | 'Intake' | 'Withdrawal' | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [projectGoals, setProjectGoals] = useState<string[]>(['Initial mission analysis']);
  const [form, setForm] = useState<any>({
    title: '', category: '', excerpt: '', image: '', region: '', timeline: '', 
    duration: '', beneficiaries: '', description: '', purpose: '', field: 'Health', 
    targetFunding: 5000, subtitle: '', img: '', amount: 0, donorName: '', recipient: '', source: 'Manual Entry'
  });

  const [staffForm, setStaffForm] = useState({ name: '', email: '', role: 'helper' as 'admin' | 'helper' });

  if (!currentUser) return <Navigate to="/login" />;
  const isAdmin = currentUser.role === 'admin';

  const handleLogout = () => { logout(); navigate('/'); };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setForm({ ...form, image: base64, img: base64 });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const date = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const id = `asset-${Date.now()}`;

    if (editingId) {
      if (selectedCreateType === 'News') updateNews(editingId, { ...form });
      else if (selectedCreateType === 'Images') updateImage(editingId, { title: form.title, subtitle: form.subtitle, img: form.img });
      else if (selectedCreateType === 'Projects') {
        const updatedGoals: ProjectGoal[] = projectGoals
          .filter(g => g.trim() !== '')
          .map((g, i) => ({ id: `g-${editingId}-${i}`, text: g, isCompleted: false }));
        updateProject(editingId, { ...form, goals: updatedGoals });
      }
    } else {
      if (selectedCreateType === 'News') addNews({ id, ...form, date });
      else if (selectedCreateType === 'Images') addImage({ id, title: form.title, subtitle: form.subtitle, img: form.img });
      else if (selectedCreateType === 'Projects') {
        const initialGoals: ProjectGoal[] = projectGoals
          .filter(g => g.trim() !== '')
          .map((g, i) => ({ id: `g-${id}-${i}`, text: g, isCompleted: false }));
        addProject({ 
          id, ...form, status: 'In Progress', progress: 0, goals: initialGoals, 
          completedItems: [], missingItems: [], lastUpdated: date, currentFunding: 0 
        });
      } else if (selectedCreateType === 'Intake') {
        addDonation({
          id: `don-${Date.now()}`,
          name: form.donorName || 'Manual Entry',
          amount: Number(form.amount),
          date,
          source: form.source,
          status: 'Cleared'
        });
      } else if (selectedCreateType === 'Withdrawal') {
        addExpense({
          id: `exp-${Date.now()}`,
          category: form.category || 'Operational',
          amount: Number(form.amount),
          date,
          description: form.description,
          recipient: form.recipient,
          status: 'Cleared'
        });
      }
    }
    setIsModalOpen(false);
    setEditingId(null);
    setForm({
      title: '', category: '', excerpt: '', image: '', region: '', timeline: '', 
      duration: '', beneficiaries: '', description: '', purpose: '', field: 'Health', 
      targetFunding: 5000, subtitle: '', img: '', amount: 0, donorName: '', recipient: '', source: 'Manual Entry'
    });
  };

  const handleEdit = (type: any, item: any) => {
    setSelectedCreateType(type);
    setEditingId(item.id);
    setForm({ ...item, image: item.image || item.img, img: item.image || item.img });
    if (type === 'Projects') setProjectGoals(item.goals.map((g: any) => g.text));
    setCreationStep('form');
    setIsModalOpen(true);
  };

  const handleConfirmDeleteNews = (id: string, title: string) => {
    if (confirm(`Operational Purge: Permanently delete news record "${title}"?`)) {
      deleteNews(id);
    }
  };

  const handleConfirmDeleteProject = (id: string, title: string) => {
    if (confirm(`Operational Purge: Permanently delete project record "${title}"?`)) {
      deleteProject(id);
    }
  };

  const handleStaffRegister = (e: React.FormEvent) => {
    e.preventDefault();
    registerStaff(staffForm.name, staffForm.email, staffForm.role);
    setStaffForm({ name: '', email: '', role: 'helper' });
  };

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={20} />, roles: ['admin', 'helper'] },
    { id: 'publications', label: 'Publications', icon: <FileText size={20} />, roles: ['admin', 'helper'] },
    { id: 'volunteers', label: 'Volunteers', icon: <Users size={20} />, roles: ['admin', 'helper'] },
    { id: 'wallet', label: 'Wallet', icon: <Wallet size={20} />, roles: ['admin'] },
    { id: 'staff', label: 'Staff Hub', icon: <ShieldAlert size={20} />, roles: ['admin'] },
    { id: 'profile', label: 'Profile', icon: <UserCircle size={20} />, roles: ['admin', 'helper'] },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col md:flex-row font-sans text-slate-900">
      {/* Sidebar Navigation */}
      <aside className={`bg-slate-900 text-white flex flex-col h-screen sticky top-0 z-50 shrink-0 shadow-2xl transition-all duration-300 ${isCollapsed ? 'w-24' : 'w-80'}`}>
        <div className={`p-10 flex items-center gap-4 border-b border-white/5 ${isCollapsed ? 'justify-center' : ''}`}>
          <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-2xl shrink-0">
            <ShieldCheck size={24} className="text-white" />
          </div>
          {!isCollapsed && (
            <div className="animate-in fade-in duration-500">
              <div className="text-2xl font-black tracking-tighter uppercase leading-none">HQ <span className="text-blue-500">Node</span></div>
              <div className="text-[8px] uppercase font-black text-slate-500 mt-1.5 tracking-[0.3em]">{currentUser.role} Security</div>
            </div>
          )}
        </div>
        
        <nav className="p-6 space-y-1 flex-grow overflow-y-auto no-scrollbar">
          {menuItems.filter(item => item.roles.includes(currentUser.role)).map(item => (
            <button 
              key={item.id} 
              onClick={() => setTab(item.id as any)} 
              className={`w-full flex items-center gap-4 p-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all ${tab === item.id ? 'bg-blue-600 text-white shadow-xl' : 'text-slate-400 hover:text-white hover:bg-white/5'} ${isCollapsed ? 'justify-center' : ''}`}
            >
              {item.icon} {!isCollapsed && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-8 mt-auto border-t border-white/5">
          <button onClick={handleLogout} className={`w-full flex items-center gap-4 p-4 text-red-400 hover:bg-red-500/10 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all ${isCollapsed ? 'justify-center' : ''}`}>
            <LogOut size={20} /> {!isCollapsed && <span>Exit Portal</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col overflow-y-auto no-scrollbar h-screen">
        <header className="bg-white border-b border-slate-200 py-6 px-12 flex justify-between items-center sticky top-0 z-40">
           <div className="flex items-center gap-8">
             <button onClick={() => setIsCollapsed(!isCollapsed)} className="p-3 bg-slate-50 text-slate-600 rounded-2xl hover:bg-slate-100 transition-colors">
               {isCollapsed ? <ChevronRight size={22} /> : <ChevronLeft size={22} />}
             </button>
             <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Regional HQ Hub • Operational Node</div>
           </div>
           <div className="flex items-center gap-4">
             <div className="text-right">
               <div className="text-sm font-black text-slate-900 uppercase tracking-tighter">{currentUser.name}</div>
               <div className="text-[9px] font-black text-blue-600 uppercase tracking-widest">{currentUser.role} Agent</div>
             </div>
             <img src={currentUser.profilePicture || `https://ui-avatars.com/api/?name=${currentUser.name}`} className="w-10 h-10 rounded-full border-2 border-slate-200" />
           </div>
        </header>

        <main className="p-12 space-y-16">
          {/* OVERVIEW TAB */}
          {tab === 'overview' && (
            <div className="space-y-16 animate-in fade-in duration-700">
               <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {[
                  { label: "Intake Total", value: `$${stats.totalRevenue.toLocaleString()}`, icon: <Wallet className="text-blue-600" /> },
                  { label: "Field Agents", value: stats.volunteerCount, icon: <Users className="text-green-600" /> },
                  { label: "Active Missions", value: stats.projectCount, icon: <Target className="text-amber-600" /> },
                  { label: "Lives Impacted", value: stats.activeBeneficiaries, icon: <Heart className="text-red-600" /> },
                ].map((stat, i) => (
                  <div key={i} className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-sm border-b-8 border-b-transparent hover:border-b-blue-600 transition-all">
                    <div className="p-5 bg-slate-50 rounded-2xl w-fit mb-8">{stat.icon}</div>
                    <div className="text-4xl font-black text-slate-900 mb-2 tracking-tighter">{stat.value}</div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 bg-white p-12 rounded-[4rem] border border-slate-200 shadow-sm">
                  <h3 className="text-2xl font-black mb-12 flex items-center gap-4 uppercase tracking-tight"><TrendingUp className="text-blue-600" /> Activity Metrics</h3>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={stats.revenueHistory}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 700}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 700}} />
                        <Tooltip contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)', fontWeight: 800}} />
                        <Area type="monotone" dataKey="amount" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} strokeWidth={5} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="bg-slate-900 text-white p-14 rounded-[4rem] shadow-2xl relative overflow-hidden flex flex-col justify-center">
                  <h3 className="text-2xl font-black mb-12 flex items-center gap-4 uppercase tracking-tight"><Zap size={24} className="text-amber-400" /> Hub Status</h3>
                  <div className="space-y-12">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                        <span className="text-slate-500">Operational Pulse</span>
                        <span className="text-blue-400">Stable</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 w-[95%]"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PUBLICATIONS TAB */}
          {tab === 'publications' && (
            <div className="space-y-12 animate-in fade-in duration-700">
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-8 border-b border-slate-200 pb-12">
                <div>
                  <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">Intelligence Hub</h1>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em] mt-4">Authorized Field Assets</p>
                </div>
                <button onClick={() => { setEditingId(null); setCreationStep('select'); setIsModalOpen(true); }} className="px-10 py-5 bg-blue-600 text-white rounded-[1.5rem] font-black text-xs uppercase tracking-widest flex items-center gap-3 hover:bg-blue-700 shadow-2xl transition-all scale-100 active:scale-95">
                  <Plus size={20} /> Deploy Update
                </button>
              </div>

              <div className="flex items-center gap-3 p-2 bg-slate-100 rounded-[1.5rem] w-fit">
                {['All', 'News', 'Projects', 'Images'].map((sub) => (
                  <button key={sub} onClick={() => setContentSubTab(sub as any)} className={`px-10 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${contentSubTab === sub ? 'bg-white text-blue-600 shadow-xl' : 'text-slate-500 hover:text-slate-700'}`}>
                    {sub}
                  </button>
                ))}
              </div>

              <div className="bg-white rounded-[4rem] shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-slate-50/50 border-b border-slate-200">
                    <tr>
                      <th className="px-12 py-8 text-[10px] font-black uppercase text-slate-400 tracking-[0.25em]">Transmission</th>
                      <th className="px-12 py-8 text-[10px] font-black uppercase text-slate-400 tracking-[0.25em]">Region / Category</th>
                      <th className="px-12 py-8 text-right text-[10px] font-black uppercase text-slate-400 tracking-[0.25em]">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {(contentSubTab === 'All' || contentSubTab === 'News') && news.map(n => (
                      <tr key={n.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-12 py-8 font-black text-slate-900 uppercase tracking-tighter text-sm flex items-center gap-4">
                           <div className="w-10 h-10 rounded-lg bg-blue-50 overflow-hidden"><img src={n.image} className="w-full h-full object-cover" /></div>
                           {n.title}
                        </td>
                        <td className="px-12 py-8 text-[10px] font-bold text-slate-400 uppercase tracking-widest">{n.category} • {n.date}</td>
                        <td className="px-12 py-8 text-right flex justify-end gap-2">
                          <button onClick={() => handleEdit('News', n)} className="p-3 bg-slate-100 text-slate-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all"><Edit2 size={16} /></button>
                          <button onClick={() => handleConfirmDeleteNews(n.id, n.title)} className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all"><Trash2 size={16} /></button>
                        </td>
                      </tr>
                    ))}
                    {(contentSubTab === 'All' || contentSubTab === 'Projects') && projects.map(p => (
                      <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-12 py-8 font-black text-slate-900 uppercase tracking-tighter text-sm flex items-center gap-4">
                           <div className="w-10 h-10 rounded-lg bg-amber-50 overflow-hidden"><img src={p.image} className="w-full h-full object-cover" /></div>
                           {p.title}
                        </td>
                        <td className="px-12 py-8 text-[10px] font-bold text-slate-400 uppercase tracking-widest">{p.region} • {p.field}</td>
                        <td className="px-12 py-8 text-right flex justify-end gap-2">
                          <Link to={`/dashboard/project/${p.id}`} className="p-3 bg-slate-900 text-white rounded-xl hover:bg-blue-600 transition-all text-[9px] font-black uppercase px-4 flex items-center gap-2"><Target size={14}/> Sync</Link>
                          <button onClick={() => handleEdit('Projects', p)} className="p-3 bg-slate-100 text-slate-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all"><Edit2 size={16} /></button>
                          <button onClick={() => handleConfirmDeleteProject(p.id, p.title)} className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all"><Trash2 size={16} /></button>
                        </td>
                      </tr>
                    ))}
                    {(contentSubTab === 'All' || contentSubTab === 'Images') && gallery.map(g => (
                      <tr key={g.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-12 py-8 font-black text-slate-900 uppercase tracking-tighter text-sm flex items-center gap-4">
                           <div className="w-10 h-10 rounded-lg bg-purple-50 overflow-hidden"><img src={g.img} className="w-full h-full object-cover" /></div>
                           {g.title}
                        </td>
                        <td className="px-12 py-8 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Visual Log • {g.subtitle}</td>
                        <td className="px-12 py-8 text-right flex justify-end gap-2">
                          <button onClick={() => handleEdit('Images', g)} className="p-3 bg-slate-100 text-slate-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all"><Edit2 size={16} /></button>
                          <button onClick={() => deleteImage(g.id)} className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all"><Trash2 size={16} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* VOLUNTEERS TAB */}
          {tab === 'volunteers' && (
            <div className="space-y-12 animate-in fade-in duration-700">
               <div>
                  <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">Field Volunteers</h1>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em] mt-4">Active Human Capital Registry</p>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 {volunteers.map(v => (
                   <div key={v.id} className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm hover:shadow-2xl transition-all group">
                     <div className="flex items-center gap-4 mb-8">
                       <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center font-black text-2xl uppercase">
                         {v.firstName?.[0] || '?'}{v.lastName?.[0] || '?'}
                       </div>
                       <div>
                         <h3 className="text-xl font-black text-slate-900">{v.firstName} {v.lastName}</h3>
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{v.country}</p>
                       </div>
                     </div>
                     <div className="text-[11px] font-bold text-slate-500 mb-8"><Mail size={14} className="inline mr-2 text-blue-500" /> {v.email}</div>
                     <button className="w-full py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl">Contact Agent</button>
                   </div>
                 ))}
               </div>
            </div>
          )}

          {/* WALLET TAB (ADMIN ONLY) */}
          {tab === 'wallet' && isAdmin && (
            <div className="space-y-12 animate-in fade-in duration-700">
               <div className="flex flex-col md:flex-row justify-between md:items-center gap-8 border-b border-slate-200 pb-12">
                <div>
                  <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">Financial Control</h1>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em] mt-4">Mission Resource Governance</p>
                </div>
                <div className="flex gap-4">
                  <button onClick={() => { setSelectedCreateType('Intake'); setCreationStep('form'); setIsModalOpen(true); }} className="px-8 py-4 bg-green-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-green-700 shadow-xl transition-all">
                    <ArrowUpRight size={18} /> Log Intake
                  </button>
                  <button onClick={() => { setSelectedCreateType('Withdrawal'); setCreationStep('form'); setIsModalOpen(true); }} className="px-8 py-4 bg-red-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-red-700 shadow-xl transition-all">
                    <ArrowDownRight size={18} /> Authorize Burn
                  </button>
                </div>
              </div>

              {/* Financial Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm relative overflow-hidden group">
                   <div className="flex justify-between items-start mb-6">
                      <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl"><Landmark size={24} /></div>
                      <span className="text-[8px] font-black uppercase tracking-widest text-slate-400 bg-slate-100 px-3 py-1 rounded-full">Available Liquidity</span>
                   </div>
                   <div className="text-4xl font-black text-slate-900 tracking-tighter mb-2">${(stats.totalRevenue - stats.totalExpenses).toLocaleString()}</div>
                   <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Net Regional Treasury</div>
                   <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000"></div>
                </div>

                <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm relative overflow-hidden group">
                   <div className="flex justify-between items-start mb-6">
                      <div className="p-4 bg-green-50 text-green-600 rounded-2xl"><ArrowUpRight size={24} /></div>
                      <span className="text-[8px] font-black uppercase tracking-widest text-green-400 bg-green-50 px-3 py-1 rounded-full">Intake History</span>
                   </div>
                   <div className="text-4xl font-black text-slate-900 tracking-tighter mb-2">${stats.totalRevenue.toLocaleString()}</div>
                   <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Gross Contributions Received</div>
                   <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000"></div>
                </div>

                <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm relative overflow-hidden group">
                   <div className="flex justify-between items-start mb-6">
                      <div className="p-4 bg-red-50 text-red-600 rounded-2xl"><ArrowDownRight size={24} /></div>
                      <span className="text-[8px] font-black uppercase tracking-widest text-red-400 bg-red-50 px-3 py-1 rounded-full">Operational Burn</span>
                   </div>
                   <div className="text-4xl font-black text-slate-900 tracking-tighter mb-2">${stats.totalExpenses.toLocaleString()}</div>
                   <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Mission Withdrawals</div>
                   <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000"></div>
                </div>
              </div>

              {/* Wallet Sub-Tabs */}
              <div className="flex items-center gap-3 p-2 bg-slate-100 rounded-[1.5rem] w-fit">
                {[
                  { id: 'overview', label: 'Summary', icon: <History size={14}/> },
                  { id: 'intake', label: 'Intake Log', icon: <CreditCard size={14}/> },
                  { id: 'withdrawals', label: 'Burn Log', icon: <Receipt size={14}/> }
                ].map((sub) => (
                  <button key={sub.id} onClick={() => setWalletSubTab(sub.id as any)} className={`px-10 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${walletSubTab === sub.id ? 'bg-white text-blue-600 shadow-xl' : 'text-slate-500 hover:text-slate-700'}`}>
                    {sub.icon} {sub.label}
                  </button>
                ))}
              </div>

              {/* Ledger Table */}
              <div className="bg-white rounded-[4rem] border border-slate-200 shadow-sm overflow-hidden">
                 {walletSubTab === 'overview' && (
                   <div className="p-10 space-y-12">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Recent Income mini list */}
                        <div className="space-y-6">
                           <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] pl-2">Recent Regional Intake</h4>
                           <div className="space-y-4">
                             {donations.slice(0, 5).map(d => (
                               <div key={d.id} className="p-6 bg-slate-50 rounded-2xl flex justify-between items-center group hover:bg-green-50 transition-all">
                                  <div className="flex items-center gap-4">
                                     <div className="p-3 bg-white text-green-600 rounded-xl shadow-sm"><ArrowUpRight size={16}/></div>
                                     <div>
                                        <div className="text-xs font-black text-slate-900 uppercase tracking-tight">{d.name}</div>
                                        <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-0.5">{d.source} • {d.date}</div>
                                     </div>
                                  </div>
                                  <div className="text-lg font-black text-green-600 tracking-tighter">+${d.amount.toLocaleString()}</div>
                               </div>
                             ))}
                           </div>
                           <button onClick={() => setWalletSubTab('intake')} className="text-[10px] font-black text-blue-600 uppercase tracking-widest pl-2 hover:underline">View Full Intake History →</button>
                        </div>

                        {/* Recent Burn mini list */}
                        <div className="space-y-6">
                           <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] pl-2">Authorized Operational Burn</h4>
                           <div className="space-y-4">
                             {expenses.slice(0, 5).map(e => (
                               <div key={e.id} className="p-6 bg-slate-50 rounded-2xl flex justify-between items-center group hover:bg-red-50 transition-all">
                                  <div className="flex items-center gap-4">
                                     <div className="p-3 bg-white text-red-600 rounded-xl shadow-sm"><ArrowDownRight size={16}/></div>
                                     <div>
                                        <div className="text-xs font-black text-slate-900 uppercase tracking-tight">{e.recipient}</div>
                                        <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-0.5">{e.category} • {e.date}</div>
                                     </div>
                                  </div>
                                  <div className="text-lg font-black text-red-600 tracking-tighter">-${e.amount.toLocaleString()}</div>
                               </div>
                             ))}
                           </div>
                           <button onClick={() => setWalletSubTab('withdrawals')} className="text-[10px] font-black text-blue-600 uppercase tracking-widest pl-2 hover:underline">View Full Burn History →</button>
                        </div>
                      </div>
                   </div>
                 )}

                 {walletSubTab === 'intake' && (
                    <table className="w-full text-left">
                       <thead className="bg-slate-50/50 border-b border-slate-200">
                          <tr>
                             <th className="px-12 py-8 text-[10px] font-black uppercase text-slate-400 tracking-widest">Donor Identity</th>
                             <th className="px-12 py-8 text-[10px] font-black uppercase text-slate-400 tracking-widest">Ingress Method</th>
                             <th className="px-12 py-8 text-[10px] font-black uppercase text-slate-400 tracking-widest">Operational Date</th>
                             <th className="px-12 py-8 text-right text-[10px] font-black uppercase text-slate-400 tracking-widest">Liquidity</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-50">
                          {donations.map(d => (
                            <tr key={d.id} className="hover:bg-slate-50 transition-colors">
                               <td className="px-12 py-6 font-black text-slate-900 uppercase text-xs tracking-tight">{d.name}</td>
                               <td className="px-12 py-6">
                                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest bg-white border border-slate-200 px-3 py-1 rounded-full">{d.source}</span>
                               </td>
                               <td className="px-12 py-6 text-xs text-slate-400 font-bold uppercase">{d.date}</td>
                               <td className="px-12 py-6 text-right font-black text-green-600 text-lg tracking-tighter">+${d.amount.toLocaleString()}</td>
                            </tr>
                          ))}
                       </tbody>
                    </table>
                 )}

                 {walletSubTab === 'withdrawals' && (
                    <table className="w-full text-left">
                       <thead className="bg-slate-50/50 border-b border-slate-200">
                          <tr>
                             <th className="px-12 py-8 text-[10px] font-black uppercase text-slate-400 tracking-widest">Recipient Agency</th>
                             <th className="px-12 py-8 text-[10px] font-black uppercase text-slate-400 tracking-widest">Cost Center</th>
                             <th className="px-12 py-8 text-[10px] font-black uppercase text-slate-400 tracking-widest">Authorization Date</th>
                             <th className="px-12 py-8 text-right text-[10px] font-black uppercase text-slate-400 tracking-widest">Liquidity Burn</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-50">
                          {expenses.map(e => (
                            <tr key={e.id} className="hover:bg-slate-50 transition-colors">
                               <td className="px-12 py-6 font-black text-slate-900 uppercase text-xs tracking-tight">{e.recipient}</td>
                               <td className="px-12 py-6">
                                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest bg-white border border-slate-200 px-3 py-1 rounded-full">{e.category}</span>
                               </td>
                               <td className="px-12 py-6 text-xs text-slate-400 font-bold uppercase">{e.date}</td>
                               <td className="px-12 py-6 text-right font-black text-red-600 text-lg tracking-tighter">-${e.amount.toLocaleString()}</td>
                            </tr>
                          ))}
                       </tbody>
                    </table>
                 )}
              </div>
            </div>
          )}

          {/* STAFF HUB TAB (ADMIN ONLY) */}
          {tab === 'staff' && isAdmin && (
            <div className="space-y-12 animate-in fade-in duration-700">
               <div className="flex flex-col md:flex-row justify-between md:items-center gap-8 border-b border-slate-200 pb-12">
                  <div>
                    <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">Staff Registry</h1>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em] mt-4">Authorized Regional Personnel</p>
                  </div>
                  <button onClick={() => setCreationStep('form')} className="px-10 py-5 bg-slate-900 text-white rounded-[1.5rem] font-black text-xs uppercase tracking-widest flex items-center gap-3 hover:bg-black shadow-2xl transition-all">
                    <Plus size={20} /> Onboard Personnel
                  </button>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                 {helpers.map(h => (
                   <div key={h.id} className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm relative group">
                     <div className="flex items-center gap-5 mb-8">
                       <img src={h.profilePicture || `https://ui-avatars.com/api/?name=${h.name}`} className="w-16 h-16 rounded-full border-4 border-slate-50" />
                       <div>
                         <h3 className="text-xl font-black text-slate-900 tracking-tight">{h.name}</h3>
                         <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${h.role === 'admin' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}>{h.role} Agent</span>
                       </div>
                     </div>
                     <div className="text-[11px] font-bold text-slate-400 flex items-center gap-2 mb-10"><Mail size={14} className="text-blue-500" /> {h.email}</div>
                     <div className="flex gap-4">
                        <button className="flex-grow py-3.5 bg-slate-50 text-[10px] font-black uppercase text-slate-600 rounded-xl hover:bg-slate-100 transition-all border border-slate-100">Review Logs</button>
                        <button onClick={() => updateUser(h.id, { role: h.role === 'admin' ? 'helper' : 'admin' })} className="p-3.5 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all"><Zap size={16} /></button>
                     </div>
                   </div>
                 ))}
               </div>
            </div>
          )}

          {/* PROFILE TAB */}
          {tab === 'profile' && (
            <div className="animate-in fade-in duration-700 flex justify-center">
              <div className="max-w-2xl w-full bg-white p-16 rounded-[4rem] border border-slate-200 shadow-2xl text-center">
                <img src={currentUser.profilePicture || `https://ui-avatars.com/api/?name=${currentUser.name}`} className="w-40 h-40 rounded-[3rem] mx-auto mb-10 border-8 border-slate-50" />
                <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">{currentUser.name}</h2>
                <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] mt-4 mb-12">{currentUser.role} Clearances Active</p>
                <div className="space-y-4 text-left">
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">ID Reference</span>
                    <span className="font-bold text-slate-900">{currentUser.id}</span>
                  </div>
                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email</span>
                    <span className="font-bold text-slate-900">{currentUser.email}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* COMPREHENSIVE ASSET MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-xl" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative bg-white w-full max-w-3xl rounded-[4rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
            <div className="p-10 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
              <h3 className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none">{editingId ? 'Modify Intel' : (selectedCreateType ? `Record ${selectedCreateType}` : 'Deploy Update')}</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-4 text-slate-400 hover:bg-white hover:text-red-500 rounded-2xl transition-all"><X size={32} /></button>
            </div>
            
            {creationStep === 'select' ? (
              <div className="p-16 grid grid-cols-2 lg:grid-cols-3 gap-8">
                 {[
                   { type: 'News', icon: <FileText size={36} />, color: 'bg-blue-50 text-blue-600', desc: 'Regional News' },
                   { type: 'Projects', icon: <Target size={36} />, color: 'bg-amber-50 text-amber-600', desc: 'Field Mission' },
                   { type: 'Images', icon: <ImageIcon size={36} />, color: 'bg-purple-50 text-purple-600', desc: 'Visual Log' },
                   { type: 'Intake', icon: <ArrowUpRight size={36} />, color: 'bg-green-50 text-green-600', desc: 'Financial Intake', adminOnly: true },
                   { type: 'Withdrawal', icon: <ArrowDownRight size={36} />, color: 'bg-red-50 text-red-600', desc: 'Mission Expense', adminOnly: true },
                 ]
                 .filter(opt => !opt.adminOnly || isAdmin)
                 .map(opt => (
                   <button key={opt.type} onClick={() => { setSelectedCreateType(opt.type as any); setCreationStep('form'); }} className="p-10 border-4 border-slate-50 rounded-[3rem] hover:border-blue-600 hover:bg-blue-50 transition-all flex flex-col items-center group active:scale-95">
                      <div className={`p-6 rounded-[2rem] mb-6 shadow-sm ${opt.color}`}>{opt.icon}</div>
                      <h4 className="font-black text-slate-900 text-sm uppercase tracking-widest">{opt.type}</h4>
                      <p className="text-[9px] font-bold text-slate-400 mt-2 uppercase">{opt.desc}</p>
                   </button>
                 ))}
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="p-12 space-y-8 max-h-[75vh] overflow-y-auto no-scrollbar">
                <div className="space-y-6">
                   {/* SHARED FIELDS FOR CONTENT */}
                   {(['News', 'Projects', 'Images'].includes(selectedCreateType as any)) && (
                     <>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Asset Identity (Title)</label>
                           <input required type="text" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-black text-lg" placeholder="Mission / News Title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
                        </div>

                        {selectedCreateType === 'Projects' && (
                          <div className="grid grid-cols-2 gap-6">
                              <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-slate-400">Target Region</label>
                                <input required type="text" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold" placeholder="e.g. Bangui, CAR" value={form.region} onChange={e => setForm({...form, region: e.target.value})} />
                              </div>
                              <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-slate-400">Operational Field</label>
                                <select className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold" value={form.field} onChange={e => setForm({...form, field: e.target.value})}>
                                    <option>Health</option><option>Education</option><option>Protection</option><option>Economic</option><option>Peace</option>
                                </select>
                              </div>
                              <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-slate-400">Duration</label>
                                <input required type="text" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold" placeholder="12 Months" value={form.duration} onChange={e => setForm({...form, duration: e.target.value})} />
                              </div>
                              <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-slate-400">Beneficiaries</label>
                                <input required type="text" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold" placeholder="500+ Women" value={form.beneficiaries} onChange={e => setForm({...form, beneficiaries: e.target.value})} />
                              </div>
                              <div className="space-y-2 col-span-2">
                                <label className="text-[10px] font-black uppercase text-slate-400">Strategic Purpose</label>
                                <textarea rows={2} className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-medium" placeholder="Describe the core mission purpose..." value={form.purpose} onChange={e => setForm({...form, purpose: e.target.value})} />
                              </div>
                          </div>
                        )}

                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Transmission Description</label>
                           <textarea rows={4} className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-[2rem] outline-none font-medium text-sm" placeholder="Detailed content..." value={form.description || form.excerpt} onChange={e => setForm({...form, description: e.target.value, excerpt: e.target.value})} />
                        </div>

                        <div className="space-y-2">
                           <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Operational Visual</label>
                           <div onClick={() => uploadInputRef.current?.click()} className="w-full h-40 border-4 border-dashed border-slate-100 rounded-[2rem] flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 overflow-hidden">
                              {(form.image || form.img) ? <img src={form.image || form.img} className="w-full h-full object-cover" /> : <Upload className="text-slate-300" size={32} />}
                           </div>
                           <input type="file" ref={uploadInputRef} className="hidden" accept="image/*" onChange={handleFileUpload} />
                        </div>
                     </>
                   )}

                   {/* FINANCIAL INTAKE FORM */}
                   {selectedCreateType === 'Intake' && (
                     <>
                        <div className="space-y-6">
                           <div className="space-y-2">
                              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Liquidity Amount ($)</label>
                              <div className="relative">
                                 <DollarSign className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={24} />
                                 <input required type="number" className="w-full pl-16 pr-6 py-5 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-black text-3xl text-green-600" placeholder="0.00" value={form.amount} onChange={e => setForm({...form, amount: e.target.value})} />
                              </div>
                           </div>
                           <div className="grid grid-cols-2 gap-6">
                              <div className="space-y-2">
                                 <label className="text-[10px] font-black uppercase text-slate-400">Donor / Agency Identity</label>
                                 <input required type="text" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold" placeholder="e.g. UN Women" value={form.donorName} onChange={e => setForm({...form, donorName: e.target.value})} />
                              </div>
                              <div className="space-y-2">
                                 <label className="text-[10px] font-black uppercase text-slate-400">Ingress Channel</label>
                                 <select className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold" value={form.source} onChange={e => setForm({...form, source: e.target.value})}>
                                    <option>Manual Entry</option>
                                    <option>Wire Transfer</option>
                                    <option>Mobile Money</option>
                                    <option>Grant Settlement</option>
                                    <option>Offline Donation</option>
                                 </select>
                              </div>
                           </div>
                        </div>
                     </>
                   )}

                   {/* FINANCIAL WITHDRAWAL FORM */}
                   {selectedCreateType === 'Withdrawal' && (
                     <>
                        <div className="space-y-6">
                           <div className="space-y-2">
                              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Liquidity Burn ($)</label>
                              <div className="relative">
                                 <DollarSign className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={24} />
                                 <input required type="number" className="w-full pl-16 pr-6 py-5 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-black text-3xl text-red-600" placeholder="0.00" value={form.amount} onChange={e => setForm({...form, amount: e.target.value})} />
                              </div>
                           </div>
                           <div className="grid grid-cols-2 gap-6">
                              <div className="space-y-2">
                                 <label className="text-[10px] font-black uppercase text-slate-400">Recipient Entity</label>
                                 <input required type="text" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold" placeholder="e.g. Logistics Provider" value={form.recipient} onChange={e => setForm({...form, recipient: e.target.value})} />
                              </div>
                              <div className="space-y-2">
                                 <label className="text-[10px] font-black uppercase text-slate-400">Cost Center</label>
                                 <select className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold" value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
                                    <option>Operational</option>
                                    <option>Medical Supplies</option>
                                    <option>Field Logistics</option>
                                    <option>Staff Stipends</option>
                                    <option>Strategic Growth</option>
                                    <option>Legal & Admin</option>
                                 </select>
                              </div>
                           </div>
                           <div className="space-y-2">
                              <label className="text-[10px] font-black uppercase text-slate-400">Authorization Rationale</label>
                              <textarea rows={3} className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-medium text-sm" placeholder="Why is this burn being authorized?" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
                           </div>
                        </div>
                     </>
                   )}
                   
                   <button type="submit" className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl">Authorize Deployment</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* STAFF ONBOARDING MODAL */}
      {tab === 'staff' && creationStep === 'form' && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
           <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-xl" onClick={() => setCreationStep('select')}></div>
           <div className="relative bg-white w-full max-w-md rounded-[3rem] shadow-2xl overflow-hidden p-12">
              <h3 className="text-3xl font-black text-slate-900 tracking-tight text-center mb-8 uppercase">Onboard Agent</h3>
              <form onSubmit={handleStaffRegister} className="space-y-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Agent Name</label>
                    <input required type="text" value={staffForm.name} onChange={e => setStaffForm({...staffForm, name: e.target.value})} className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Operational Email</label>
                    <input required type="email" value={staffForm.email} onChange={e => setStaffForm({...staffForm, email: e.target.value})} className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 ml-1">Access Level</label>
                    <select value={staffForm.role} onChange={e => setStaffForm({...staffForm, role: e.target.value as any})} className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-black uppercase text-xs">
                       <option value="helper">Field Agent (Helper)</option>
                       <option value="admin">Coordinator (Admin)</option>
                    </select>
                 </div>
                 <button type="submit" className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl">Authorize Access</button>
                 <button type="button" onClick={() => setCreationStep('select')} className="w-full py-2 text-xs font-bold text-slate-400 uppercase">Cancel</button>
              </form>
           </div>
        </div>
      )}
    </div>
  );
};
