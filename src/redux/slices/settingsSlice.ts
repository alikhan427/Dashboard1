/**
 * SPDX-License-Identifier: Apache-2.0
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SettingsState {
  theme: 'dark' | 'light';
  currency: string;
  storeName: string;
  storeEmail: string;
  liveTrackingEnabled: boolean;
  orderAlertsEnabled: boolean;
  systemAlertsEnabled: boolean;
}

const initialState: SettingsState = {
  theme: 'dark', // Modern default is Dark UI
  currency: 'USD',
  storeName: 'Aether HQ',
  storeEmail: 'operations@aether.io',
  liveTrackingEnabled: true,
  orderAlertsEnabled: true,
  systemAlertsEnabled: true
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
    },
    setTheme(state, action: PayloadAction<'dark' | 'light'>) {
      state.theme = action.payload;
    },
    updateStoreSettings(state, action: PayloadAction<Partial<SettingsState>>) {
      return {
        ...state,
        ...action.payload
      };
    }
  }
});

export const { toggleTheme, setTheme, updateStoreSettings } = settingsSlice.actions;

export default settingsSlice.reducer;
