/**
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Filter, 
  X, 
  Truck, 
  Calendar, 
  DollarSign, 
  CheckCircle2, 
  Package, 
  XCircle, 
  AlertCircle,
  Hash,
  Eye,
  Mail,
  RefreshCw,
  Clock,
  ArrowRight
} from 'lucide-react';
import { RootState } from '../redux/store';
import { 
  updateOrderStatus, 
  updateOrderTracking, 
  setOrderSearchTerm, 
  setOrderStatusFilter 
} from '../redux/slices/ordersSlice';
import { addNotification } from '../redux/slices/notificationsSlice';
import { Order } from '../types';

export default function OrdersPage() {
  const dispatch = useDispatch();
  const { items, searchTerm, statusFilter } = useSelector((state: RootState) => state.orders);
  const { theme } = useSelector((state: RootState) => state.settings);

  // States
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [trackingInput, setTrackingInput] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const statusToggles = ['All', 'pending', 'shipped', 'delivered', 'cancelled'];

  const handleSearchChangeLocal = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setOrderSearchTerm(e.target.value));
    setCurrentPage(1);
  };

  const filteredOrders = items.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage) || 1;
  const currentOrders = filteredOrders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleOpenDetailModal = (order: Order) => {
    setSelectedOrder(order);
    setTrackingInput(order.trackingNumber || '');
    setDetailOpen(true);
  };

  const handleUpdateStatusLocal = (status: Order['status']) => {
    if (!selectedOrder) return;
    
    // Write directly to Redux store
    dispatch(updateOrderStatus({ id: selectedOrder.id, status }));
    
    // Update local selected state
    setSelectedOrder({ ...selectedOrder, status });

    dispatch(addNotification({
      title: 'Order Status Revised',
      message: `Registry ${selectedOrder.orderNumber} status changed to "${status}".`,
      type: 'order'
    }));
  };

  const handleSaveTrackingLocal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder) return;

    dispatch(updateOrderTracking({ id: selectedOrder.id, trackingNumber: trackingInput }));
    setSelectedOrder({ ...selectedOrder, trackingNumber: trackingInput });

    dispatch(addNotification({
      title: 'Carrier Waybill Synced',
      message: `Order ${selectedOrder.orderNumber} carrier code updated to "${trackingInput}".`,
      type: 'system'
    }));
  };

  return (
    <div className="space-y-6 animate-fade-in relative">
      
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl tracking-tight text-white">Merchant Orders</h1>
          <p className="text-xs text-gray-500 font-mono font-mono">REGISTRY BOOKS • {filteredOrders.length} SHIPMENTS TRACKED</p>
        </div>
      </div>

      {/* FILTER BUTTON TABS */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Status Tab list */}
        <div className="flex bg-white/5 rounded-xl p-1 border border-white/5 max-w-full overflow-x-auto shrink-0">
          {statusToggles.map((st) => (
            <button
              key={st}
              onClick={() => {
                dispatch(setOrderStatusFilter(st));
                setCurrentPage(1);
              }}
              className={`px-3.5 py-2 text-xs font-semibold capitalize rounded-lg transition-all shrink-0 cursor-pointer ${
                statusFilter === st 
                  ? 'bg-gradient-to-r from-brand-cyan to-brand-purple text-dark-950 font-bold' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Searching text-field */}
        <div className="relative w-full md:w-80">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChangeLocal}
            className="w-full pl-9 pr-4 py-2.5 bg-dark-900 border border-white/5 rounded-xl text-xs font-mono text-white placeholder:text-gray-600 focus:outline-none focus:border-brand-cyan"
            placeholder="Search Order ID, Client, Email..."
          />
        </div>
      </div>

      {/* ORDERS SHEET TABLE */}
      <div className={`rounded-2xl border overflow-hidden ${
        theme === 'dark' ? 'glass-pane border-white/5' : 'bg-white border-gray-200'
      }`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-white/10 text-gray-400 uppercase tracking-widest bg-white/5 pb-2">
                <th className="p-4">ORDER ID</th>
                <th className="p-4">DATE & TIME</th>
                <th className="p-4">CUSTOMER NAME</th>
                <th className="p-4 text-right">TOTAL INVOICE</th>
                <th className="p-4 text-center">FULFILLMENT</th>
                <th className="p-4 text-center">CARRIER TRACKING</th>
                <th className="p-4 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono">
              {currentOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-white/5 transition-colors">
                  {/* Order ID */}
                  <td className="p-4 text-brand-cyan font-bold select-all hover:underline cursor-pointer" onClick={() => handleOpenDetailModal(ord)}>
                    {ord.orderNumber}
                  </td>
                  
                  {/* Date & clock */}
                  <td className="p-4 text-gray-400 font-sans">
                    {new Date(ord.date).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </td>

                  {/* Customer, contact mail */}
                  <td className="p-4 font-sans text-white">
                    <div className="font-semibold">{ord.customerName}</div>
                    <span className="text-[10px] text-gray-500 font-mono font-light">{ord.customerEmail}</span>
                  </td>

                  {/* Total Amount */}
                  <td className="p-4 text-right font-bold text-white text-sm">
                    ${ord.total.toFixed(2)}
                  </td>

                  {/* Fulfillment Status badge */}
                  <td className="p-4 text-center">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full font-sans text-[10px] font-bold capitalize select-none ${
                      ord.status === 'delivered' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                      ord.status === 'shipped' ? 'bg-brand-purple/10 text-brand-purple border border-brand-purple/20' :
                      ord.status === 'cancelled' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                      'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                    }`}>
                      {ord.status}
                    </span>
                  </td>

                  {/* Tracking status visual indicator */}
                  <td className="p-4 text-center">
                    {ord.trackingNumber ? (
                      <span className="px-2 py-0.5 bg-white/5 text-gray-300 rounded font-mono text-[10.5px]">
                        {ord.trackingNumber}
                      </span>
                    ) : (
                      <span className="text-gray-500 italic text-[10.5px]">N/A UNFULFILLED</span>
                    )}
                  </td>

                  {/* Detail inspect trigger */}
                  <td className="p-4 text-right">
                    <button 
                      onClick={() => handleOpenDetailModal(ord)}
                      className="px-3 py-1.5 bg-white/5 border border-white/5 hover:border-brand-cyan/20 hover:bg-white/10 text-brand-cyan rounded-lg text-xs font-sans font-semibold flex items-center space-x-1.5 ml-auto transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect</span>
                    </button>
                  </td>
                </tr>
              ))}
              {currentOrders.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-12 text-center text-gray-500 font-mono">
                    No order receipts matched current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION PANEL FOOTER */}
        <div className="p-4 border-t border-white/5 bg-white/5 flex items-center justify-between font-mono text-[11px] text-gray-400">
          <span>
            PAGE {currentPage} OF {totalPages} ({filteredOrders.length} RECEIPTS)
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

      {/* DETAILED ORDER INSPECTOR PANEL OVERLAY (MODAL) */}
      <AnimatePresence>
        {detailOpen && selectedOrder && (
          <>
            {/* Modal background glass backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setDetailOpen(false)}
              className="fixed inset-0 bg-black/70 z-50 cursor-pointer"
            />
            
            {/* Modal body sheet */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              className={`fixed inset-y-10 md:inset-y-16 left-1/2 -translate-x-1/2 w-full max-w-2xl bg-dark-900 border z-50 rounded-2xl p-6 overflow-hidden flex flex-col ${
                theme === 'dark' ? 'border-white/10 bg-dark-900' : 'bg-white border-gray-200 text-gray-900'
              }`}
            >
              {/* Top details heading */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 shrink-0">
                <div className="flex items-center space-x-3 text-left">
                  <div className="w-10 h-10 rounded-xl bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center text-brand-cyan">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-display font-semibold text-lg text-white">Invoice Sheets: {selectedOrder.orderNumber}</h2>
                    <span className="text-[10px] text-gray-500 font-mono uppercase block">{selectedOrder.id} • SYNC SUCCESS</span>
                  </div>
                </div>
                <button 
                  onClick={() => setDetailOpen(false)}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable specs frame */}
              <div className="flex-1 overflow-y-auto space-y-6 py-6 text-left text-xs font-sans">
                
                {/* DELIVER PROGRESS TRACKING FLOWS */}
                <div className="space-y-4">
                  <h3 className="text-[10px] font-mono tracking-wider text-gray-400 uppercase font-bold">Delivery Fulfillment Lifecycle</h3>
                  
                  {/* Status Steps visual pipeline */}
                  <div className="grid grid-cols-4 gap-2 text-center p-4 bg-dark-950/40 rounded-xl border border-white/5 relative">
                    {/* Status step 1 - Received */}
                    <div className="relative z-10">
                      <div className={`w-6 h-6 rounded-full mx-auto mb-1 flex items-center justify-center text-[10px] font-bold ${
                        selectedOrder.status !== 'cancelled' ? 'bg-emerald-500 text-dark-950' : 'bg-rose-500/20 text-rose-300'
                      }`}>
                        ✓
                      </div>
                      <span className="font-mono text-[10px] block font-semibold text-white">Received</span>
                      <span className="text-[9px] text-gray-500 block leading-none">Checkout secure</span>
                    </div>

                    {/* Status step 2 - Processing */}
                    <div className="relative z-10">
                      <div className={`w-6 h-6 rounded-full mx-auto mb-1 flex items-center justify-center text-[10px] font-bold ${
                        ['shipped', 'delivered'].includes(selectedOrder.status) 
                          ? 'bg-emerald-500 text-dark-950' 
                          : selectedOrder.status === 'pending' 
                            ? 'bg-yellow-500 text-dark-950 animate-pulse' 
                            : 'bg-white/5 text-gray-500'
                      }`}>
                        {['shipped', 'delivered'].includes(selectedOrder.status) ? '✓' : '2'}
                      </div>
                      <span className="font-mono text-[10px] block font-semibold text-white">Pending</span>
                      <span className="text-[9px] text-gray-500 block leading-none">Fulfillment deck</span>
                    </div>

                    {/* Status step 3 - Shipped */}
                    <div className="relative z-10">
                      <div className={`w-6 h-6 rounded-full mx-auto mb-1 flex items-center justify-center text-[10px] font-bold ${
                        selectedOrder.status === 'delivered' 
                          ? 'bg-emerald-500 text-dark-950' 
                          : selectedOrder.status === 'shipped' 
                            ? 'bg-brand-purple text-dark-950' 
                            : 'bg-white/5 text-gray-500'
                      }`}>
                        {selectedOrder.status === 'delivered' ? '✓' : '3'}
                      </div>
                      <span className="font-mono text-[10px] block font-semibold text-white">Transit</span>
                      <span className="text-[9px] text-gray-500 block leading-none">Carrier handover</span>
                    </div>

                    {/* Status step 4 - Completed */}
                    <div className="relative z-10">
                      <div className={`w-6 h-6 rounded-full mx-auto mb-1 flex items-center justify-center text-[10px] font-bold ${
                        selectedOrder.status === 'delivered' 
                          ? 'bg-emerald-500 text-dark-950' 
                          : 'bg-white/5 text-gray-500'
                      }`}>
                        {selectedOrder.status === 'delivered' ? '✓' : '4'}
                      </div>
                      <span className="font-mono text-[10px] block font-semibold text-white">Delivered</span>
                      <span className="text-[9px] text-gray-500 block leading-none">Signed recipient</span>
                    </div>
                  </div>
                </div>

                {/* METADATA METRICS */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
                    <span className="text-[9px] font-mono text-gray-500 tracking-wider block uppercase">Customer Details</span>
                    <p className="text-sm font-semibold text-white">{selectedOrder.customerName}</p>
                    <div className="space-y-1 font-mono text-[10.5px] text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Mail className="w-3 h-3 text-brand-cyan shrink-0" />
                        <span>{selectedOrder.customerEmail}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3 text-brand-purple shrink-0" />
                        <span>Date: {new Date(selectedOrder.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
                    <span className="text-[9px] font-mono text-gray-500 tracking-wider block uppercase">Payment Billing metrics</span>
                    <p className="text-sm font-semibold text-white">{selectedOrder.paymentMethod}</p>
                    <div className="space-y-1 font-mono text-[10.5px] text-gray-400">
                      <div className="flex items-center space-x-1">
                        <DollarSign className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Total: <strong>${selectedOrder.total.toFixed(2)}</strong></span>
                      </div>
                      <div className="flex items-center space-x-1 animate-pulse">
                        <Clock className="w-3 h-3 text-brand-cyan shrink-0" />
                        <span>State: <strong className="text-brand-cyan capitalize">{selectedOrder.status}</strong></span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CART ITEMS LIST */}
                <div className="space-y-2">
                  <h3 className="text-[10px] font-mono tracking-wider text-gray-400 uppercase font-bold">Shopping Cart items</h3>
                  <div className="border border-white/5 rounded-xl overflow-hidden divide-y divide-white/5 bg-dark-950/40">
                    {selectedOrder.items.map((item) => (
                      <div key={item.id} className="p-3.5 flex items-center justify-between text-left">
                        <div>
                          <p className="font-semibold text-white">{item.name}</p>
                          <span className="text-[10px] font-mono text-gray-500 block leading-none mt-1">PRODUCT SKU ID: {item.productId}</span>
                        </div>
                        <div className="text-right font-mono">
                          <p className="text-white text-xs font-semibold">{item.quantity}x @ ${item.price.toFixed(2)}</p>
                          <span className="text-[10.5px] text-brand-cyan font-bold block mt-1">${(item.quantity * item.price).toFixed(2)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* EDITING TRACKING AND STATUS PANEL */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Carrier updating forms */}
                  <form onSubmit={handleSaveTrackingLocal} className="p-4 bg-white/5 border border-white/5 rounded-xl space-y-2">
                    <span className="text-[9px] font-mono text-gray-500 tracking-wider block uppercase">Update Waybill Carrier</span>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={trackingInput}
                        onChange={(e) => setTrackingInput(e.target.value)}
                        className="flex-1 bg-dark-950 border border-white/10 rounded-lg px-3 py-1.5 font-mono text-xs text-white focus:outline-none"
                        placeholder="AE-TRK-7482..."
                      />
                      <button
                        type="submit"
                        className="px-4 py-1.5 bg-brand-cyan text-dark-950 font-bold font-mono text-xs rounded-lg hover:brightness-110 active:scale-[0.98] cursor-pointer"
                      >
                        SAVE
                      </button>
                    </div>
                  </form>

                  {/* Quick status selector */}
                  <div className="p-4 bg-white/5 border border-white/5 rounded-xl space-y-2">
                    <span className="text-[9px] font-mono text-gray-500 tracking-wider block uppercase">Quick Change Fulfillment</span>
                    <div className="grid grid-cols-2 gap-2 font-semibold">
                      <button
                        type="button"
                        onClick={() => handleUpdateStatusLocal('shipped')}
                        disabled={selectedOrder.status === 'shipped'}
                        className="p-1.5 rounded-lg border border-white/10 hover:border-brand-purple/20 text-brand-purple hover:bg-brand-purple/5 transition-all text-center text-[11px] font-mono disabled:opacity-20 cursor-pointer"
                      >
                        Handover Transit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleUpdateStatusLocal('delivered')}
                        disabled={selectedOrder.status === 'delivered'}
                        className="p-1.5 rounded-lg border border-white/10 hover:border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/5 transition-all text-center text-[11px] font-mono disabled:opacity-20 cursor-pointer"
                      >
                        Mark Delivered
                      </button>
                      <button
                        type="button"
                        onClick={() => handleUpdateStatusLocal('cancelled')}
                        disabled={selectedOrder.status === 'cancelled'}
                        className="p-1.5 rounded-lg border border-white/10 hover:border-rose-500/20 text-rose-300 hover:bg-rose-500/5 transition-all text-center text-[11px] font-mono disabled:opacity-20 col-span-2 cursor-pointer"
                      >
                        Cancel Transaction
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
