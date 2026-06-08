/**
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'motion/react';
import { Sparkles, Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { RootState } from '../redux/store';
import { loginStart, loginSuccess, loginFailure } from '../redux/slices/authSlice';

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState('alikhan@aether.io');
  const [password, setPassword] = useState('aether123');
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    if (!email || !password) {
      setLocalError('Please fill in all security fields.');
      return;
    }

    // Standard business e-commerce credentials simulated validation
    dispatch(loginStart());

    // Artificial tiny latency for premium responsive loader look
    setTimeout(() => {
      try {
        dispatch(loginSuccess({
          name: email === 'alikhan@aether.io' ? 'Alikhan Prime' : 'Consultant Merchant',
          email: email
        }));
        navigate('/admin/dashboard');
      } catch (err: any) {
        dispatch(loginFailure('Invalid login details. Try alikhan@aether.io / aether123.'));
      }
    }, 850);
  };

  return (
    <div className="min-h-screen bg-dark-950 text-white flex items-center justify-center p-6 relative aurora-bg overflow-x-hidden font-sans">
      <div className="absolute inset-0 bg-gradient-to-tr from-brand-cyan/10 via-transparent to-brand-purple/10 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md glass-pane p-8 rounded-2xl border-white/10 shadow-2xl relative z-10"
      >
        {/* Brand identity center */}
        <div className="text-center space-y-3 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-cyan to-brand-purple flex items-center justify-center shadow-lg shadow-brand-cyan/20 mx-auto cursor-pointer" onClick={() => navigate('/')}>
            <Sparkles className="w-6 h-6 text-dark-950 stroke-[2.5]" />
          </div>
          <div>
            <h1 className="font-display font-bold text-2xl tracking-tight">Security Gateway</h1>
            <p className="text-xs text-gray-400">Authenticating with Aether E-Commerce Portal</p>
          </div>
        </div>

        {/* Credentials guide block */}
        <div className="p-3 bg-brand-cyan/10 border border-brand-cyan/25 rounded-lg text-xs text-brand-cyan font-mono mb-6 leading-relaxed">
          <strong>SANDBOX CREDS (Pre-Filled):</strong>
          <div className="mt-1">Email: <span className="underline select-all">alikhan@aether.io</span></div>
          <div>Pass: <span className="underline select-all">aether123</span></div>
        </div>

        {(localError || error) && (
          <div className="bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs rounded-lg p-3 flex items-start space-x-2.5 mb-6">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{localError || error}</span>
          </div>
        )}

        <form onSubmit={handleLoginSubmit} className="space-y-5">
          {/* Email address field */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono font-medium text-gray-400">ADMIN MERCHANT EMAIL</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-500">
                <Mail className="w-4 h-4" />
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-dark-900 border border-white/5 rounded-xl text-sm focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan text-white font-mono placeholder:text-gray-600 font-light transition-all"
                placeholder="alikhan@aether.io"
              />
            </div>
          </div>

          {/* Password field */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono font-medium text-gray-400">GATEWAY PASSWORD</label>
              <span className="text-[10px] text-brand-cyan hover:underline hover:cursor-pointer">Forgot?</span>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-500">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-11 py-3 bg-dark-900 border border-white/5 rounded-xl text-sm focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan text-white font-mono placeholder:text-gray-600 font-light transition-all"
                placeholder="••••••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-500 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-purple text-dark-950 text-sm font-bold shadow-lg shadow-brand-cyan/10 hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center space-x-2 mt-2 disabled:opacity-50 cursor-pointer"
          >
            {loading ? (
              <div className="w-4 h-4 rounded-full border-2 border-dark-950 border-t-transparent animate-spin" />
            ) : (
              <span>Sign In & Verify</span>
            )}
          </button>
        </form>

        <div className="mt-8 text-center text-xs text-gray-500 font-mono">
          <span>Dont have a merchant register slot?</span>{' '}
          <span className="text-brand-purple hover:underline cursor-pointer" onClick={() => navigate('/register')}>
            Register Now &rarr;
          </span>
        </div>
      </motion.div>
    </div>
  );
}
