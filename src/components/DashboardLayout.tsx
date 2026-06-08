/**
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Boxes, 
  FileSpreadsheet, 
  Users, 
  LineChart, 
  Bell, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  Moon, 
  Sun,
  User,
  Sparkles,
  Command,
  CheckCircle2,
  AlertOctagon
} from 'lucide-react';
import { RootState } from '../redux/store';
import { logout } from '../redux/slices/authSlice';
import { toggleTheme } from '../redux/slices/settingsSlice';
import { markAllAsRead, markAsRead } from '../redux/slices/notificationsSlice';

export default function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { theme } = useSelector((state: RootState) => state.settings);
  const notifications = useSelector((state: RootState) => state.notifications.items);

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Unread notifications calculation
  const unreadNotifications = notifications.filter(n => !n.read);
  const unreadCount = unreadNotifications.length;

  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Products', path: '/admin/products', icon: Boxes },
    { name: 'Orders', path: '/admin/orders', icon: FileSpreadsheet },
    { name: 'Customers', path: '/admin/customers', icon: Users },
    { name: 'Analytics', path: '/admin/analytics', icon: LineChart },
    { name: 'Notifications', path: '/admin/notifications', icon: Bell, badge: unreadCount },
    { name: 'Settings & Profile', path: '/admin/settings', icon: Settings }
  ];

  const handleLogoutAction = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleToggleThemeAction = () => {
    dispatch(toggleTheme());
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    // Real-time globally simulated command palette triggers could be integrated here safely
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans ${theme === 'dark' ? 'bg-dark-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Background glow filters */}
      {theme === 'dark' && (
        <div className="absolute inset-0 bg-gradient-to-tr from-brand-cyan/5 via-transparent to-brand-purple/5 pointer-events-none z-0" />
      )}
      
      {/* Master Layout Containers */}
      <div className="flex h-screen overflow-hidden relative z-10 w-full">
        
        {/* DESKTOP SIDEBAR SIDE PANEL */}
        <aside 
          className={`hidden md:flex flex-col border-r shrink-0 transition-all duration-300 relative ${
            sidebarCollapsed ? 'w-20' : 'w-64'
          } ${theme === 'dark' ? 'bg-dark-900/90 border-white/5' : 'bg-white border-gray-200'}`}
        >
          {/* Collapse toggle buttons */}
          <button 
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className={`absolute top-6 -right-3 w-6 h-6 rounded-full border flex items-center justify-center transition-transform hover:scale-105 cursor-pointer z-50 ${
              theme === 'dark' ? 'bg-dark-800 border-white/10 text-brand-cyan' : 'bg-white border-gray-200 text-brand-purple'
            }`}
          >
            {sidebarCollapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
          </button>

          {/* Sidebar Top Brand Header */}
          <div className="p-6 flex items-center space-x-3 border-b border-white/5">
            <div 
              onClick={() => navigate('/')}
              className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/25 shrink-0 cursor-pointer text-white"
            >
              <Sparkles className="w-4 h-4 stroke-[2.5]" />
            </div>
            {!sidebarCollapsed && (
              <div className="animate-fade-in">
                <span className="font-display font-bold text-sm tracking-tight text-white uppercase">Aether Suite</span>
                <span className="text-[9px] font-mono block text-slate-400 uppercase tracking-widest leading-none mt-0.5">SaaS Admin</span>
              </div>
            )}
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <button
                  key={item.name}
                  onClick={() => navigate(item.path)}
                  className={`w-full group flex items-center p-3 rounded-xl text-sm font-medium transition-all relative ${
                    isActive 
                      ? (theme === 'dark' 
                          ? 'bg-white/5 text-white border border-white/10 font-medium' 
                          : 'bg-indigo-50 border-l-2 border-brand-purple font-semibold text-indigo-700')
                      : (theme === 'dark' 
                          ? 'text-slate-400 hover:text-white border border-transparent transition-colors' 
                          : 'text-gray-600 hover:bg-gray-100/80 hover:text-gray-900')
                  } cursor-pointer`}
                >
                  <Icon className={`w-5 h-5 shrink-0 transition-colors ${
                    isActive 
                      ? (theme === 'dark' ? 'text-indigo-400 font-semibold' : 'text-brand-purple')
                      : 'opacity-80'
                  }`} />
                  {!sidebarCollapsed && (
                    <span className="ml-3 font-display tracking-tight text-left truncate">{item.name}</span>
                  )}
                  {item.badge !== undefined && item.badge > 0 && !sidebarCollapsed && (
                    <span className={`ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      theme === 'dark' ? 'bg-indigo-500/20 text-indigo-400' : 'bg-indigo-100 text-indigo-700'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Sidebar Bottom Profile Drawer */}
          <div className="p-4 border-t border-white/5">
            {!sidebarCollapsed ? (
              <div className={`p-3 rounded-xl border flex items-center justify-between ${
                theme === 'dark' ? 'bg-dark-950/40 border-white/5' : 'bg-gray-50 border-gray-100'
              }`}>
                <div className="flex items-center space-x-3 overflow-hidden">
                  <img 
                    src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'} 
                    alt="avatar" 
                    className="w-10 h-10 rounded-full object-cover border border-white/10 shrink-0" 
                  />
                  <div className="text-left overflow-hidden">
                    <h4 className="text-sm font-semibold truncate leading-none mb-1">{user?.name || 'Alikhan'}</h4>
                    <span className="text-[10px] text-gray-400 truncate block font-mono">{user?.role || 'Admin'}</span>
                  </div>
                </div>
                <button 
                  onClick={handleLogoutAction}
                  className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10 transition-colors shrink-0 cursor-pointer"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="text-center">
                <button 
                  onClick={handleLogoutAction}
                  className="p-3 rounded-xl text-rose-400 hover:bg-rose-500/10 transition-colors inline-block cursor-pointer"
                  title="Sign Out"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </aside>

        {/* MOBILE SLIDE-IN SYSTEM DRAWER */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <div className="md:hidden fixed inset-0 z-50 flex">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
                className="fixed inset-0 bg-black"
              />
              <motion.div 
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className={`relative w-72 h-full flex flex-col p-6 overflow-y-auto ${
                  theme === 'dark' ? 'bg-dark-900 border-r border-white/5' : 'bg-white border-r border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between pb-6 border-b border-white/5">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-display font-bold text-sm tracking-tight text-white">AETHER SUITE</span>
                      <span className="text-[9px] font-mono block text-slate-400 tracking-widest leading-none mt-0.5">MOBILE SAAS</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile Menu Navigator */}
                <nav className="flex-1 space-y-2 pt-6">
                  {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.name}
                        onClick={() => {
                          navigate(item.path);
                          setMobileMenuOpen(false);
                        }}
                        className={`w-full flex items-center p-3 rounded-xl text-sm font-medium transition-all ${
                          isActive 
                            ? (theme === 'dark' ? 'bg-brand-cyan/10 text-brand-cyan' : 'bg-indigo-50 text-indigo-700')
                            : (theme === 'dark' ? 'text-gray-400 hover:bg-white/5 hover:text-white' : 'text-gray-600 hover:bg-gray-100')
                        }`}
                      >
                        <Icon className="w-5 h-5 shrink-0" />
                        <span className="ml-3 font-display">{item.name}</span>
                        {item.badge !== undefined && item.badge > 0 && (
                          <span className="ml-auto bg-brand-cyan text-dark-950 text-[10px] font-bold px-2 py-0.5 rounded-full font-mono">
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </nav>

                <div className="pt-6 border-t border-white/5 space-y-4">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'} 
                      alt="avatar" 
                      className="w-10 h-10 rounded-full border border-white/10" 
                    />
                    <div className="text-left">
                      <h4 className="text-sm font-semibold">{user?.name || 'Alikhan'}</h4>
                      <span className="text-xs text-gray-500 font-mono">{user?.role || 'Admin'}</span>
                    </div>
                  </div>
                  <button 
                    onClick={handleLogoutAction}
                    className="w-full py-3 bg-rose-500/10 text-rose-400 font-semibold rounded-xl hover:bg-rose-500/20 text-sm transition-colors flex items-center justify-center space-x-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out Session</span>
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* WORKSPACE AREA CONTAINER */}
        <main className="flex-1 flex flex-col h-full overflow-hidden relative">
          
          {/* HEADER BAR */}
          <header className={`h-16 px-6 border-b shrink-0 flex items-center justify-between z-40 ${
            theme === 'dark' ? 'bg-dark-900/40 border-white/5 backdrop-blur-md' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white cursor-pointer"
              >
                <Menu className="w-5 h-5" />
              </button>

              <div className="hidden sm:flex items-center space-x-2 text-xs font-mono text-gray-500">
                <Command className="w-3.5 h-3.5 shrink-0" />
                <span>WORKSPACE REGISTRY:</span>
                <span className="text-brand-cyan uppercase tracking-wider font-semibold">AETH-CO-99</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Theme Selector Button */}
              <button
                onClick={handleToggleThemeAction}
                className={`p-2 rounded-xl transition-all cursor-pointer ${
                  theme === 'dark' ? 'text-yellow-400 hover:bg-white/5' : 'text-indigo-600 hover:bg-gray-100'
                }`}
                title={theme === 'dark' ? 'Light Interface Mode' : 'Dark Interface Mode'}
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {/* System Alerts Trigger Dropdown */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowNotificationDropdown(!showNotificationDropdown);
                    setShowProfileDropdown(false);
                  }}
                  className={`p-2 rounded-xl relative transition-all cursor-pointer ${
                    theme === 'dark' ? 'text-gray-300 hover:bg-white/5 hover:text-white' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-cyan animate-pulse" />
                  )}
                </button>

                {/* Notifications overlay menu */}
                <AnimatePresence>
                  {showNotificationDropdown && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setShowNotificationDropdown(false)} />
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className={`absolute right-0 mt-2 w-80 rounded-xl border shadow-xl p-4 text-left z-50 ${
                          theme === 'dark' ? 'glass-pane border-white/10' : 'bg-white border-gray-200'
                        }`}
                      >
                        <div className="flex justify-between items-center border-b border-white/5 pb-2.5 mb-2.5">
                          <div>
                            <h4 className="text-sm font-semibold font-display">System Feed</h4>
                            <p className="text-[10px] text-gray-500 font-mono">{unreadCount} active warnings</p>
                          </div>
                          {unreadCount > 0 && (
                            <button 
                              onClick={() => {
                                dispatch(markAllAsRead());
                              }}
                              className="text-[10px] font-mono text-brand-cyan hover:underline cursor-pointer"
                            >
                              Clear Feed
                            </button>
                          )}
                        </div>

                        <div className="max-h-60 overflow-y-auto space-y-2">
                          {notifications.slice(0, 3).map((not) => (
                            <div 
                              key={not.id} 
                              onClick={() => {
                                dispatch(markAsRead(not.id));
                                navigate('/admin/notifications');
                                setShowNotificationDropdown(false);
                              }}
                              className={`p-2.5 rounded-lg border text-xs cursor-pointer transition-colors ${
                                not.read 
                                  ? 'opacity-60 bg-transparent border-transparent' 
                                  : 'bg-white/5 border-white/5 hover:bg-white/10'
                              }`}
                            >
                              <div className="flex items-center space-x-1.5 font-semibold text-[11px] mb-0.5">
                                {not.type === 'alert' ? <AlertOctagon className="w-3.5 h-3.5 text-rose-400 shrink-0" /> : <CheckCircle2 className="w-3.5 h-3.5 text-brand-cyan shrink-0" />}
                                <span className={not.type === 'alert' ? 'text-rose-300' : 'text-brand-cyan'}>{not.title}</span>
                              </div>
                              <p className="text-gray-400 leading-tight text-[11px] line-clamp-2">{not.message}</p>
                            </div>
                          ))}
                          {notifications.length === 0 && (
                            <p className="text-center font-mono text-xs text-gray-500 py-6">Feed empty.</p>
                          )}
                        </div>

                        <div className="w-full h-px bg-white/5 my-2.5" />
                        <button 
                          onClick={() => {
                            navigate('/admin/notifications');
                            setShowNotificationDropdown(false);
                          }}
                          className="w-full py-2 bg-white/5 hover:bg-white/10 text-center rounded-lg text-xs font-semibold text-gray-300 hover:text-white transition-colors cursor-pointer"
                        >
                          View All Notifications
                        </button>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              {/* Master Mini Profile Dropdown Toggle */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowProfileDropdown(!showProfileDropdown);
                    setShowNotificationDropdown(false);
                  }}
                  className="flex items-center space-x-2 bg-white/5 hover:bg-white/10 p-1.5 rounded-xl border border-white/5 cursor-pointer text-left transition-all"
                >
                  <img 
                    src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'} 
                    alt="avatar" 
                    className="w-7 h-7 rounded-full object-cover border border-white/10 shrink-0"
                  />
                  <span className="text-xs font-semibold hidden sm:inline">{user?.name || 'Alikhan'}</span>
                </button>

                <AnimatePresence>
                  {showProfileDropdown && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setShowProfileDropdown(false)} />
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className={`absolute right-0 mt-2 w-56 rounded-xl border shadow-xl p-2 z-50 text-left ${
                          theme === 'dark' ? 'glass-pane border-white/10' : 'bg-white border-gray-200'
                        }`}
                      >
                        <div className="p-3 border-b border-white/5 space-y-0.5">
                          <p className="text-sm font-semibold truncate leading-tight">{user?.name || 'Alikhan Prime'}</p>
                          <p className="text-xs text-gray-400 truncate block font-mono">{user?.email || 'alikhan@aether.io'}</p>
                        </div>
                        <div className="p-1 space-y-0.5">
                          <button 
                            onClick={() => {
                              navigate('/admin/settings');
                              setShowProfileDropdown(false);
                            }}
                            className="w-full flex items-center space-x-2 p-2 rounded-lg text-xs hover:bg-white/5 hover:text-white transition-colors"
                          >
                            <User className="w-4 h-4 text-brand-cyan shrink-0" />
                            <span>My Profile Setup</span>
                          </button>
                          <button 
                            onClick={() => {
                              navigate('/admin/settings');
                              setShowProfileDropdown(false);
                            }}
                            className="w-full flex items-center space-x-2 p-2 rounded-lg text-xs hover:bg-white/5 hover:text-white transition-colors"
                          >
                            <Settings className="w-4 h-4 text-brand-purple shrink-0" />
                            <span>Workspace Config</span>
                          </button>
                        </div>
                        <div className="h-px bg-white/5 my-1" />
                        <div className="p-1">
                          <button 
                            onClick={handleLogoutAction}
                            className="w-full flex items-center space-x-2 p-2 rounded-lg text-xs text-rose-400 hover:bg-rose-500/10 transition-colors"
                          >
                            <LogOut className="w-4 h-4 shrink-0" />
                            <span>Sign Out System</span>
                          </button>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </header>

          {/* MAIN PAGE ROUTE CONTAINER */}
          <div className="flex-1 overflow-y-auto relative w-full p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
