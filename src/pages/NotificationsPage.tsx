/**
 * SPDX-License-Identifier: Apache-2.0
 */

import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bell, 
  Check, 
  CheckCheck, 
  Trash2, 
  AlertCircle, 
  ShoppingBag, 
  Terminal, 
  RefreshCw, 
  Cpu, 
  Clock, 
  Sparkles,
  Zap
} from 'lucide-react';
import { RootState } from '../redux/store';
import { 
  markAsRead, 
  markAllAsRead, 
  deleteNotification, 
  clearAllNotifications, 
  addNotification 
} from '../redux/slices/notificationsSlice';

export default function NotificationsPage() {
  const dispatch = useDispatch();
  const notifications = useSelector((state: RootState) => state.notifications.items);
  const { theme } = useSelector((state: RootState) => state.settings);

  const unreadNotifications = notifications.filter(n => !n.read);

  // SIMULATORS FOR SYSTEM TRIGGERS
  const triggerOrderSimulationAndNotification = () => {
    dispatch(addNotification({
      title: 'Incoming Webhook Checkout',
      message: `System successfully captured automatic payment processing authorization for $${Math.floor(120 + Math.random() * 400)}.00 from APAC-02 gateway.`,
      type: 'order'
    }));
  };

  const triggerSecurityAlertSimulationAndNotification = () => {
    const alerts = [
      'Database replicator completed high-availability sync logs.',
      'API webhook validation timeout recovered in 14ms.',
      'Memory storage buffer cleared via cron execution scheduler.'
    ];
    dispatch(addNotification({
      title: 'Cron System Synchronizer',
      message: alerts[Math.floor(Math.random() * alerts.length)],
      type: 'system'
    }));
  };

  return (
    <div className="space-y-6 animate-fade-in relative text-left">
      
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl tracking-tight text-white">System Notifications</h1>
          <p className="text-xs text-gray-500 font-mono">ALERT REGISTER • {unreadNotifications.length} UNREAD TELEMETRIES</p>
        </div>
        <div className="flex items-center space-x-3">
          {unreadNotifications.length > 0 && (
            <button
              onClick={() => dispatch(markAllAsRead())}
              className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-mono text-xs font-semibold flex items-center space-x-1.5 cursor-pointer"
            >
              <CheckCheck className="w-3.5 h-3.5 text-brand-cyan shrink-0" />
              <span>Mark All as Read</span>
            </button>
          )}
          {notifications.length > 0 && (
            <button
              onClick={() => dispatch(clearAllNotifications())}
              className="px-4 py-2 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 font-mono text-xs font-semibold flex items-center space-x-1.5 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5 text-rose-400 shrink-0" />
              <span>Flush Alerts List</span>
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* NOTIFICATIONS TIMELINE FEED */}
        <div className={`lg:col-span-2 p-6 rounded-2xl border ${
          theme === 'dark' ? 'glass-pane border-white/5' : 'bg-white border-gray-200'
        }`}>
          <div className="border-b border-white/5 pb-4 mb-4">
            <h3 className="font-display font-semibold text-lg text-white">Real-Time Core Feed</h3>
            <p className="text-xs text-gray-400">Chronological telemetry alerts</p>
          </div>

          <div className="space-y-3.5 max-h-[600px] overflow-y-auto pr-1">
            <AnimatePresence initial={false}>
              {notifications.map((not) => (
                <motion.div
                  key={not.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className={`p-4 rounded-xl border flex gap-4 transition-all ${
                    not.read 
                      ? 'bg-transparent border-white/5 opacity-65' 
                      : (theme === 'dark' 
                          ? 'bg-gradient-to-r from-dark-900 via-dark-900 to-dark-950 border-brand-cyan/20 shadow-md shadow-brand-cyan/5' 
                          : 'bg-indigo-50/40 border-indigo-100')
                  }`}
                >
                  {/* Category icon indicators */}
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                    not.type === 'order' ? 'bg-brand-cyan/15 border border-brand-cyan/20 text-brand-cyan' :
                    not.type === 'alert' ? 'bg-rose-500/15 border border-rose-500/20 text-rose-400' :
                    not.type === 'customer' ? 'bg-brand-purple/15 border border-brand-purple/20 text-brand-purple' :
                    'bg-slate-500/15 border border-slate-500/20 text-slate-300'
                  }`}>
                    {not.type === 'order' ? <ShoppingBag className="w-5 h-5" /> :
                     not.type === 'alert' ? <AlertCircle className="w-5 h-5 animate-pulse" /> :
                     not.type === 'customer' ? <Terminal className="w-5 h-5" /> :
                     <Bell className="w-5 h-5" />}
                  </div>

                  {/* Message breakdown contents */}
                  <div className="flex-1 space-y-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h4 className="font-semibold text-white text-sm tracking-tight">{not.title}</h4>
                      <div className="flex items-center space-x-2 text-[10px] text-gray-400 font-mono">
                        <Clock className="w-3 h-3 text-gray-500 shrink-0" />
                        <span>{new Date(not.date).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
                      </div>
                    </div>
                    <p className="text-gray-300 font-sans text-xs leading-relaxed select-text">{not.message}</p>
                    
                    {/* Inline actions panels */}
                    {!not.read && (
                      <div className="flex items-center space-x-4 pt-1.5 font-mono text-[10px]">
                        <button 
                          onClick={() => dispatch(markAsRead(not.id))}
                          className="text-brand-cyan hover:underline flex items-center space-x-1 cursor-pointer"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Mark as Read</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Individual delete trigger */}
                  <button 
                    onClick={() => dispatch(deleteNotification(not.id))}
                    className="p-1.5 rounded-lg text-gray-500 hover:text-rose-400 hover:bg-rose-500/10 shrink-0 self-start cursor-pointer"
                    title="Remove alert"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>

            {notifications.length === 0 && (
              <div className="p-16 text-center text-gray-500 font-mono space-y-3">
                <Bell className="w-10 h-10 text-gray-600 mx-auto opacity-55 animate-bounce" />
                <p>System alerts cleared. Core is running silent.</p>
              </div>
            )}
          </div>
        </div>

        {/* ALERTS CONTROLS SIMULATOR */}
        <div className="space-y-6">
          <div className={`p-6 rounded-2xl border text-left ${
            theme === 'dark' ? 'glass-pane border-white/5' : 'bg-white border-gray-200'
          }`}>
            <div className="border-b border-white/5 pb-4 mb-4">
              <h3 className="font-display font-semibold text-lg text-white">Alert Compiler Simulator</h3>
              <p className="text-xs text-gray-400">Insert custom mock alerts into state</p>
            </div>

            <div className="space-y-3">
              <p className="text-xs text-gray-400 leading-normal font-sans">
                Verify the unread counts across headers, sidebars, and dropdown arrays in real-time by launching simulated transactions below:
              </p>

              <button
                onClick={triggerOrderSimulationAndNotification}
                className="w-full py-2.5 bg-gradient-to-tr from-brand-cyan/20 to-brand-cyan/5 border border-brand-cyan/30 text-brand-cyan hover:brightness-105 rounded-xl font-mono text-xs font-bold leading-none flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5 fill-brand-cyan/25 shrink-0" />
                <span>Simulate APAC Transaction</span>
              </button>

              <button
                onClick={triggerSecurityAlertSimulationAndNotification}
                className="w-full py-2.5 bg-gradient-to-tr from-brand-purple/20 to-brand-purple/5 border border-brand-purple/30 text-brand-purple hover:brightness-105 rounded-xl font-mono text-xs font-bold leading-none flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <Cpu className="w-3.5 h-3.5 shrink-0 animate-spin" />
                <span>Simulate Cron Server Daemon</span>
              </button>
            </div>
          </div>

          <div className={`p-5 rounded-2xl border bg-brand-cyan/5 border-brand-cyan/15 font-mono text-[11px] leading-relaxed text-gray-400`}>
            <span className="text-brand-cyan font-bold block mb-1">COMPLIANCE STATS:</span>
            <span>All logs are routed through AES-256 encrypted protocols during sandbox sessions. System diagnostics remain sandboxed inside AI Studio browser memories.</span>
          </div>
        </div>

      </div>

    </div>
  );
}
