/**
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  DollarSign, 
  ShoppingBag, 
  Users, 
  Boxes, 
  ArrowUpRight, 
  ArrowDownRight, 
  Plus, 
  Activity, 
  Clock, 
  TrendingUp, 
  AlertOctagon,
  Sparkles,
  Zap,
  ArrowRight
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { RootState } from '../redux/store';
import { addOrder } from '../redux/slices/ordersSlice';
import { addNotification } from '../redux/slices/notificationsSlice';
import { addCustomerActivity, increaseCustomerSpend } from '../redux/slices/customersSlice';
import { updateProductStock } from '../redux/slices/productsSlice';
import { SALES_TRENDS, CATEGORY_DISTRIBUTION } from '../data/initialData';

export default function DashboardPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const products = useSelector((state: RootState) => state.products.items);
  const orders = useSelector((state: RootState) => state.orders.items);
  const customers = useSelector((state: RootState) => state.customers.items);
  const { theme } = useSelector((state: RootState) => state.settings);

  // Dynamic values based on current Redux state!
  const totalRevenue = orders
    .filter(o => o.status !== 'cancelled')
    .reduce((sum, o) => sum + o.total, 0);

  const activeProductsCount = products.filter(p => p.status === 'active').length;
  const totalOrdersCount = orders.length;
  const totalCustomersCount = customers.length;

  const COLORS = ['#6366f1', '#4f46e5', '#a78bfa', '#ec4899'];

  // SIMULATE NEW ORDER CHECKS!
  const handleSimulateCheckoutSync = () => {
    // Select random customer and random product
    const randomCustomer = customers[Math.floor(Math.random() * customers.length)];
    const activeProducts = products.filter(p => p.status === 'active');
    
    if (activeProducts.length === 0) return;
    const randomProduct = activeProducts[Math.floor(Math.random() * activeProducts.length)];
    
    const qty = Math.floor(Math.random() * 2) + 1;
    const price = randomProduct.price;
    const orderTotal = price * qty;
    const randOrderNum = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder = {
      id: `ord_${Date.now()}`,
      orderNumber: randOrderNum,
      customerName: randomCustomer.name,
      customerEmail: randomCustomer.email,
      date: new Date().toISOString(),
      total: orderTotal,
      status: 'pending' as const,
      items: [
        { id: `item_${Date.now()}`, productId: randomProduct.id, name: randomProduct.name, quantity: qty, price: price }
      ],
      paymentMethod: 'Credit Card (Simulated)',
      trackingNumber: `AE-TRK-${Math.floor(10000000 + Math.random() * 90000000)}`
    };

    // 1. Dispatch new order directly to Redux store
    dispatch(addOrder(newOrder));

    // 2. Add notification record
    dispatch(addNotification({
      title: 'Checkout Inbound Sync',
      message: `${randomCustomer.name} completed purchase of ${qty}x "${randomProduct.name}" for $${orderTotal.toFixed(2)}.`,
      type: 'order'
    }));

    // 3. Log customer action activity timeline
    dispatch(addCustomerActivity({
      customerId: randomCustomer.id,
      activity: {
        type: 'order',
        description: `Placed order ${randOrderNum} for ${randomProduct.name} (Value: $${orderTotal.toFixed(2)})`,
        date: new Date().toISOString()
      }
    }));

    // 4. Update customer aggregate monetary lifecycle value
    dispatch(increaseCustomerSpend({
      customerId: randomCustomer.id,
      amount: orderTotal
    }));

    // 5. Decrement physical stock
    if (randomProduct.stock >= qty) {
      dispatch(updateProductStock({
        id: randomProduct.id,
        stock: randomProduct.stock - qty
      }));
    }
  };

  const handleTriggerCriticalAlert = () => {
    dispatch(addNotification({
      title: 'Post API Gateway Sync Guard',
      message: 'Europe regional billing gateway has executed self-healing sandbox sync configurations.',
      type: 'alert'
    }));
  };

  return (
    <div className="space-y-6 animate-fade-in relative">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl tracking-tight">Executive Control Centre</h1>
          <p className="text-xs text-gray-500 font-mono">WORKSPACE REGISTRY STATE • SYSTEM ONLINE</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={handleSimulateCheckoutSync}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-500/20 active:scale-[0.98] transition-all flex items-center space-x-1.5 cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5 shrink-0 stroke-[2.5]" />
            <span>Simulate Sale Checkout</span>
          </button>
          
          <button 
            onClick={() => navigate('/admin/products')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
              theme === 'dark' ? 'bg-white/5 border-white/10 hover:bg-white/10 text-white' : 'bg-white border-gray-200 hover:bg-gray-100 text-gray-800'
            }`}
          >
            Manage Inventory
          </button>
        </div>
      </div>

      {/* METRIC CARD GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Metric Card 1: Revenue */}
        <div className={`p-5 rounded-2xl border transition-all ${
          theme === 'dark' ? 'glass-pane hover-glow border-white/5' : 'bg-white shadow-sm border-gray-100'
        }`}>
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-mono text-gray-500 tracking-wider">GROSS CHANNEL REVENUE</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3.5">
            <h2 className="text-3xl font-bold font-display tracking-tight text-white">${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
            <div className="flex items-center space-x-1 mt-1 text-xs font-mono">
              <span className="text-emerald-400 font-bold shrink-0 flex items-center">
                <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                +14.2%
              </span>
              <span className="text-gray-500">since last check</span>
            </div>
          </div>
        </div>

        {/* Metric Card 2: Orders */}
        <div className={`p-5 rounded-2xl border transition-all ${
          theme === 'dark' ? 'glass-pane hover-glow border-white/5' : 'bg-white shadow-sm border-gray-100'
        }`}>
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-mono text-gray-500 tracking-wider">COMPLETED REGISTRIES</span>
            <div className="w-8 h-8 rounded-lg bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center text-brand-cyan">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3.5">
            <h2 className="text-3xl font-semibold font-display tracking-tight text-white">{totalOrdersCount}</h2>
            <div className="flex items-center space-x-1 mt-1 text-xs font-mono">
              <span className="text-emerald-400 font-bold shrink-0 flex items-center">
                <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                +8.9%
              </span>
              <span className="text-gray-500">volume speed</span>
            </div>
          </div>
        </div>

        {/* Metric Card 3: Customers */}
        <div className={`p-5 rounded-2xl border transition-all ${
          theme === 'dark' ? 'glass-pane hover-glow border-white/5' : 'bg-white shadow-sm border-gray-100'
        }`}>
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-mono text-gray-500 tracking-wider">PEAK ACTIVE USERS</span>
            <div className="w-8 h-8 rounded-lg bg-brand-purple/10 border border-brand-purple/20 flex items-center justify-center text-brand-purple">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3.5">
            <h2 className="text-3xl font-semibold font-display tracking-tight text-white">{totalCustomersCount}</h2>
            <div className="flex items-center space-x-1 mt-1 text-xs font-mono">
              <span className="text-emerald-400 font-bold shrink-0 flex items-center">
                <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                +24.1%
              </span>
              <span className="text-gray-500">growth trend</span>
            </div>
          </div>
        </div>

        {/* Metric Card 4: Products */}
        <div className={`p-5 rounded-2xl border transition-all ${
          theme === 'dark' ? 'glass-pane hover-glow border-white/5' : 'bg-white shadow-sm border-gray-100'
        }`}>
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-mono text-gray-500 tracking-wider">ACTIVE INVENTORY SKUS</span>
            <div className="w-8 h-8 rounded-lg bg-brand-magenta/10 border border-brand-magenta/20 flex items-center justify-center text-brand-magenta">
              <Boxes className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3.5">
            <h2 className="text-3xl font-semibold font-display tracking-tight text-white">{activeProductsCount}</h2>
            <div className="flex items-center space-x-1 mt-1 text-xs font-mono">
              <span className="text-rose-400 font-bold shrink-0 flex items-center">
                <ArrowDownRight className="w-3.5 h-3.5 stroke-[2.5]" />
                -2.4%
              </span>
              <span className="text-gray-500">drafts compiled</span>
            </div>
          </div>
        </div>
      </div>

      {/* CHARTS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Dynamic Sales Trend Column Area Chart */}
        <div className={`col-span-1 lg:col-span-2 p-6 rounded-2xl border ${
          theme === 'dark' ? 'glass-pane border-white/5' : 'bg-white border-gray-100 shadow-sm'
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4 mb-4">
            <div>
              <h3 className="font-display font-semibold text-lg">Sales Revenue Trends</h3>
              <p className="text-xs text-gray-400">Timeseries projection from Europe regional webhooks</p>
            </div>
            <div className="flex space-x-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium font-mono bg-indigo-500/10 text-indigo-400">Revenue</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium font-mono bg-violet-500/10 text-violet-400">Profit margin</span>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={SALES_TRENDS} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme === 'dark' ? '#1f2937' : '#e5e7eb'} />
                <XAxis dataKey="date" stroke="#9ca3af" fontSize={10} fontStyle="italic" />
                <YAxis stroke="#9ca3af" fontSize={10} />
                <Tooltip 
                  contentStyle={
                    theme === 'dark' 
                      ? { backgroundColor: '#18181b', borderColor: 'rgba(255,255,255,0.06)', borderRadius: '12px', color: '#fff' } 
                      : { backgroundColor: '#ffffff', borderColor: '#e5e7eb', borderRadius: '12px' }
                  } 
                />
                <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
                <Area type="monotone" dataKey="profit" stroke="#8b5cf6" strokeWidth={2} fillOpacity={1} fill="url(#colorProfit)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Dynamic Category Share Circle Chart */}
        <div className={`p-6 rounded-2xl border ${
          theme === 'dark' ? 'glass-pane border-white/5' : 'bg-white border-gray-100 shadow-sm'
        }`}>
          <div className="border-b border-white/5 pb-4 mb-4">
            <h3 className="font-display font-semibold text-lg">Category Distribution</h3>
            <p className="text-xs text-gray-400">Total metrics split across product fields</p>
          </div>

          <div className="h-56 w-full flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={CATEGORY_DISTRIBUTION}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {CATEGORY_DISTRIBUTION.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={
                    theme === 'dark' 
                      ? { backgroundColor: '#18181b', borderColor: 'rgba(255,255,255,0.06)', borderRadius: '12px', color: '#fff' } 
                      : { backgroundColor: '#ffffff', borderColor: '#e5e7eb', borderRadius: '12px' }
                  } 
                />
              </PieChart>
            </ResponsiveContainer>
            
            {/* Direct Central Label */}
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-2xl font-bold font-display text-white">100%</span>
              <span className="text-[9px] font-mono text-gray-500 uppercase">Sync ratio</span>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            {CATEGORY_DISTRIBUTION.map((cat, i) => (
              <div key={cat.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: COLORS[i] }} />
                  <span className="text-gray-400">{cat.name}</span>
                </div>
                <span className="font-bold font-mono text-white">{cat.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RECENT ORDERS TABLE & ADMIN CONTROLS PALETTE */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* RECENT TRANSACTIONS CONTAINER */}
        <div className={`lg:col-span-2 p-6 rounded-2xl border ${
          theme === 'dark' ? 'glass-pane border-white/5' : 'bg-white border-gray-100 shadow-sm'
        }`}>
          <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
            <div>
              <h3 className="font-display font-semibold text-lg">Inbound Checkout Queues</h3>
              <p className="text-xs text-gray-400">Live transaction sync details</p>
            </div>
            <button 
              onClick={() => navigate('/admin/orders')}
              className="text-xs font-mono text-brand-cyan flex items-center space-x-1 hover:underline cursor-pointer"
            >
              <span>See Full Register</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-white/5 text-gray-500 uppercase tracking-widest pb-2 block sm:table-row">
                  <th className="py-2.5">ORDER ID</th>
                  <th className="py-2.5">CUSTOMER</th>
                  <th className="py-2.5 hidden sm:table-cell">DATE</th>
                  <th className="py-2.5 text-right">TOTAL</th>
                  <th className="py-2.5 text-right">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {orders.slice(0, 4).map((order) => (
                  <tr key={order.id} className="hover:bg-white/5 transition-colors block sm:table-row py-2 sm:py-0">
                    <td className="py-3 text-brand-cyan select-all hover:underline cursor-pointer" onClick={() => navigate('/admin/orders')}>
                      {order.orderNumber}
                    </td>
                    <td className="py-3 font-sans text-white font-medium">{order.customerName}</td>
                    <td className="py-3 text-gray-500 hidden sm:table-cell">
                      {new Date(order.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="py-3 text-right font-bold text-white">${order.total.toFixed(2)}</td>
                    <td className="py-3 text-right">
                      <span className={`inline-flex px-2 py-0.5 rounded-full font-sans text-[10px] font-bold capitalize select-none ${
                        order.status === 'delivered' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                        order.status === 'shipped' ? 'bg-brand-purple/10 text-brand-purple border border-brand-purple/20' :
                        order.status === 'cancelled' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                        'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* SYSTEM CONTROL PALETTE */}
        <div className={`p-6 rounded-2xl border ${
          theme === 'dark' ? 'glass-pane border-white/5' : 'bg-white border-gray-100 shadow-sm'
        }`}>
          <div className="border-b border-white/5 pb-4 mb-4">
            <h3 className="font-display font-semibold text-lg font-display">Administrative Actions</h3>
            <p className="text-xs text-gray-400">Trigger simulated platform events</p>
          </div>

          <div className="space-y-4">
            {/* Simulate order trigger widget button */}
            <div className="p-3.5 rounded-xl bg-gradient-to-tr from-brand-cyan/20 to-brand-purple/5 border border-brand-cyan/30 text-left flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-semibold text-brand-cyan font-mono flex items-center space-x-1 leading-none mb-1">
                  <Activity className="w-3.5 h-3.5 fill-brand-cyan/35 stroke-[2]" />
                  <span>SYNCHRONOUS SIMULATION</span>
                </h4>
                <p className="text-[11px] text-gray-400 leading-tight">
                  Simulate live Stripe transactions, process ledger lines, adjust actual shelf-stock counts, and trace in Orders.
                </p>
              </div>
              <button
                onClick={handleSimulateCheckoutSync}
                className="mt-3 py-2 w-full text-center text-[11px] font-mono rounded bg-brand-cyan text-dark-950 font-extrabold shadow hover:brightness-115 active:scale-[0.99] transition-all cursor-pointer"
              >
                Trigger Inbound Order Event
              </button>
            </div>

            {/* Simulated warnings trigger action */}
            <div className="space-y-2">
              <button
                onClick={handleTriggerCriticalAlert}
                className="w-full p-2 bg-rose-500/10 hover:bg-rose-500/15 border border-rose-500/20 text-rose-300 rounded-xl text-xs font-mono text-left flex items-center justify-between transition-colors cursor-pointer"
              >
                <span>Trigger Critical System Alert</span>
                <AlertOctagon className="w-4 h-4 text-rose-400 shrink-0" />
              </button>
              
              <button
                onClick={() => navigate('/admin/settings')}
                className="w-full p-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-xs font-mono text-left flex items-center justify-between text-gray-300 transition-colors cursor-pointer"
              >
                <span>Run System Diagnostics</span>
                <Clock className="w-4 h-4 text-gray-400 shrink-0" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
