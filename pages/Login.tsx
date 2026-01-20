import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, AlertCircle, Loader2, Fingerprint } from 'lucide-react';
import { useData } from '../context/MockDataContext';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const {
    helpers,
    login,
    isLoading,
    isDbHealthy,
    currentUser
  } = useData();

  const navigate = useNavigate();

  // ✅ Auto-redirect if already logged in
  useEffect(() => {
    if (currentUser) {
      navigate('/dashboard');
    }
  }, [currentUser, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isLoading) {
      setError('Database is still initializing. Please wait.');
      return;
    }

    if (!isDbHealthy) {
      setError('Database connection failed. Contact system admin.');
      return;
    }

    if (helpers.length === 0) {
      setError('No staff records found in database.');
      return;
    }

    const user = helpers.find(
      h => h.email.toLowerCase() === email.toLowerCase()
    );

    if (!user) {
      setError('Email not authorized for staff access.');
      return;
    }

    if (!user.isValidated) {
      setError('Account exists but is not yet validated.');
      return;
    }

    // ✅ Login + persist session
    login(user);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] px-4">
      <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-xl p-12 border border-slate-100">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-slate-900 text-white rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Fingerprint size={36} />
          </div>
          <h1 className="text-3xl font-black text-slate-900">
            APDFE Staff Login
          </h1>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-2">
            Internal Database Authentication
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center gap-3 bg-slate-50 p-4 rounded-xl mb-6">
            <Loader2 className="animate-spin text-blue-600" size={18} />
            <span className="text-xs font-bold text-slate-600">
              Syncing database records…
            </span>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="flex items-center gap-3 bg-red-50 border border-red-100 p-4 rounded-xl mb-6 text-red-600">
            <AlertCircle size={18} />
            <span className="text-xs font-bold">{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Staff Email
            </label>
            <div className="relative mt-2">
              <Mail size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                placeholder="staff@apdfe.org"
                className="w-full pl-14 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-xl font-bold text-slate-900 outline-none focus:border-blue-600"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-slate-900 text-white rounded-xl font-black uppercase tracking-widest text-sm hover:bg-black transition-all disabled:opacity-60"
          >
            Enter Dashboard
          </button>
        </form>

        {/* Footer */}
        <div className="mt-10 text-center text-[10px] font-bold uppercase tracking-widest text-slate-400">
          Powered by Supabase • Internal Use Only
        </div>
      </div>
    </div>
  );
};
