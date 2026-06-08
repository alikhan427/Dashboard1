/**
 * SPDX-License-Identifier: Apache-2.0
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Customer, CustomerActivity } from '../../types';
import { INITIAL_CUSTOMERS } from '../../data/initialData';

interface CustomersState {
  items: Customer[];
  searchTerm: string;
}

const initialState: CustomersState = {
  items: INITIAL_CUSTOMERS,
  searchTerm: ''
};

const customersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    addCustomer(state, action: PayloadAction<Customer>) {
      state.items.unshift(action.payload);
    },
    setCustomerSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    },
    addCustomerActivity(state, action: PayloadAction<{ customerId: string; activity: Omit<CustomerActivity, 'id'> }>) {
      const customer = state.items.find(item => item.id === action.payload.customerId);
      if (customer) {
        const newActivity: CustomerActivity = {
          ...action.payload.activity,
          id: `act_${Date.now()}`
        };
        customer.activityHistory.unshift(newActivity);
        // Also update totals to simulate backend events
        if (action.payload.activity.type === 'order') {
          customer.ordersCount += 1;
        }
      }
    },
    increaseCustomerSpend(state, action: PayloadAction<{ customerId: string; amount: number }>) {
      const customer = state.items.find(item => item.id === action.payload.customerId);
      if (customer) {
        customer.totalSpend += action.payload.amount;
      }
    }
  }
});

export const {
  addCustomer,
  setCustomerSearchTerm,
  addCustomerActivity,
  increaseCustomerSpend
} = customersSlice.actions;

export default customersSlice.reducer;
