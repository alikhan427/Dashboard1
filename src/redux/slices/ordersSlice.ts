/**
 * SPDX-License-Identifier: Apache-2.0
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order } from '../../types';
import { INITIAL_ORDERS } from '../../data/initialData';

interface OrdersState {
  items: Order[];
  statusFilter: string;
  searchTerm: string;
}

const initialState: OrdersState = {
  items: INITIAL_ORDERS,
  statusFilter: 'All',
  searchTerm: ''
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder(state, action: PayloadAction<Order>) {
      state.items.unshift(action.payload);
    },
    updateOrderStatus(state, action: PayloadAction<{ id: string; status: Order['status'] }>) {
      const order = state.items.find(item => item.id === action.payload.id);
      if (order) {
        order.status = action.payload.status;
      }
    },
    updateOrderTracking(state, action: PayloadAction<{ id: string; trackingNumber: string }>) {
      const order = state.items.find(item => item.id === action.payload.id);
      if (order) {
        order.trackingNumber = action.payload.trackingNumber;
      }
    },
    setOrderSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    },
    setOrderStatusFilter(state, action: PayloadAction<string>) {
      state.statusFilter = action.payload;
    }
  }
});

export const {
  addOrder,
  updateOrderStatus,
  updateOrderTracking,
  setOrderSearchTerm,
  setOrderStatusFilter
} = ordersSlice.actions;

export default ordersSlice.reducer;
