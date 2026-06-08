/**
 * SPDX-License-Identifier: Apache-2.0
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Notification } from '../../types';
import { INITIAL_NOTIFICATIONS } from '../../data/initialData';

interface NotificationsState {
  items: Notification[];
}

const initialState: NotificationsState = {
  items: INITIAL_NOTIFICATIONS
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification(state, action: PayloadAction<Omit<Notification, 'id' | 'date' | 'read'>>) {
      const newNotification: Notification = {
        ...action.payload,
        id: `not_${Date.now()}`,
        date: new Date().toISOString(),
        read: false
      };
      state.items.unshift(newNotification);
    },
    markAsRead(state, action: PayloadAction<string>) {
      const notification = state.items.find(item => item.id === action.payload);
      if (notification) {
        notification.read = true;
      }
    },
    markAllAsRead(state) {
      state.items.forEach(item => {
        item.read = true;
      });
    },
    deleteNotification(state, action: PayloadAction<string>) {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearAllNotifications(state) {
      state.items = [];
    }
  }
});

export const {
  addNotification,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  clearAllNotifications
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
