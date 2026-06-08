/**
 * SPDX-License-Identifier: Apache-2.0
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from '../../types';

const initialState: AuthState = {
  user: {
    id: 'admin_01',
    name: 'Alikhan Prime',
    email: 'alikhan@aether.io',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    role: 'Owner & Super Admin'
  },
  isAuthenticated: true, // Sandbox preloaded with authenticated state for seamless demo
  token: 'mock-jwt-token-aether-admin',
  loading: false,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<{ name: string; email: string }>) {
      state.loading = false;
      state.isAuthenticated = true;
      state.token = 'mock-jwt-token-aether-admin';
      state.user = {
        id: 'admin_custom',
        name: action.payload.name || 'Alikhan Prime',
        email: action.payload.email,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        role: 'Administrator'
      };
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.token = null;
    },
    registerSuccess(state, action: PayloadAction<{ name: string; email: string }>) {
      state.isAuthenticated = true;
      state.token = 'mock-jwt-token-aether-admin';
      state.user = {
        id: 'admin_custom',
        name: action.payload.name,
        email: action.payload.email,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        role: 'Merchant Creator'
      };
    },
    updateAdminProfile(state, action: PayloadAction<{ name: string; email: string; avatar?: string }>) {
      if (state.user) {
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;
        if (action.payload.avatar) {
          state.user.avatar = action.payload.avatar;
        }
      }
    }
  }
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  registerSuccess,
  updateAdminProfile
} = authSlice.actions;

export default authSlice.reducer;
