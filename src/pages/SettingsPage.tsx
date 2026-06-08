/**
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Settings, 
  Key, 
  Mail, 
  Globe, 
  Shield, 
  Bell, 
  Check, 
  AlertCircle,
  Clock,
  Sparkles,
  RefreshCw,
  Award
} from 'lucide-react';
import { RootState } from '../redux/store';
import { updateAdminProfile } from '../redux/slices/authSlice';
import { addNotification } from '../redux/slices/notificationsSlice';
import { updateStoreSettings } from '../redux/slices/settingsSlice';

export default function SettingsPage() {
  const dispatch = useDispatch();
  
  const { user } = useSelector((state: RootState) => state.auth);
  const settings = useSelector((state: RootState) => state.settings);
  const { theme } = settings;

  // Tabs states
  const [activeTab, setActiveTab] = useState<'profile' | 'shop' | 'security'>('profile');

  // Profile Form States
  const [profileName, setProfileName] = useState(user?.name || '');
  const [profileEmail, setProfileEmail] = useState(user?.email || '');
  const [profileAvatar, setProfileAvatar] = useState(user?.avatar || '');
  const [profileMsg, setProfileMsg] = useState<string | null>(null);

  // Shop Settings States
  const [storeName, setStoreName] = useState(settings.storeName);
  const [storeEmail, setStoreEmail] = useState(settings.storeEmail);
  const [currency, setCurrency] = useState(settings.currency);
  const [liveTracking, setLiveTracking] = useState(settings.liveTrackingEnabled);
  const [orderAlerts, setOrderAlerts] = useState(settings.orderAlertsEnabled);
  const [shopMsg, setShopMsg] = useState<string | null>(null);

  // Security Form States
  const [currPassword, setCurrPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [securityMsg, setSecurityMsg] = useState<string | null>(null);
  const [securityError, setSecurityError] = useState<string | null>(null);

  // Handle Profile Update
  const handleSaveProfileLocal = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileMsg(null);

    dispatch(updateAdminProfile({
      name: profileName,
      email: profileEmail,
      avatar: profileAvatar
    }));

    dispatch(addNotification({
      title: 'Admin Credentials Synchronized',
      message: `Updated main master administrator records for ${profileName}.`,
      type: 'system'
    }));

    setProfileMsg('Personal identity sheets saved successfully.');
    setTimeout(() => setProfileMsg(null), 3000);
  };

  // Handle Shop configurations
  const handleSaveShopLocal = (e: React.FormEvent) => {
    e.preventDefault();
    setShopMsg(null);

    dispatch(updateStoreSettings({
      storeName,
      storeEmail,
      currency,
      liveTrackingEnabled: liveTracking,
      orderAlertsEnabled: orderAlerts
    }));

    dispatch(addNotification({
      title: 'Workspace Parameters updated',
      message: `Adjusted currency config, alert criteria, or meta details for store "${storeName}".`,
      type: 'system'
    }));

    setShopMsg('Shop parameter templates updated.');
    setTimeout(() => setShopMsg(null), 3000);
  };

  // Handle simulated Password verification
  const handleSaveSecurityLocal = (e: React.FormEvent) => {
    e.preventDefault();
    setSecurityMsg(null);
    setSecurityError(null);

    if (!currPassword || !newPassword || !confirmPassword) {
      setSecurityError('Verify all credentials fields.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setSecurityError('New password match entries disagree.');
      return;
    }

    if (newPassword.length < 6) {
      setSecurityError('Security guidelines mandate passwords with 6+ values.');
      return;
    }

    dispatch(addNotification({
      title: 'Administrator Password Rotation',
      message: 'Self-signed user authorization tokens rotated successfully.',
      type: 'system'
    }));

    setSecurityMsg('Password changed. Credentials rotated in workspace credentials storage.');
    setCurrPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setSecurityMsg(null), 4000);
  };

  return (
    <div className="space-y-6 animate-fade-in text-left">
      
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl tracking-tight text-white">Platform Settings</h1>
          <p className="text-xs text-gray-500 font-mono">WORKSPACE CREDENTIALS & CONTROL ROOM</p>
        </div>
      </div>

      {/* SETTINGS TABS SIDE-BY-SIDE */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* TAB PANELS INDICATORS */}
        <div className={`p-4 rounded-2xl border flex flex-row lg:flex-col gap-2 shrink-0 h-fit ${
          theme === 'dark' ? 'glass-pane border-white/5' : 'bg-white border-gray-200'
        }`}>
          {/* Identity Tab button */}
          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center justify-center lg:justify-start space-x-2.5 p-3 rounded-xl text-left text-xs font-semibold font-display tracking-tight transition-all cursor-pointer ${
              activeTab === 'profile' 
                ? 'bg-brand-cyan text-dark-950 font-bold' 
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <User className="w-4 h-4 shrink-0" />
            <span className="hidden sm:inline">Admin Profile Setup</span>
          </button>

          {/* Shop Tab button */}
          <button
            onClick={() => setActiveTab('shop')}
            className={`w-full flex items-center justify-center lg:justify-start space-x-2.5 p-3 rounded-xl text-left text-xs font-semibold font-display tracking-tight transition-all cursor-pointer ${
              activeTab === 'shop' 
                ? 'bg-brand-cyan text-dark-950 font-bold' 
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Settings className="w-4 h-4 shrink-0" />
            <span className="hidden sm:inline">Workspace Parameters</span>
          </button>

          {/* Security Tab button */}
          <button
            onClick={() => setActiveTab('security')}
            className={`w-full flex items-center justify-center lg:justify-start space-x-2.5 p-3 rounded-xl text-left text-xs font-semibold font-display tracking-tight transition-all cursor-pointer ${
              activeTab === 'security' 
                ? 'bg-brand-cyan text-dark-950 font-bold' 
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Key className="w-4 h-4 shrink-0" />
            <span className="hidden sm:inline">Security & Password</span>
          </button>
        </div>

        {/* WORKSPACE FORMS CONTENT */}
        <div className="lg:col-span-3">
          
          {/* TAB 1: ADMIN PROFILE CONFIGS */}
          {activeTab === 'profile' && (
            <div className={`p-6 rounded-2xl border ${
              theme === 'dark' ? 'glass-pane border-white/5 text-white' : 'bg-white border-gray-200'
            }`}>
              <div className="border-b border-white/5 pb-4 mb-4">
                <h3 className="font-display font-semibold text-lg text-white">Administrator Profile Details</h3>
                <p className="text-xs text-gray-500">Amend contact attributes and avatar representations</p>
              </div>

              {profileMsg && (
                <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-xl flex items-center space-x-2">
                  <Check className="w-4 h-4" />
                  <span>{profileMsg}</span>
                </div>
              )}

              <form onSubmit={handleSaveProfileLocal} className="space-y-4 text-xs font-sans">
                {/* Visual Avatar editor */}
                <div className="flex items-center space-x-4">
                  <img 
                    src={profileAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'} 
                    alt="avatar" 
                    className="w-16 h-16 rounded-full border border-white/10 shrink-0 object-cover" 
                  />
                  <div className="space-y-1.5 flex-1 select-none">
                    <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block font-bold">AVATAR URL INDEX</label>
                    <input
                      type="text"
                      value={profileAvatar}
                      onChange={(e) => setProfileAvatar(e.target.value)}
                      className="w-full bg-dark-950 border border-white/5 rounded-xl px-4 py-2 text-xs text-brand-cyan font-mono focus:outline-none"
                      placeholder="Paste unsplash link..."
                    />
                  </div>
                </div>

                {/* Account details inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5Col">
                    <label className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block font-bold mb-1.5">FULL MASTER NAME</label>
                    <input
                      type="text"
                      required
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                      className="w-full bg-dark-950 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block font-bold mb-1.5">PRIMARY MASTER EMAIL</label>
                    <input
                      type="email"
                      required
                      value={profileEmail}
                      onChange={(e) => setProfileEmail(e.target.value)}
                      className="w-full bg-dark-950 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-cyan"
                    />
                  </div>
                </div>

                <div className="w-full h-px bg-white/5 pt-2" />
                
                <button
                  type="submit"
                  className="px-5 py-3 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-purple text-dark-950 font-bold shadow hover:brightness-110 active:scale-[0.98] cursor-pointer"
                >
                  Save Profile Identity
                </button>
              </form>
            </div>
          )}

          {/* TAB 2: SHOP WORKSPACE CONFIGURATIONS */}
          {activeTab === 'shop' && (
            <div className={`p-6 rounded-2xl border ${
              theme === 'dark' ? 'glass-pane border-white/5 text-white' : 'bg-white border-gray-200'
            }`}>
              <div className="border-b border-white/5 pb-4 mb-4">
                <h3 className="font-display font-semibold text-lg text-white">General Shop Parameters</h3>
                <p className="text-xs text-gray-500">Configure global currencies, toggles, and notification rules</p>
              </div>

              {shopMsg && (
                <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-xl flex items-center space-x-2">
                  <Check className="w-4 h-4" />
                  <span>{shopMsg}</span>
                </div>
              )}

              <form onSubmit={handleSaveShopLocal} className="space-y-5 text-xs font-sans">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Shop brand Name */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block font-semibold mb-1.5">MERCHANT BRAND TITLE</label>
                    <input
                      type="text"
                      required
                      value={storeName}
                      onChange={(e) => setStoreName(e.target.value)}
                      className="w-full bg-dark-950 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                    />
                  </div>

                  {/* Currency Picker */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block font-semibold mb-1.5">NATIVE VALUATION INDEX</label>
                    <select
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      className="w-full bg-dark-950 border border-white/5 rounded-xl px-4 py-3 text-sm text-white font-mono focus:outline-none"
                    >
                      <option value="USD">USD ($) Standard Dollars</option>
                      <option value="EUR">EUR (€) Eurozone</option>
                      <option value="GBP">GBP (£) United Kingdom Sterling</option>
                      <option value="JPY">JPY (¥) Japanese Yen</option>
                    </select>
                  </div>
                </div>

                {/* Operations Email contacts */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block font-semibold mb-1.5">COMPLIANCE LEDGER E-MAIL</label>
                  <input
                    type="email"
                    required
                    value={storeEmail}
                    onChange={(e) => setStoreEmail(e.target.value)}
                    className="w-full bg-dark-950 border border-white/5 rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                    placeholder="operations@aether.io"
                  />
                </div>

                {/* Toggles items for alerts */}
                <div className="space-y-3.5 border-t border-white/5 pt-4">
                  <h4 className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block font-bold mb-2">OPERATIONAL TUNINGS</h4>
                  
                  {/* Toggle 1: Carrier Sync */}
                  <div className="flex items-center justify-between p-3.5 bg-dark-950/40 border border-white/5 rounded-xl text-left select-none">
                    <div>
                      <h5 className="font-semibold text-white">Live Carrier Waybill Synchronization</h5>
                      <p className="text-[11px] text-gray-400">Handshake automatically with DHL, FedEx, and JapanPost webhook servers.</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={liveTracking}
                      onChange={(e) => setLiveTracking(e.target.checked)}
                      className="rounded border-white/10 bg-dark-950 text-brand-cyan focus:ring-brand-cyan accent-brand-cyan w-4 h-4 cursor-pointer"
                    />
                  </div>

                  {/* Toggle 2: Order alerts */}
                  <div className="flex items-center justify-between p-3.5 bg-dark-950/40 border border-white/5 rounded-xl text-left select-none">
                    <div>
                      <h5 className="font-semibold text-white">Interactive Order Audio Signals</h5>
                      <p className="text-[11px] text-gray-400">Sound soft alert ringtones globally upon simulated checkout triggers.</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={orderAlerts}
                      onChange={(e) => setOrderAlerts(e.target.checked)}
                      className="rounded border-white/10 bg-dark-950 text-brand-cyan focus:ring-brand-cyan accent-brand-cyan w-4 h-4 cursor-pointer"
                    />
                  </div>
                </div>

                <div className="w-full h-px bg-white/5" />

                <button
                  type="submit"
                  className="px-5 py-3 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-purple text-dark-950 font-bold shadow hover:brightness-110 active:scale-[0.98] cursor-pointer"
                >
                  Save Workspace Parameters
                </button>
              </form>
            </div>
          )}

          {/* TAB 3: CREDENTIAL SECURITY & PASSWORDS */}
          {activeTab === 'security' && (
            <div className={`p-6 rounded-2xl border ${
              theme === 'dark' ? 'glass-pane border-white/5 text-white' : 'bg-white border-gray-200'
            }`}>
              <div className="border-b border-white/5 pb-4 mb-4">
                <h3 className="font-display font-semibold text-lg text-white">Change Workspace Password</h3>
                <p className="text-xs text-gray-500">Protect self-signed SSH endpoints and merchant account keys</p>
              </div>

              {securityMsg && (
                <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-xl flex items-center space-x-2">
                  <Check className="w-4 h-4" />
                  <span>{securityMsg}</span>
                </div>
              )}

              {securityError && (
                <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs rounded-xl flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>{securityError}</span>
                </div>
              )}

              <form onSubmit={handleSaveSecurityLocal} className="space-y-4 text-xs font-sans">
                
                {/* Current password */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block font-bold mb-1.5">CURRENT ROOT PASSWORD</label>
                  <input
                    type="password"
                    required
                    value={currPassword}
                    onChange={(e) => setCurrPassword(e.target.value)}
                    className="w-full bg-dark-950 border border-white/5 rounded-xl px-4 py-3 text-sm text-white font-mono focus:outline-none"
                    placeholder="••••••••••••"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* New password */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block font-bold mb-1.5">NEW ACCESS PASSWORD</label>
                    <input
                      type="password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full bg-dark-950 border border-white/5 rounded-xl px-4 py-3 text-sm text-white font-mono focus:outline-none"
                      placeholder="••••••••••••"
                    />
                  </div>

                  {/* Confirm password */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block font-bold mb-1.5">CONFIRM NEW ACCESS PASSWORD</label>
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full bg-dark-950 border border-white/5 rounded-xl px-4 py-3 text-sm text-white font-mono focus:outline-none"
                      placeholder="••••••••••••"
                    />
                  </div>
                </div>

                <div className="w-full h-px bg-white/5 pt-2" />

                <button
                  type="submit"
                  className="px-5 py-3 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-purple text-dark-950 font-bold shadow hover:brightness-110 active:scale-[0.98] cursor-pointer"
                >
                  Rotate Security Credentials
                </button>
              </form>
            </div>
          )}

        </div>
      </div>

    </div>
  );
}
