/**
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  UserCheck, 
  MapPin, 
  X, 
  Activity, 
  Calendar, 
  DollarSign, 
  ShoppingBag, 
  Award, 
  LifeBuoy, 
  Check, 
  TrendingUp,
  Map,
  Clock
} from 'lucide-react';
import { RootState } from '../redux/store';
import { setCustomerSearchTerm } from '../redux/slices/customersSlice';
import { Customer } from '../types';

export default function CustomersPage() {
  const dispatch = useDispatch();
  const { items, searchTerm } = useSelector((state: RootState) => state.customers);
  const { theme } = useSelector((state: RootState) => state.settings);

  // States
  const [selectedCust, setSelectedCust] = useState<Customer | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const handleSearchChangeLocal = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setCustomerSearchTerm(e.target.value));
    setCurrentPage(1);
  };

  const filteredCustomers = items.filter(cust => {
    return cust.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
           cust.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
           cust.city.toLowerCase().includes(searchTerm.toLowerCase()) || 
           cust.country.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage) || 1;
  const currentCustomers = filteredCustomers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // CRM Aggregations
  const totalLifecycleSpend = items.reduce((sum, c) => sum + c.totalSpend, 0);
  const averageCustomerSpend = items.length ? (totalLifecycleSpend / items.length) : 0;
  const peakCustomer = items.length ? [...items].sort((a, b) => b.totalSpend - a.totalSpend)[0] : null;

  const handleOpenProfileModal = (cust: Customer) => {
    setSelectedCust(cust);
    setProfileOpen(true);
  };

  return (
    <div className="space-y-6 animate-fade-in relative">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl tracking-tight text-white">Merchant Account CRM</h1>
          <p className="text-xs text-gray-500 font-mono">CLIENT DIRECTORY • {filteredCustomers.length} INDEXED SUBSCRIBERS</p>
        </div>
      </div>

      {/* CRM METRICS WIDGET GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className={`p-4 rounded-xl border flex items-center space-x-4 ${
          theme === 'dark' ? 'bg-dark-900/60 border-white/5 text-white' : 'bg-white border-gray-200'
        }`}>
          <div className="w-10 h-10 rounded-lg bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center text-brand-cyan shrink-0">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-gray-500 block uppercase">Aggregate Life CRM Value</span>
            <p className="text-xl font-bold font-display">${totalLifecycleSpend.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          </div>
        </div>

        <div className={`p-4 rounded-xl border flex items-center space-x-4 ${
          theme === 'dark' ? 'bg-dark-900/60 border-white/5 text-white' : 'bg-white border-gray-200'
        }`}>
          <div className="w-10 h-10 rounded-lg bg-brand-purple/10 border border-brand-purple/20 flex items-center justify-center text-brand-purple shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-gray-500 block uppercase">Median Shopper Loyalty</span>
            <p className="text-xl font-bold font-display">${averageCustomerSpend.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          </div>
        </div>

        <div className={`p-4 rounded-xl border flex items-center space-x-4 ${
          theme === 'dark' ? 'bg-dark-900/60 border-white/5 text-white' : 'bg-white border-gray-200'
        }`}>
          <div className="w-10 h-10 rounded-lg bg-brand-magenta/10 border border-brand-magenta/20 flex items-center justify-center text-brand-magenta shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-gray-500 block uppercase">Peak Customer MVP</span>
            <p className="text-base font-bold truncate leading-tight mt-0.5">{peakCustomer ? `${peakCustomer.name} ($${peakCustomer.totalSpend.toFixed(2)})` : 'N/A'}</p>
          </div>
        </div>
      </div>

      {/* SEARCH AND FILTERS */}
      <div className={`p-4 rounded-xl border flex flex-col md:flex-row gap-4 items-center justify-between ${
        theme === 'dark' ? 'bg-dark-900/60 border-white/5' : 'bg-white border-gray-200'
      }`}>
        <div className="relative w-full md:w-80">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChangeLocal}
            className="w-full pl-9 pr-4 py-2 bg-dark-950 border border-white/5 rounded-lg text-xs font-mono text-white placeholder:text-gray-600 focus:outline-none focus:border-brand-cyan"
            placeholder="Search clients by name, city, email..."
          />
        </div>
        <div className="text-xs text-gray-500 font-mono">
          Showing {currentCustomers.length} of {filteredCustomers.length} clients
        </div>
      </div>

      {/* CUSTOMER DIRECTORY LIST TABLE */}
      <div className={`rounded-2xl border overflow-hidden ${
        theme === 'dark' ? 'glass-pane border-white/5' : 'bg-white border-gray-200'
      }`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-white/10 text-gray-400 uppercase tracking-widest bg-white/5 pb-2">
                <th className="p-4">MERCHANT CUSTOMER</th>
                <th className="p-4">EMAIL CONTACT</th>
                <th className="p-4">GEOGRAPHY LOCATION</th>
                <th className="p-4">JOINED DATE</th>
                <th className="p-4 text-center">ORDER VOLUME</th>
                <th className="p-4 text-right">LIFETIME WALLET</th>
                <th className="p-4 text-right">CONTROLS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono">
              {currentCustomers.map((cust) => (
                <tr key={cust.id} className="hover:bg-white/5 transition-colors">
                  {/* Photo / Name */}
                  <td className="p-4">
                    <div className="flex items-center space-x-3 text-left">
                      <img 
                        src={cust.avatar} 
                        alt={cust.name} 
                        className="w-9 h-9 rounded-full object-cover border border-white/10 shrink-0" 
                      />
                      <div>
                        <span className="text-sm font-semibold text-white font-sans block">{cust.name}</span>
                        <span className={`inline-flex px-1.5 py-0.5 rounded text-[8.5px] font-mono font-bold uppercase ${
                          cust.status === 'active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-gray-500/10 text-gray-400'
                        }`}>
                          {cust.status}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Email */}
                  <td className="p-4 text-gray-400">
                    {cust.email}
                  </td>

                  {/* Geography */}
                  <td className="p-4 font-sans text-white">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-3.5 h-3.5 text-brand-purple shrink-0" />
                      <span>{cust.city}, <strong>{cust.country}</strong></span>
                    </div>
                  </td>

                  {/* Join Date */}
                  <td className="p-4 text-gray-400">
                    {new Date(cust.joinedDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>

                  {/* Order volume */}
                  <td className="p-4 text-center font-bold text-white">
                    {cust.ordersCount} checkouts
                  </td>

                  {/* Lifecycle spend wallet */}
                  <td className="p-4 text-right text-brand-cyan font-bold text-sm">
                    ${cust.totalSpend.toFixed(2)}
                  </td>

                  {/* CRM Profiler trigger */}
                  <td className="p-4 text-right">
                    <button 
                      onClick={() => handleOpenProfileModal(cust)}
                      className="px-3 py-1.5 bg-white/5 border border-white/5 hover:border-brand-purple/20 hover:bg-white/10 text-brand-purple rounded-lg text-xs font-sans font-semibold flex items-center space-x-1.5 ml-auto transition-colors cursor-pointer"
                    >
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>CRM Profiler</span>
                    </button>
                  </td>
                </tr>
              ))}
              {currentCustomers.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-12 text-center text-gray-500 font-mono">
                    No customer directory records matched current queries.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION PANEL FOOTER */}
        <div className="p-4 border-t border-white/5 bg-white/5 flex items-center justify-between font-mono text-[11px] text-gray-400">
          <span>
            PAGE {currentPage} OF {totalPages} ({filteredCustomers.length} INDEXED USERS)
          </span>
          <div className="flex space-x-1.5 font-sans">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-2.5 py-1 bg-white/5 rounded hover:bg-white/10 text-white disabled:opacity-25 transition-opacity"
            >
              PREV
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-2.5 py-1 bg-white/5 rounded hover:bg-white/10 text-white disabled:opacity-25 transition-opacity"
            >
              NEXT
            </button>
          </div>
        </div>
      </div>

      {/* CRM PROFILE SLIDEOUT PANEL (MODAL) */}
      <AnimatePresence>
        {profileOpen && selectedCust && (
          <>
            {/* Modal backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setProfileOpen(false)}
              className="fixed inset-0 bg-black/75 z-50 cursor-pointer"
            />
            
            {/* Sheet frame panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              className={`fixed inset-y-8 md:inset-y-16 left-1/2 -translate-x-1/2 w-full max-w-xl bg-dark-900 border z-50 rounded-2xl p-6 overflow-hidden flex flex-col ${
                theme === 'dark' ? 'border-white/10 bg-dark-900 text-white animate-fade-in' : 'bg-white border-gray-200 text-gray-900'
              }`}
            >
              {/* Header heading info */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 shrink-0">
                <div className="flex items-center space-x-3 text-left">
                  <img 
                    src={selectedCust.avatar} 
                    alt={selectedCust.name} 
                    className="w-12 h-12 rounded-full border border-white/10 shrink-0 object-cover" 
                  />
                  <div>
                    <h2 className="font-display font-semibold text-lg text-white">{selectedCust.name}</h2>
                    <span className="text-[10px] text-gray-500 font-mono uppercase block">CLIENT ID: {selectedCust.id} • SYNC STABLE</span>
                  </div>
                </div>
                <button 
                  onClick={() => setProfileOpen(false)}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable details wrapper */}
              <div className="flex-1 overflow-y-auto space-y-6 py-6 text-left text-xs font-sans">
                
                {/* PROFILE METRICS */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3.5 bg-white/5 border border-white/5 rounded-xl space-y-1.5">
                    <span className="text-[9px] font-mono text-gray-500 tracking-wider block uppercase">LIFELONG CHECKOUT SPEND</span>
                    <p className="text-2xl font-bold font-display text-brand-cyan">${selectedCust.totalSpend.toFixed(2)}</p>
                    <div className="flex items-center space-x-1 font-mono text-[10px] text-gray-400">
                      <ShoppingBag className="w-3.5 h-3.5 text-brand-purple shrink-0 animate-pulse" />
                      <span>{selectedCust.ordersCount} invoices indexed</span>
                    </div>
                  </div>

                  <div className="p-3.5 bg-white/5 border border-white/5 rounded-xl space-y-1.5">
                    <span className="text-[9px] font-mono text-gray-500 tracking-wider block uppercase">ACCOUNT ATTRIBUTES</span>
                    <div className="font-semibold text-white space-y-1 mt-1">
                      <div className="flex items-center space-x-1">
                        <Map className="w-3.5 h-3.5 text-brand-purple shrink-0" />
                        <span>{selectedCust.city}, {selectedCust.country}</span>
                      </div>
                      <div className="flex items-center space-x-1 font-mono text-[10px] text-gray-400">
                        <Calendar className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                        <span>Joined: {selectedCust.joinedDate}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* HISTORICAL ACTIONS CHANNEL LOG CONTAINER */}
                <div className="space-y-3">
                  <h3 className="text-[10px] font-mono tracking-wider text-gray-400 uppercase font-bold flex items-center space-x-1.5">
                    <Activity className="w-3.5 h-3.5 text-brand-purple stroke-[2]" />
                    <span>Historical Actions Activity Log</span>
                  </h3>

                  <div className="border border-white/5 rounded-xl bg-dark-950/40 p-4 relative space-y-4">
                    {/* Visual Vertical Line */}
                    <div className="absolute top-6 bottom-6 left-8 w-px bg-white/5 z-0" />

                    {selectedCust.activityHistory.map((act) => (
                      <div key={act.id} className="flex space-x-4 relative z-10 text-left">
                        {/* Bullet Icon based on event type */}
                        <div className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 ${
                          act.type === 'order' ? 'bg-brand-cyan/15 border-brand-cyan/20 text-brand-cyan' :
                          act.type === 'support' ? 'bg-brand-purple/15 border-brand-purple/20 text-brand-purple' :
                          act.type === 'refund' ? 'bg-rose-500/15 border-rose-500/20 text-rose-300' :
                          'bg-gray-500/15 border-gray-500/20 text-gray-300'
                        }`}>
                          <Clock className="w-3.5 h-3.5 shrink-0" />
                        </div>

                        {/* Text explanation */}
                        <div className="space-y-0.5 flex-1 select-text">
                          <p className="text-white font-medium">{act.description}</p>
                          <span className="text-[10px] font-mono text-gray-500 block">
                            {new Date(act.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>
                    ))}
                    {selectedCust.activityHistory.length === 0 && (
                      <p className="text-center font-mono text-gray-500 py-6">Timeline empty.</p>
                    )}
                  </div>
                </div>

                {/* DIRECT SYSTEM CHECKS COMPILER STATUS */}
                <div className="p-3.5 rounded-xl border border-brand-cyan/15 bg-brand-cyan/5 text-[11px] leading-tight text-gray-400 font-mono flex items-center space-x-3">
                  <UserCheck className="w-5 h-5 text-brand-cyan shrink-0" />
                  <span>Verified email token address: <strong className="text-white select-all">{selectedCust.email}</strong>. Compliance logs verified under OECD regulations.</span>
                </div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
