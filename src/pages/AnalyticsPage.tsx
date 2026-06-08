/**
 * SPDX-License-Identifier: Apache-2.0
 */

import { useSelector } from 'react-redux';
import { motion } from 'motion/react';
import { 
  LineChart as RechartsLineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  ShoppingBag, 
  ArrowUpRight,
  Activity,
  Globe
} from 'lucide-react';
import { RootState } from '../redux/store';
import { SALES_TRENDS, USER_GROWTH, CATEGORY_DISTRIBUTION } from '../data/initialData';

export default function AnalyticsPage() {
  const { theme } = useSelector((state: RootState) => state.settings);
  const orders = useSelector((state: RootState) => state.orders.items);
  const products = useSelector((state: RootState) => state.products.items);

  const COLORS = ['#06b6d4', '#8b5cf6', '#ec4899', '#f59e0b'];

  // Financial calculations
  const totalInvoicedValue = orders
    .filter(o => o.status !== 'cancelled')
    .reduce((sum, o) => sum + o.total, 0);

  const averageGrossOrderValue = orders.length 
    ? (totalInvoicedValue / orders.length) 
    : 0;

  // Render product performance datasets based on Redux state
  const topProductsChartData = products
    .slice()
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 5)
    .map(p => ({
      name: p.name.length > 15 ? `${p.name.substring(0, 15)}...` : p.name,
      SalesVolume: p.sales,
      TotalRevenue: p.sales * p.price
    }));

  return (
    <div className="space-y-6 animate-fade-in relative">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl tracking-tight text-white">Platform Analytics</h1>
          <p className="text-xs text-gray-500 font-mono">FINANCIAL REPORTS • TIMESERIES DATASHEETS</p>
        </div>
      </div>

      {/* HIGHER DENSITY ANALYTICS CARD GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className={`p-4 rounded-xl border flex items-center space-x-4 ${
          theme === 'dark' ? 'bg-dark-900/60 border-white/5 text-white' : 'bg-white border-gray-200'
        }`}>
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-gray-400 block uppercase">TOTAL REVENUE BOOKS</span>
            <p className="text-xl font-bold font-display">${totalInvoicedValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          </div>
        </div>

        <div className={`p-4 rounded-xl border flex items-center space-x-4 ${
          theme === 'dark' ? 'bg-dark-900/60 border-white/5 text-white' : 'bg-white border-gray-200'
        }`}>
          <div className="w-10 h-10 rounded-lg bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center text-brand-cyan shrink-0">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-gray-400 block uppercase">MEDIAN ORDER SIZE ($)</span>
            <p className="text-xl font-bold font-display">${averageGrossOrderValue.toFixed(2)}</p>
          </div>
        </div>

        <div className={`p-4 rounded-xl border flex items-center space-x-4 ${
          theme === 'dark' ? 'bg-dark-900/60 border-white/5 text-white' : 'bg-white border-gray-200'
        }`}>
          <div className="w-10 h-10 rounded-lg bg-brand-purple/10 border border-brand-purple/20 flex items-center justify-center text-brand-purple shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-gray-400 block uppercase">AVERAGE WEBHOOK STABILITY</span>
            <p className="text-xl font-bold font-display text-emerald-400">99.98% SLA</p>
          </div>
        </div>
      </div>

      {/* CHARTS ROW 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* CHART A: REVENUE & PROFITS TIMESERIES */}
        <div className={`p-6 rounded-2xl border ${
          theme === 'dark' ? 'glass-pane border-white/5' : 'bg-white border-gray-200 shadow-sm'
        }`}>
          <div className="border-b border-white/5 pb-4 mb-4 text-left">
            <h3 className="font-display font-semibold text-lg text-white">Revenue & Profit Margins</h3>
            <p className="text-xs text-gray-500">Gross channel earnings relative to product production costs</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={SALES_TRENDS} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradientRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="gradientProfit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme === 'dark' ? '#1f293d' : '#e5e7eb'} />
                <XAxis dataKey="date" stroke="#9ca3af" fontSize={10} fontStyle="italic" />
                <YAxis stroke="#9ca3af" fontSize={10} />
                <Tooltip 
                  contentStyle={
                    theme === 'dark' 
                      ? { backgroundColor: '#070a13', borderColor: '#1f293d', borderRadius: '12px' } 
                      : { backgroundColor: '#ffffff', borderColor: '#e5e7eb', borderRadius: '12px' }
                  } 
                />
                <Area type="monotone" dataKey="revenue" name="Gross Revenue" stroke="#06b6d4" strokeWidth={2.5} fillOpacity={1} fill="url(#gradientRevenue)" />
                <Area type="monotone" dataKey="profit" name="Net Profit" stroke="#8b5cf6" strokeWidth={2.5} fillOpacity={1} fill="url(#gradientProfit)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CHART B: USER GROW SOFTWARE SEATS */}
        <div className={`p-6 rounded-2xl border ${
          theme === 'dark' ? 'glass-pane border-white/5' : 'bg-white border-gray-200 shadow-sm'
        }`}>
          <div className="border-b border-white/5 pb-4 mb-4 text-left">
            <h3 className="font-display font-semibold text-lg text-white">Merchant User Registrations</h3>
            <p className="text-xs text-gray-500">Peak monthly user subscriber intervals compiled</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart data={USER_GROWTH} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme === 'dark' ? '#1f293d' : '#e5e7eb'} />
                <XAxis dataKey="month" stroke="#9ca3af" fontSize={10} />
                <YAxis stroke="#9ca3af" fontSize={10} />
                <Tooltip 
                  contentStyle={
                    theme === 'dark' 
                      ? { backgroundColor: '#070a13', borderColor: '#1f293d', borderRadius: '12px' } 
                      : { backgroundColor: '#ffffff', borderColor: '#e5e7eb', borderRadius: '12px' }
                  } 
                />
                <Line type="monotone" dataKey="users" name="Active Subscribers" stroke="#8b5cf6" strokeWidth={3} dot={{ stroke: '#8b5cf6', strokeWidth: 2 }} />
              </RechartsLineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* CHARTS ROW 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* CHART C: TOP PRODUCTS BAR CHART */}
        <div className={`lg:col-span-2 p-6 rounded-2xl border ${
          theme === 'dark' ? 'glass-pane border-white/5' : 'bg-white border-gray-200 shadow-sm'
        }`}>
          <div className="border-b border-white/5 pb-4 mb-4 text-left">
            <h3 className="font-display font-semibold text-lg text-white">Top 5 SKU Performances</h3>
            <p className="text-xs text-gray-500">Aggregated sales quantity volumes per inventory SKU reference</p>
          </div>

          <div className="h-60 w-full animate-fade-in">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topProductsChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme === 'dark' ? '#1f293d' : '#e5e7eb'} />
                <XAxis dataKey="name" stroke="#9ca3af" fontSize={9} />
                <YAxis stroke="#9ca3af" fontSize={10} />
                <Tooltip 
                  contentStyle={
                    theme === 'dark' 
                      ? { backgroundColor: '#070a13', borderColor: '#1f293d', borderRadius: '12px' } 
                      : { backgroundColor: '#ffffff', borderColor: '#e5e7eb', borderRadius: '12px' }
                  } 
                />
                <Bar dataKey="SalesVolume" name="Items Sold" fill="#ec4899" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CHART D: CATEGORY SHARE PIE */}
        <div className={`p-6 rounded-2xl border ${
          theme === 'dark' ? 'glass-pane border-white/5' : 'bg-white border-gray-200 shadow-sm'
        }`}>
          <div className="border-b border-white/5 pb-4 mb-4 text-left">
            <h3 className="font-display font-semibold text-lg text-white">Category Distribution Ratio</h3>
            <p className="text-xs text-gray-500">Segment metrics percentage share totals</p>
          </div>

          <div className="h-44 w-full flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={CATEGORY_DISTRIBUTION}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={65}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {CATEGORY_DISTRIBUTION.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={
                    theme === 'dark' 
                      ? { backgroundColor: '#070a13', borderColor: '#1f293d', borderRadius: '12px' } 
                      : { backgroundColor: '#ffffff', borderColor: '#e5e7eb', borderRadius: '12px' }
                  } 
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute text-center">
              <span className="text-xl font-bold font-display text-white">3 Units</span>
              <span className="text-[9px] block font-mono text-gray-500">Categories</span>
            </div>
          </div>

          <div className="space-y-1.5 pt-4 text-left">
            {CATEGORY_DISTRIBUTION.map((cat, i) => (
              <div key={cat.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full inline-block shrink-0" style={{ backgroundColor: COLORS[i] }} />
                  <span className="text-gray-400 truncate max-w-32">{cat.name}</span>
                </div>
                <span className="font-bold font-mono text-white">{cat.value}%</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
