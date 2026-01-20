
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Mail, Phone, Menu, X, Facebook, Instagram, Heart, 
  ChevronDown, FileText, Target, ImageIcon, Globe, Users, 
  ShieldCheck, History, MapPin, BarChart3, BookOpen, 
  HandHelping, Briefcase, Home as HomeIcon, Sparkles, Shield,
  ChevronRight, Activity, Smile, Leaf, GraduationCap, Scale,
  Building, LayoutDashboard, Search
} from 'lucide-react';
import { useData } from '../context/MockDataContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { currentUser } = useData();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuConfig = [
    {
      name: 'Home',
      path: '/',
      dropdown: null
    },
    {
      name: 'About Us',
      path: '/about',
      dropdown: [
        { name: 'Who We Are', path: '/about#who-we-are', icon: <Users size={14} /> },
        { name: 'Our Mission', path: '/about#mission', icon: <Target size={14} /> },
        { name: 'Our Values', path: '/about#values', icon: <ShieldCheck size={14} /> },
        { name: 'Our Team', path: '/about#team', icon: <Users size={14} /> },
        { name: 'History', path: '/about#history', icon: <History size={14} /> },
        { name: 'Where We Work', path: '/about#footprint', icon: <Globe size={14} /> },
      ]
    },
    {
      name: 'Programs',
      path: '/programs',
      isProgramMenu: true,
      dropdown: [
        { 
          name: 'Health Programs', 
          path: '/program/health', 
          icon: <Activity size={14} />,
          subItems: ['Sexual Health (SRHR)', 'Malnutrition Support', 'Mental Health (MHPSS)'] 
        },
        { 
          name: 'Economic Empowerment', 
          path: '/program/economic', 
          icon: <Briefcase size={14} />,
          subItems: ['Vocational Training', 'Financial Literacy', 'Women Entrepreneurship']
        },
        { 
          name: 'Child Protection', 
          path: '/program/protection', 
          icon: <ShieldCheck size={14} />,
          subItems: ['Rights Advocacy', 'Safe Spaces', 'Legal Support']
        },
        { 
          name: 'Environmental Protection', 
          path: '/program/environment', 
          icon: <Leaf size={14} />,
          subItems: ['Conservation', 'Climate Awareness', 'Waste Management']
        },
        { 
          name: 'Education Programs', 
          path: '/program/education', 
          icon: <GraduationCap size={14} />,
          subItems: ['Literacy Skills', 'Numeracy', 'Scholarships']
        },
        { 
          name: 'Peace-Building', 
          path: '/program/peace', 
          icon: <Scale size={14} />,
          subItems: ['Conflict Resolution', 'Governance', 'Community Leadership']
        },
      ]
    },
    {
      name: 'Publication',
      path: '/projects',
      dropdown: [
        { name: 'Field News', path: '/news', icon: <FileText size={14} /> },
        { name: 'Visual Archive', path: '/gallery', icon: <ImageIcon size={14} /> },
        { name: 'Ongoing Projects', path: '/projects', icon: <Target size={14} /> },
      ]
    },
    {
      name: 'Get Involved',
      path: '/get-involved',
      dropdown: null
    },
    {
      name: 'Contact',
      path: '/contact',
      dropdown: null
    }
  ];

  const handleLinkClick = (e: React.MouseEvent, path: string) => {
    if (path.includes('#')) {
      const [route, anchor] = path.split('#');
      if (location.pathname === route) {
        e.preventDefault();
        const el = document.getElementById(anchor);
        if (el) {
          const navHeight = 80;
          const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
          window.scrollTo({
            top: elementPosition - navHeight,
            behavior: 'smooth'
          });
        }
      }
    }
    setActiveDropdown(null);
    setIsOpen(false);
  };

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/60 z-40 transition-opacity duration-500 pointer-events-none ${activeDropdown ? 'opacity-100' : 'opacity-0'}`} 
      />

      <nav className="sticky top-0 z-50 bg-white shadow-md">
        <div className={`bg-slate-900 text-white px-6 flex justify-between items-center text-[10px] font-black uppercase tracking-widest transition-all ${isScrolled ? 'h-0 opacity-0 overflow-hidden' : 'h-10 opacity-100'}`}>
          <div className="flex gap-6">
            <a href="mailto:info@apdfe.org" className="flex items-center gap-2 hover:text-green-400">
              <Mail size={12} /> info@apdfe.org
            </a>
            <a href="tel:+250788123456" className="flex items-center gap-2 hover:text-green-400">
              <Phone size={12} /> +250 788 123 456
            </a>
          </div>
          <div className="flex gap-4 items-center">
            <Facebook size={12} className="cursor-pointer hover:text-blue-400" />
            <Instagram size={12} className="cursor-pointer hover:text-pink-400" />
            {currentUser ? (
               <Link to="/dashboard" className="text-blue-400 ml-4 font-black">Dashboard Access</Link>
            ) : (
              <Link to="/login" className="text-slate-400 ml-4 hover:text-white font-black transition-colors">Staff Access</Link>
            )}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center py-4">
          <Link to="/" className="flex items-center gap-3">
            <img 
              src="./images/logo.jpg" 
              alt="A.P.D.F.E Logo" 
              className="h-10 w-auto" 
              onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/40x40?text=AP'; }} 
            />
            <div className="flex flex-col text-left">
              <span className="font-black text-xl text-blue-900 leading-none tracking-tighter uppercase">A.P.D.F.E</span>
              <span className="text-[7px] uppercase font-black text-green-600 tracking-[0.2em]">Building Better Futures Together</span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {menuConfig.map((menu) => (
              <div 
                key={menu.name}
                className="relative group"
                onMouseEnter={() => menu.dropdown && setActiveDropdown(menu.name)}
                onMouseLeave={() => menu.dropdown && setActiveDropdown(null)}
              >
                {menu.dropdown ? (
                  <>
                    <div
                      className={`px-4 py-3 text-[10px] font-black uppercase tracking-widest flex items-center gap-1 cursor-pointer transition-all rounded-lg ${
                        (location.pathname === menu.path) 
                        ? 'text-blue-600 bg-blue-50/50' 
                        : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                      }`}
                    >
                      {menu.name} <ChevronDown size={11} className={`transition-transform duration-300 ${activeDropdown === menu.name ? 'rotate-180' : ''}`} />
                    </div>

                    <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 transition-all duration-300 ${menu.isProgramMenu ? 'w-[600px]' : 'w-72'} ${activeDropdown === menu.name ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-2 invisible'}`}>
                      <div className={`bg-white border border-slate-100 shadow-2xl rounded-2xl p-4 ${menu.isProgramMenu ? 'grid grid-cols-2 gap-4' : 'space-y-1'}`}>
                        {menu.dropdown.map((sub: any) => {
                          const isExternal = sub.path.startsWith('mailto:') || sub.path.startsWith('tel:');
                          return (
                            <div key={sub.name} className="space-y-2">
                              {isExternal ? (
                                <a 
                                  href={sub.path}
                                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-all"
                                >
                                  <span className="text-blue-400">{sub.icon}</span>
                                  {sub.name}
                                </a>
                              ) : (
                                <Link
                                  to={sub.path}
                                  onClick={(e) => handleLinkClick(e, sub.path)}
                                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-900 hover:bg-blue-50 hover:text-blue-600 transition-all border border-transparent hover:border-blue-100"
                                >
                                  <span className="text-blue-400">{sub.icon}</span>
                                  {sub.name}
                                  {menu.isProgramMenu && <ChevronRight size={10} className="ml-auto opacity-30" />}
                                </Link>
                              )}
                              
                              {menu.isProgramMenu && sub.subItems && (
                                <div className="pl-9 space-y-1">
                                  {sub.subItems.map((child: string) => (
                                    <div key={child} className="text-[9px] font-bold text-slate-400 uppercase tracking-wider hover:text-blue-500 cursor-pointer flex items-center gap-2">
                                      <div className="w-1 h-1 bg-slate-200 rounded-full" /> {child}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    to={menu.path}
                    className={`px-4 py-3 text-[10px] font-black uppercase tracking-widest flex items-center gap-1 transition-all rounded-lg ${
                      (location.pathname === menu.path) 
                      ? 'text-blue-600 bg-blue-50/50' 
                      : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                    }`}
                  >
                    {menu.name}
                  </Link>
                )}
              </div>
            ))}
            
            <Link to="/donate" className="ml-4 bg-green-500 hover:bg-green-600 text-white px-7 py-3 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg transition-all active:scale-95 flex items-center gap-2">
              <Heart size={14} fill="currentColor" /> Donate Now
            </Link>
          </div>

          <button className="lg:hidden p-2 text-slate-900" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {isOpen && (
          <div className="lg:hidden bg-white border-t p-6 shadow-2xl overflow-y-auto max-h-[80vh]">
            {menuConfig.map((menu) => (
              <div key={menu.name} className="mb-6">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2 px-2">{menu.name}</p>
                <div className="space-y-1">
                  {menu.dropdown ? (
                    menu.dropdown.map((sub: any) => (
                      <div key={sub.name} className="space-y-1">
                        <Link
                          to={sub.path}
                          onClick={(e) => handleLinkClick(e, sub.path)}
                          className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-600"
                        >
                          {sub.name}
                        </Link>
                        {menu.isProgramMenu && sub.subItems && (
                          <div className="pl-6 space-y-1 mb-4">
                            {sub.subItems.map((child: string) => (
                              <div key={child} className="text-[8px] font-black text-slate-400 uppercase py-1 border-b border-slate-50">{child}</div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <Link
                      to={menu.path}
                      onClick={(e) => handleLinkClick(e, menu.path)}
                      className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-600"
                    >
                      {menu.name}
                    </Link>
                  )}
                </div>
              </div>
            ))}
            <Link to="/donate" onClick={() => setIsOpen(false)} className="w-full bg-green-500 text-white p-5 rounded-xl text-center font-black uppercase tracking-widest text-sm shadow-xl block">
              Donate Now
            </Link>
          </div>
        )}
      </nav>
    </>
  );
};

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-16">
        <div className="space-y-8">
          <div className="flex items-center gap-3">
             <div className="bg-white p-2 rounded-xl">
               <img src="./images/logo.jpg" alt="Logo" className="h-10 w-auto" />
             </div>
             <span className="text-3xl font-black text-white tracking-tighter">A.P.D.F.E</span>
          </div>
          <p className="text-sm leading-relaxed font-medium opacity-70">
            Empowering women and children across Central Africa through survivor-led initiatives in health, education, and peace-building.
          </p>
          <div className="text-xs font-black uppercase text-blue-400 tracking-widest">
            Action Pour le Développement de la Femme et de l'Enfant
          </div>
        </div>

        <div>
          <h4 className="text-white font-black text-xs uppercase tracking-[0.2em] mb-10">Navigation</h4>
          <ul className="space-y-5 text-[11px] font-black uppercase tracking-widest">
            <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link to="/programs" className="hover:text-white transition-colors">Programs</Link></li>
            <li><Link to="/news" className="hover:text-white transition-colors">Field Events</Link></li>
            <li><Link to="/projects" className="hover:text-white transition-colors">Intelligence Hub</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-black text-xs uppercase tracking-[0.2em] mb-10">Engagement</h4>
          <ul className="space-y-5 text-[11px] font-black uppercase tracking-widest">
            <li><Link to="/donate" className="hover:text-white transition-colors">Support Missions</Link></li>
            <li><Link to="/get-involved" className="hover:text-white transition-colors">Volunteer Hub</Link></li>
            <li><Link to="/get-involved" className="hover:text-white transition-colors">Strategic Partnerships</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact Dispatch</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-black text-xs uppercase tracking-[0.2em] mb-10">Dispatch HQ</h4>
          <ul className="space-y-6 text-sm font-medium">
            <li className="flex items-center gap-3"><Mail size={18} className="text-blue-400" /> info@apdfe.org</li>
            <li className="flex items-center gap-3"><Phone size={18} className="text-blue-400" /> +250 788 123 456</li>
            <li className="flex items-start gap-3">📍 Kigali, Rwanda <br/><span className="text-[10px] uppercase font-black tracking-widest opacity-60">Regional Coordination Center</span></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-24 pt-12 border-t border-white/5 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
          © 2025 A.P.D.F.E | ACTION POUR LE DÉVELOPPEMENT DE LA FEMME ET DE L'ENFANT
        </p>
      </div>
    </footer>
  );
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { pathname } = useLocation();
  const isDashboard = pathname.startsWith('/dashboard');

  return (
    <div className="flex flex-col min-h-screen">
      {!isDashboard && <Navbar />}
      <main className="flex-grow">{children}</main>
      {!isDashboard && <Footer />}
    </div>
  );
};
