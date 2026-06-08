/**
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  Shield, 
  Zap, 
  TrendingUp, 
  Sparkles, 
  Layers, 
  Cpu, 
  Globe, 
  LineChart, 
  ShoppingBag, 
  Users, 
  Activity, 
  CheckCircle2, 
  ExternalLink 
} from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'analytics' | 'fulfillment' | 'customers'>('analytics');
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      name: 'Lite Startup',
      price: selectedPlan === 'monthly' ? 29 : 22,
      features: [
        'Up to 10,000 monthly orders',
        'Standard Postgres schema logs',
        'Standard sales performance metrics',
        'Standard e-mail merchant updates',
        '2 Admin user licenses included'
      ],
      popular: false,
      cta: 'Start Demo'
    },
    {
      name: 'Aether Enterprise',
      price: selectedPlan === 'monthly' ? 89 : 68,
      features: [
        'Unlimited global orders',
        'Real-time automated webhook sync',
        'Custom interactive telemetry widgets',
        'Instant serverless database integration',
        '10 Admin user licenses included',
        '24/7 Priority developer support'
      ],
      popular: true,
      cta: 'Explore Sandbox'
    },
    {
      name: 'Global Scale',
      price: selectedPlan === 'monthly' ? 249 : 190,
      features: [
        'Multi-region high-availability replication',
        'Full Stripe & custom checkout adapters',
        'Unlimited Admin seats & roles',
        'Dedicated server-side API proxy routing',
        'Custom training & setup guides'
      ],
      popular: false,
      cta: 'Contact Merchant Ops'
    }
  ];

  return (
    <div className="min-h-screen bg-dark-950 text-white aurora-bg relative font-sans selection:bg-brand-cyan/30 selection:text-brand-cyan">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md border-b border-white/5 bg-dark-950/80 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/25 text-white">
              <Sparkles className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <span className="font-display font-bold text-xl tracking-tight text-white uppercase">Aether Suite</span>
              <span className="text-[10px] font-mono block text-slate-400 uppercase tracking-widest leading-none mt-0.5">SaaS Operating System</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-8 text-sm text-gray-400">
            <a href="#features" className="hover:text-white transition-colors">Framework</a>
            <a href="#telemetry" className="hover:text-white transition-colors">Telemetry</a>
            <a href="#pricing" className="hover:text-white transition-colors">Ecosystem Plans</a>
            <div className="w-px h-4 bg-white/10" />
            <span className="text-brand-cyan font-mono text-xs cursor-pointer hover:underline" onClick={() => navigate('/admin/dashboard')}>
              Instant Sandbox Demo &rarr;
            </span>
          </nav>

          <div className="flex items-center space-x-4">
            <button 
              onClick={() => navigate('/login')} 
              className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors hover:bg-white/5 rounded-lg cursor-pointer"
            >
              Sign In
            </button>
            <button 
              onClick={() => navigate('/admin/dashboard')}
              className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-indigo-500/25 cursor-pointer"
            >
              Platform Sandbox
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 px-6 text-center max-w-5xl mx-auto z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-brand-cyan font-mono">
            <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse" />
            <span>VERSION 4.2 LIVE — EXPEDITED CHECKOUT & TELEMETRY</span>
          </div>

          <h1 className="font-display font-extrabold text-5xl md:text-7xl leading-none tracking-tight text-white mb-2">
            The Complete OS for <br />
            <span className="bg-gradient-to-r from-indigo-400 via-indigo-205 to-white bg-clip-text text-transparent">
              High-Velocity E-Commerce
            </span>
          </h1>

          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-light">
            An award-winning SaaS management system engineered for performance sellers on Upwork, Fiverr, and Shopify. Features glassmorphism dark telemetry, fully interactive database controls, and intelligent metrics monitoring.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <button 
              onClick={() => navigate('/admin/dashboard')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-dark-950 font-bold hover:bg-gray-100 transition-colors flex items-center justify-center space-x-3 shadow-lg shadow-white/10 cursor-pointer"
            >
              <span>Launch Live Dashboard</span>
              <ArrowRight className="w-5 h-5 stroke-[2.5]" />
            </button>
            <button 
              onClick={() => navigate('/register')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-colors"
            >
              Register Merchant Slot
            </button>
          </div>
        </motion.div>

        {/* Dynamic Telemetry Showcase Preview */}
        <motion.div 
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-16 rounded-2xl glass-pane p-1 shadow-2xl relative border-white/10 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-dark-950 z-10 pointer-events-none" />
          
          <div className="bg-dark-900 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between border border-white/5 z-0 relative">
            {/* Minimal Dashboard Mock Sidebar */}
            <div className="w-full md:w-1/4 p-4 text-left border-b md:border-b-0 md:border-r border-white/5 space-y-3">
              <div className="h-6 w-32 bg-white/10 rounded" />
              <div className="space-y-2 pt-4">
                <div className="h-4 bg-brand-cyan/20 border-l-2 border-brand-cyan rounded p-2 flex items-center justify-between">
                  <div className="h-2 w-16 bg-brand-cyan/40 rounded" />
                  <Activity className="w-3 text-brand-cyan" />
                </div>
                <div className="h-8 bg-white/5 rounded" />
                <div className="h-8 bg-white/5 rounded" />
                <div className="h-8 bg-white/5 rounded" />
              </div>
            </div>

            {/* Dynamic Preview Area */}
            <div className="w-full md:w-3/4 p-6 text-left space-y-6">
              {/* Header inside simulation */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display font-medium text-lg">Sales & Conversions Rate</h3>
                  <p className="text-xs text-gray-500">Live operational data flow streams</p>
                </div>
                <div className="px-3 py-1 bg-brand-cyan/10 rounded-full text-[10px] text-brand-cyan font-mono border border-brand-cyan/20">
                  REFRESH RATE: 12MS
                </div>
              </div>

              {/* Grid of quick metrics */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                  <span className="text-xs text-gray-500 font-mono">REVENUE</span>
                  <p className="text-2xl font-bold font-display text-brand-cyan">$189,450</p>
                  <span className="text-[10px] text-emerald-400 font-mono">+12.4% this wk</span>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                  <span className="text-xs text-gray-500 font-mono">CONVERSION</span>
                  <p className="text-2xl font-bold font-display text-brand-purple">4.82%</p>
                  <span className="text-[10px] text-emerald-400 font-mono">+0.8% increase</span>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                  <span className="text-xs text-gray-500 font-mono">ACTIVE SEATS</span>
                  <p className="text-2xl font-bold font-display text-white">12,450</p>
                  <span className="text-[10px] text-brand-cyan font-mono">Live now</span>
                </div>
              </div>

              {/* Mock Bar columns */}
              <div className="h-24 bg-white/5 rounded-xl border border-white/5 p-4 flex items-end justify-between space-x-2">
                {[40, 60, 45, 90, 70, 100, 85, 120, 105, 130, 95].map((h, i) => (
                  <div key={i} className="flex-1 bg-white/5 rounded-t relative group" style={{ height: '100%' }}>
                    <div 
                      className="absolute bottom-0 w-full rounded-t bg-gradient-to-t from-brand-cyan/80 to-brand-purple/80 hover:brightness-125 transition-all"
                      style={{ height: `${(h / 140) * 100}%` }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Main SaaS Value Bento Section */}
      <section id="features" className="py-24 px-6 max-w-7xl mx-auto space-y-16 border-t border-white/5 relative z-10">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h2 className="font-display font-bold text-3xl md:text-5xl tracking-tight">
            Architected for Elite Merchant Operations
          </h2>
          <p className="text-gray-400 text-base">
            No bloated dependencies, no stale cache logs. Just pure performance-focused, glassmorphism telemetry designed to elevate client work.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="glass-pane p-8 rounded-2xl hover-glow space-y-4 relative border-white/10">
            <div className="w-12 h-12 rounded-xl bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center text-brand-cyan">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="font-display font-semibold text-xl">Full Redux architecture</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Equipped with fully integrated Redux Toolkit configurations, action handlers, and persistent state selectors powering immediate reactivity.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="glass-pane p-8 rounded-2xl hover-glow space-y-4 relative border-white/10">
            <div className="w-12 h-12 rounded-xl bg-brand-purple/10 border border-brand-purple/20 flex items-center justify-center text-brand-purple">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="font-display font-semibold text-xl">Protected Auth Gates</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Features full mock JWT token authentication states, responsive custom register gates, and strict route blocking setups safeguarding administrative data.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="glass-pane p-8 rounded-2xl hover-glow space-y-4 relative border-white/10">
            <div className="w-12 h-12 rounded-xl bg-brand-magenta/10 border border-brand-magenta/20 flex items-center justify-center text-brand-magenta">
              <LineChart className="w-6 h-6" />
            </div>
            <h3 className="font-display font-semibold text-xl">Interactive Charts</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Beautifully rendered vector area, line, pie, and bar visualizations via Recharts reporting total revenues, customer registrations, and specific item margins.
            </p>
          </div>
        </div>
      </section>

      {/* Dynamic Telemetry Showcase Tabs */}
      <section id="telemetry" className="py-20 px-6 max-w-7xl mx-auto space-y-12 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between border-b border-white/10 pb-6">
          <div>
            <h2 className="font-display font-bold text-2xl md:text-4xl text-left">The Interactive Engine Sandbox</h2>
            <p className="text-gray-400 text-sm">Explore live component simulations without installing node packages</p>
          </div>
          <div className="flex bg-white/5 rounded-lg p-1 mt-4 md:mt-0 border border-white/5">
            {(['analytics', 'fulfillment', 'customers'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-xs font-semibold capitalize rounded-md transition-colors ${
                  activeTab === tab 
                    ? 'bg-gradient-to-r from-brand-cyan to-brand-purple text-dark-950 font-bold' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab contents (interactive preview UI cards) */}
        <div className="glass-pane rounded-2xl p-8 border-white/10">
          {activeTab === 'analytics' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4 text-left">
                <span className="text-brand-cyan font-mono text-xs uppercase tracking-wider">LIVE TELEMETRY FEED</span>
                <h3 className="font-display font-semibold text-2xl">Recharts Analytics Panel</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Deep engagement data. Track item sell-through ratios, and real-time net-profit margins. Responsive legends adapt flawlessly to dynamic screen filters.
                </p>
                <div className="space-y-2 font-mono text-xs text-gray-500">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-cyan shrink-0" />
                    <span>Configured for custom viewport bounds</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-cyan shrink-0" />
                    <span>Auto-interpolating tooltips included</span>
                  </div>
                </div>
              </div>
              <div className="bg-dark-900 rounded-xl p-6 border border-white/5 space-y-4">
                <div className="flex justify-between items-center border-b border-white/5 pb-3">
                  <span className="text-xs text-gray-400 font-mono">ANALYTICS PREVIEW</span>
                  <span className="text-[10px] text-green-400 bg-green-400/15 px-2 py-0.5 rounded-full font-mono font-bold uppercase tracking-wider">ONLINE</span>
                </div>
                {/* Simulated Chart visual bars */}
                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-mono text-gray-400">
                      <span>Store Sales Velocity</span>
                      <span>+124%</span>
                    </div>
                    <div className="w-full bg-white/5 h-2.5 rounded-full overflow-hidden border border-white/5">
                      <div className="bg-brand-cyan h-full rounded-full transition-all duration-1000" style={{ width: '84%' }} />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-mono text-gray-400">
                      <span>Checkout Margin Performance</span>
                      <span>+45%</span>
                    </div>
                    <div className="w-full bg-white/5 h-2.5 rounded-full overflow-hidden border border-white/5">
                      <div className="bg-brand-purple h-full rounded-full transition-all duration-1000" style={{ width: '65%' }} />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-mono text-gray-400">
                      <span>Conversion Efficiency</span>
                      <span>+89%</span>
                    </div>
                    <div className="w-full bg-white/5 h-2.5 rounded-full overflow-hidden border border-white/5">
                      <div className="bg-brand-magenta h-full rounded-full transition-all duration-1000" style={{ width: '78%' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'fulfillment' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4 text-left">
                <span className="text-brand-purple font-mono text-xs uppercase tracking-wider">SECURE ORDER HUB</span>
                <h3 className="font-display font-semibold text-2xl">Automatic Status Logistics</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Manage e-commerce orders. Automatically track delivery transitions. Set states to pending, shipped, delivered, or cancelled instantly using the live admin desk control.
                </p>
                <div className="space-y-2 font-mono text-xs text-gray-500">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-purple shrink-0" />
                    <span>Comprehensive multi-field searching index</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-purple shrink-0" />
                    <span>Real-time shipping progress tracker</span>
                  </div>
                </div>
              </div>
              <div className="bg-dark-900 rounded-xl p-6 border border-white/5 space-y-4">
                <div className="flex justify-between items-center border-b border-white/5 pb-3">
                  <span className="text-xs text-brand-purple font-mono">STATUS COMPILER</span>
                  <span className="text-xs text-gray-400">#ORD-8819</span>
                </div>
                <div className="space-y-4">
                  {/* Status track visuals */}
                  <div className="flex items-center justify-between font-mono text-[10px] text-gray-500">
                    <div className="text-center">
                      <div className="w-5 h-5 bg-brand-purple text-dark-950 font-bold rounded-full flex items-center justify-center mx-auto mb-1">✓</div>
                      <span>Pending</span>
                    </div>
                    <div className="h-0.5 bg-brand-purple flex-1 mx-2" />
                    <div className="text-center">
                      <div className="w-5 h-5 bg-brand-purple text-dark-950 font-bold rounded-full flex items-center justify-center mx-auto mb-1">✓</div>
                      <span>Shipped</span>
                    </div>
                    <div className="h-0.5 bg-white/10 flex-1 mx-2" />
                    <div className="text-center opacity-55">
                      <div className="w-5 h-5 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-1">3</div>
                      <span>Delivered</span>
                    </div>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg border border-white/5 text-xs text-gray-400 font-mono flex items-center justify-between">
                    <span>TRACKING CODE:</span>
                    <span className="text-brand-purple select-all hover:underline cursor-pointer">AE-TRK-98310022</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'customers' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4 text-left">
                <span className="text-brand-magenta font-mono text-xs uppercase tracking-wider">CRM SYSTEM SEATS</span>
                <h3 className="font-display font-semibold text-2xl">High-Fidelity Shopper Records</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Analyze specific customer trends, aggregate lifespans, historical action trails, search patterns, and filter cities dynamically. Designed to optimize marketing retention campaigns.
                </p>
                <div className="space-y-2 font-mono text-xs text-gray-500">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-magenta shrink-0" />
                    <span>Real country map coordinates indicators</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-magenta shrink-0" />
                    <span>Dynamic spending counters tied to order registries</span>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { name: 'Evelyn Sterling', spend: '$1,542.00', city: 'San Francisco', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80' },
                  { name: 'Sora Takahashi', spend: '$2,432.00', city: 'Tokyo', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80' }
                ].map((item, id) => (
                  <div key={id} className="bg-dark-900 border border-white/5 p-4 rounded-xl flex items-center justify-between text-left">
                    <div className="flex items-center space-x-3">
                      <img src={item.img} alt={item.name} className="w-10 h-10 rounded-full border border-white/10 shrink-0" />
                      <div>
                        <h4 className="text-sm font-semibold">{item.name}</h4>
                        <span className="text-xs text-gray-500 font-mono">{item.city}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-brand-magenta font-mono">{item.spend}</p>
                      <span className="text-[10px] text-gray-500">Total Spend</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-6 max-w-7xl mx-auto space-y-16 relative z-10 border-t border-white/5">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h2 className="font-display font-bold text-3xl md:text-5xl tracking-tight">Flexible Developer Ecosystem Pricing</h2>
          <p className="text-gray-400 text-sm">
            Whether launching on Upwork/Fiverr with initial client work or scaling multiple client instances, we provide elite plans.
          </p>

          {/* Monthly/Yearly toggle option */}
          <div className="inline-flex bg-white/5 rounded-lg p-1 mt-6 border border-white/10">
            <button
              onClick={() => setSelectedPlan('monthly')}
              className={`px-4 py-1.5 rounded-md text-xs font-semibold uppercase transition-colors ${
                selectedPlan === 'monthly' ? 'bg-white text-dark-950 font-bold' : 'text-gray-400 hover:text-white'
              }`}
            >
              Monthly billing
            </button>
            <button
              onClick={() => setSelectedPlan('yearly')}
              className={`px-4 py-1.5 rounded-md text-xs font-semibold uppercase transition-colors ${
                selectedPlan === 'yearly' ? 'bg-white text-dark-950 font-bold' : 'text-gray-400 hover:text-white'
              }`}
            >
              Yearly discount (-25%)
            </button>
          </div>
        </div>

        {/* Dynamic Pricing Grid cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((p, idx) => (
            <div 
              key={idx}
              className={`rounded-2xl p-8 glass-pane border-white/10 flex flex-col justify-between relative hover-glow opacity-95 hover:opacity-100 ${
                p.popular ? 'border-brand-cyan shadow-xl shadow-brand-cyan/5' : ''
              }`}
            >
              {p.popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-brand-cyan to-brand-purple text-dark-950 text-[10px] font-bold font-mono tracking-widest px-3 py-1 rounded-full uppercase">
                  RECOMMENDED CHANNELS
                </span>
              )}
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-mono text-gray-500 uppercase tracking-widest">{p.name}</h4>
                  <div className="flex items-baseline space-x-1 mt-2">
                    <span className="text-4xl font-extrabold font-display">${p.price}</span>
                    <span className="text-xs text-gray-500">/ month</span>
                  </div>
                </div>

                <div className="w-full h-px bg-white/5" />

                <ul className="space-y-3.5 text-left text-sm text-gray-300 font-light">
                  {p.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-center space-x-2.5">
                      <CheckCircle2 className="w-4 h-4 text-brand-cyan shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button 
                onClick={() => navigate('/admin/dashboard')}
                className={`w-full mt-8 py-3 rounded-lg text-sm font-semibold transition-all shadow-sm ${
                  p.popular 
                    ? 'bg-gradient-to-r from-brand-cyan to-brand-purple text-dark-950 font-bold hover:brightness-110 active:scale-[0.98]' 
                    : 'bg-white/5 hover:bg-white/10 border border-white/10 hover:text-white'
                }`}
              >
                {p.cta}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer block */}
      <footer className="text-gray-500 font-mono text-xs py-12 px-6 border-t border-white/5 z-10 relative">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3">
            <span className="font-display font-bold text-base text-gray-400">AETHER OS</span>
            <span>|</span>
            <span>Premium Admin Suite Project</span>
          </div>
          <div className="flex items-center space-x-6">
            <span className="hover:text-white cursor-pointer" onClick={() => navigate('/login')}>Sign In Gate</span>
            <span className="hover:text-white cursor-pointer" onClick={() => navigate('/admin/dashboard')}>Sandbox Area</span>
          </div>
          <p>© 2026 Aether, Inc. Licensed on Google AI Studio Workspace.</p>
        </div>
      </footer>
    </div>
  );
}
