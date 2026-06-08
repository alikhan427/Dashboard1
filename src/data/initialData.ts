/**
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, Order, Customer, Notification, SalesDataPoint, CategoryDataPoint, UserGrowthDataPoint } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod_1',
    name: 'Aether Mech Premium Keyboard',
    sku: 'AE-MECH-65',
    category: 'Electronics',
    price: 189.00,
    cost: 58.00,
    stock: 42,
    status: 'active',
    sales: 124,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop&q=80',
    description: 'Aircraft-grade aluminum mechanical keyboard with hot-swappable tactile switches, customized dampeners, and responsive low-latency Bluetooth connectivity.',
    tags: ['mechanical', 'wireless', 'workspace']
  },
  {
    id: 'prod_2',
    name: 'Aether Carbon Chrono',
    sku: 'AE-CHRONO-X',
    category: 'Accessories',
    price: 349.00,
    cost: 110.00,
    stock: 18,
    status: 'active',
    sales: 88,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=80',
    description: 'Precision mechanical chronograph with high-durability carbon fiber case, sapphire crystal glass, and structural ocean-reclaimed orange rubber strap.',
    tags: ['luxury', 'watch', 'carbon']
  },
  {
    id: 'prod_3',
    name: 'Aether Sound Wave Pro',
    sku: 'AE-WAVE-09',
    category: 'Electronics',
    price: 299.00,
    cost: 95.00,
    stock: 0,
    status: 'out_of_stock',
    sales: 245,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=80',
    description: 'Ultra high-fidelity wireless over-ear headphones. Features advanced neutral-point active noise cancellation and a bio-cellulose compound transducer.',
    tags: ['audio', 'noise-cancelling', 'wireless']
  },
  {
    id: 'prod_4',
    name: 'Aether Lumos Desk Light',
    sku: 'AE-LUMOS-DL',
    category: 'Living',
    price: 145.00,
    cost: 42.00,
    stock: 65,
    status: 'active',
    sales: 142,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&auto=format&fit=crop&q=80',
    description: 'Architectural desk lamp with dynamic ambient temperature adjustment, soft-shadow micro-diffuser panel, and micro-gesture proximity controls.',
    tags: ['smarthome', 'minimalist', 'interior']
  },
  {
    id: 'prod_5',
    name: 'Aether Full-Grain Document Sleeve',
    sku: 'AE-SLEEVE-BRN',
    category: 'Accessories',
    price: 95.00,
    cost: 26.00,
    stock: 112,
    status: 'active',
    sales: 310,
    image: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=500&auto=format&fit=crop&q=80',
    description: 'Vegetable-tanned full-grain leather sleeve. Hand-stitched with waxed threads, perfectly fitted for 14-inch professional notebooks of peak class.',
    tags: ['leather', 'office', 'premium']
  },
  {
    id: 'prod_6',
    name: 'Aether Air Desk Pad',
    sku: 'AE-AIRPAD-S',
    category: 'Living',
    price: 59.00,
    cost: 16.00,
    stock: 14,
    status: 'draft',
    sales: 0,
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=500&auto=format&fit=crop&q=80',
    description: 'Ultra-thin fluid repellent wool felt desk mat. Styled with self-healing backing, and magnetic cable-guide channels.',
    tags: ['accessories', 'wool', 'workspace']
  }
];

export const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: 'cust_1',
    name: 'Evelyn Sterling',
    email: 'evelyn@sterling.design',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    totalSpend: 1542.00,
    ordersCount: 5,
    city: 'San Francisco',
    country: 'United States',
    status: 'active',
    joinedDate: '2025-10-12',
    activityHistory: [
      { id: 'act_101', type: 'order', description: 'Placed order #ORD-8821 for Aether Carbon Chrono', date: '2026-06-07T14:22:00Z' },
      { id: 'act_102', type: 'support', description: 'Updated shipping address to Potrero Hill Studio', date: '2026-06-03T09:15:00Z' },
      { id: 'act_103', type: 'order', description: 'Placed order #ORD-7910 for Aether Lumos Desk Light', date: '2026-05-18T18:40:00Z' }
    ]
  },
  {
    id: 'cust_2',
    name: 'Marcus Kael',
    email: 'marcus@kaeldev.io',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    totalSpend: 677.00,
    ordersCount: 3,
    city: 'Munich',
    country: 'Germany',
    status: 'active',
    joinedDate: '2025-11-04',
    activityHistory: [
      { id: 'act_201', type: 'order', description: 'Placed order #ORD-8819 for Aether Mech Premium Keyboard', date: '2026-06-06T11:05:00Z' },
      { id: 'act_202', type: 'signup', description: 'Created account and subscribed to premium releases', date: '2025-11-04T08:12:00Z' }
    ]
  },
  {
    id: 'cust_3',
    name: 'Sora Takahashi',
    email: 'sora@tokyo-labs.jp',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    totalSpend: 2432.00,
    ordersCount: 8,
    city: 'Tokyo',
    country: 'Japan',
    status: 'active',
    joinedDate: '2025-08-20',
    activityHistory: [
      { id: 'act_301', type: 'order', description: 'Placed order #ORD-8801 for Aether Sound Wave Pro (x2)', date: '2026-06-01T23:50:00Z' },
      { id: 'act_302', type: 'refund', description: 'Requested accessory replacement for sleeve button', date: '2026-05-25T13:10:00Z' }
    ]
  },
  {
    id: 'cust_4',
    name: 'Amara Vance',
    email: 'amara.v@vancebeauty.co',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    totalSpend: 95.00,
    ordersCount: 1,
    city: 'London',
    country: 'United Kingdom',
    status: 'inactive',
    joinedDate: '2026-01-15',
    activityHistory: [
      { id: 'act_401', type: 'order', description: 'Placed order #ORD-5192 for Aether Leather Sleeve', date: '2026-01-16T15:20:00Z' }
    ]
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord_1',
    orderNumber: 'ORD-8821',
    customerName: 'Evelyn Sterling',
    customerEmail: 'evelyn@sterling.design',
    date: '2026-06-07T14:22:00Z',
    total: 349.00,
    status: 'pending',
    items: [
      { id: 'item_1', productId: 'prod_2', name: 'Aether Carbon Chrono', quantity: 1, price: 349.00 }
    ],
    trackingNumber: 'AE-TRK-74829381',
    paymentMethod: 'Apple Pay'
  },
  {
    id: 'ord_2',
    orderNumber: 'ORD-8819',
    customerName: 'Marcus Kael',
    customerEmail: 'marcus@kaeldev.io',
    date: '2026-06-06T11:05:00Z',
    total: 478.00,
    status: 'shipped',
    items: [
      { id: 'item_2', productId: 'prod_1', name: 'Aether Mech Premium Keyboard', quantity: 1, price: 189.00 },
      { id: 'item_3', productId: 'prod_3', name: 'Aether Sound Wave Pro', quantity: 1, price: 289.00 }
    ],
    trackingNumber: 'AE-TRK-98310022',
    paymentMethod: 'Credit Card (•••• 9021)'
  },
  {
    id: 'ord_3',
    orderNumber: 'ORD-8801',
    customerName: 'Sora Takahashi',
    customerEmail: 'sora@tokyo-labs.jp',
    date: '2026-06-01T23:50:00Z',
    total: 598.00,
    status: 'delivered',
    items: [
      { id: 'item_4', productId: 'prod_3', name: 'Aether Sound Wave Pro', quantity: 2, price: 299.00 }
    ],
    trackingNumber: 'AE-TRK-10928238',
    paymentMethod: 'Striped Balance'
  },
  {
    id: 'ord_4',
    orderNumber: 'ORD-8750',
    customerName: 'Amara Vance',
    customerEmail: 'amara.v@vancebeauty.co',
    date: '2026-05-24T09:41:00Z',
    total: 95.00,
    status: 'delivered',
    items: [
      { id: 'item_5', productId: 'prod_5', name: 'Aether Full-Grain Document Sleeve', quantity: 1, price: 95.00 }
    ],
    trackingNumber: 'AE-TRK-55291083',
    paymentMethod: 'Google Pay'
  },
  {
    id: 'ord_5',
    orderNumber: 'ORD-8710',
    customerName: 'Kellen Frost',
    customerEmail: 'k.frost@nordic.se',
    date: '2026-05-15T16:12:00Z',
    total: 434.00,
    status: 'cancelled',
    items: [
      { id: 'item_6', productId: 'prod_4', name: 'Aether Lumos Desk Light', quantity: 3, price: 145.00 }
    ],
    paymentMethod: 'Credit Card (•••• 5512)'
  }
];

export const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: 'not_1',
    title: 'New High-Value Order',
    message: 'Evelyn Sterling placed order #ORD-8821 for $349.00.',
    type: 'order',
    date: '2026-06-07T14:22:00Z',
    read: false
  },
  {
    id: 'not_2',
    title: 'Critical Out-Of-Stock Alert',
    message: 'Product "Aether Sound Wave Pro" has reached 0 units in inventory.',
    type: 'alert',
    date: '2026-06-07T08:00:00Z',
    read: false
  },
  {
    id: 'not_3',
    title: 'New Merchant Join Offer',
    message: 'System auto-verified API webhook routing credentials for Europe regional gateway.',
    type: 'system',
    date: '2026-06-05T17:30:00Z',
    read: true
  },
  {
    id: 'not_4',
    title: 'Customer Address Revision',
    message: 'Sora Takahashi updated profile contact address for Tokyo Central Labs delivery.',
    type: 'customer',
    date: '2026-06-04T12:00:00Z',
    read: true
  }
];

export const SALES_TRENDS: SalesDataPoint[] = [
  { date: 'May 28', sales: 42, revenue: 8400, profit: 5800 },
  { date: 'May 30', sales: 51, revenue: 11200, profit: 7900 },
  { date: 'Jun 01', sales: 68, revenue: 14300, profit: 9800 },
  { date: 'Jun 02', sales: 62, revenue: 13100, profit: 9100 },
  { date: 'Jun 03', sales: 74, revenue: 16800, profit: 12200 },
  { date: 'Jun 04', sales: 95, revenue: 21400, profit: 15400 },
  { date: 'Jun 05', sales: 112, revenue: 25400, profit: 18700 },
  { date: 'Jun 06', sales: 105, revenue: 24200, profit: 17200 },
  { date: 'Jun 07', sales: 130, revenue: 29800, profit: 21900 },
];

export const CATEGORY_DISTRIBUTION: CategoryDataPoint[] = [
  { name: 'Electronics', value: 45 },
  { name: 'Accessories', value: 35 },
  { name: 'Living & Interior', value: 20 },
];

export const USER_GROWTH: UserGrowthDataPoint[] = [
  { month: 'Jan', users: 1200 },
  { month: 'Feb', users: 1840 },
  { month: 'Mar', users: 2600 },
  { month: 'Apr', users: 3820 },
  { month: 'May', users: 5100 },
  { month: 'Jun', users: 7450 },
];
