/**
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  cost: number;
  stock: number;
  status: 'active' | 'draft' | 'out_of_stock';
  sales: number;
  image: string;
  description: string;
  tags: string[];
}

export interface OrderItem {
  id: string;
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  date: string;
  total: number;
  status: 'pending' | 'delivered' | 'cancelled' | 'shipped';
  items: OrderItem[];
  trackingNumber?: string;
  paymentMethod: string;
}

export interface CustomerActivity {
  id: string;
  type: 'order' | 'support' | 'signup' | 'refund';
  description: string;
  date: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  avatar: string;
  totalSpend: number;
  ordersCount: number;
  city: string;
  country: string;
  status: 'active' | 'inactive';
  joinedDate: string;
  activityHistory: CustomerActivity[];
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'order' | 'system' | 'customer' | 'alert';
  date: string;
  read: boolean;
}

export interface AuthState {
  user: {
    id: string;
    name: string;
    email: string;
    avatar: string;
    role: string;
  } | null;
  isAuthenticated: boolean;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export interface SalesDataPoint {
  date: string;
  sales: number;
  revenue: number;
  profit: number;
}

export interface CategoryDataPoint {
  name: string;
  value: number;
}

export interface UserGrowthDataPoint {
  month: string;
  users: number;
}
