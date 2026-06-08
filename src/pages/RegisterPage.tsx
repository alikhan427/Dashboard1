/**
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useNavigate as useNav } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'motion/react';
import { Sparkles, Mail, Lock, User, Briefcase, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { registerSuccess } from '../redux/slices/authSlice';

export default function RegisterPage() {
  const navigate = useNav();
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [shopName, setShopName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(true);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    if (!name || !email || !shopName || !password) {
      setLocalError('Please complete all fields to reserve a workspace.');
      return;
    }

    if (!agreed) {
      setLocalError('Please accept the system security terms.');
      return;
    }

    // Capture register event and automatically log in
    dispatch(registerSuccess({
      name: name,
      email: email
    }));

    // Trigger toast alerts simulated internally
    navigate('/admin/dashboard');
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
        {/* Brand identity */}
        <div className="text-center space-y-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-cyan to-brand-purple flex items-center justify-center shadow-lg shadow-brand-cyan/25 mx-auto cursor-pointer" onClick={() => navigate('/')}>
            <Sparkles className="w-6 h-6 text-dark-950 stroke-[2.5]" />
          </div>
          <div>
            <h1 className="font-display font-bold text-2xl tracking-tight">Reserve Seed Workspace</h1>
            <p className="text-xs text-gray-400">Initialize a sandboxed Aether e-commerce slot</p>
          </div>
        </div>

        {localError && (
          <div className="bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs rounded-lg p-3 flex items-start space-x-2.5 mb-5 animate-pulse">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{localError}</span>
          </div>
        )}

        <form onSubmit={handleRegisterSubmit} className="space-y-4">
          {/* Admin name */}
          <div className="space-y-1">
            <label className="text-[10px] font-mono tracking-wider font-medium text-gray-400">MASTER ADMIN NAME</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-500">
                <User className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-dark-900 border border-white/5 rounded-xl text-sm focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan text-white placeholder:text-gray-600 font-light transition-all"
                placeholder="Alikhan Prime"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="text-[10px] font-mono tracking-wider font-medium text-gray-400">CONTACT ACCOUNT E-MAIL</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-500">
                <Mail className="w-4 h-4" />
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-dark-900 border border-white/5 rounded-xl text-sm focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan text-white placeholder:text-gray-600 font-light transition-all"
                placeholder="alikhan@aether.io"
              />
            </div>
          </div>

          {/* Workspace Shop Company */}
          <div className="space-y-1">
            <label className="text-[10px] font-mono tracking-wider font-medium text-gray-400">MERCHANT CHANNEL BRAND</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-500">
                <Briefcase className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-dark-900 border border-white/5 rounded-xl text-sm focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan text-white placeholder:text-gray-600 font-light transition-all"
                placeholder="Aether Apparel HQ"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="text-[10px] font-mono tracking-wider font-medium text-gray-400">ACCESS ACCESS PASSWORD</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-gray-500">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-11 py-2.5 bg-dark-900 border border-white/5 rounded-xl text-sm focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan text-white placeholder:text-gray-600 font-light transition-all"
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

          {/* Agreement Checkbox */}
          <div className="flex items-start space-x-2.5 pt-1.5">
            <input
              type="checkbox"
              id="agreeCheck"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 rounded border-white/10 bg-dark-900 text-brand-purple focus:ring-brand-purple focus:ring-offset-dark-950 accent-brand-purple cursor-pointer"
            />
            <label htmlFor="agreeCheck" className="text-[11px] text-gray-400 leading-tight font-mono select-none hover:text-white cursor-pointer">
              I authorize storage allocation setup and acknowledge sandbox logs remain confidential.
            </label>
          </div>

          <button
            type="submit"
            className="w-full mt-4 py-3.5 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-purple text-dark-950 text-sm font-bold shadow-lg shadow-brand-cyan/10 hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>Register & Initialize OS</span>
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-gray-500 font-mono">
          <span>Already registered your seat?</span>{' '}
          <span className="text-brand-purple hover:underline cursor-pointer" onClick={() => navigate('/login')}>
            Sign In Gate &rarr;
          </span>
        </div>
      </motion.div>
    </div>
  );
}
