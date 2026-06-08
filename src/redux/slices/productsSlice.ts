/**
 * SPDX-License-Identifier: Apache-2.0
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types';
import { INITIAL_PRODUCTS } from '../../data/initialData';

interface ProductsState {
  items: Product[];
  filterCategory: string;
  searchTerm: string;
  loading: boolean;
}

const initialState: ProductsState = {
  items: INITIAL_PRODUCTS,
  filterCategory: 'All',
  searchTerm: '',
  loading: false
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<Omit<Product, 'id' | 'sales'>>) {
      const newProduct: Product = {
        ...action.payload,
        id: `prod_${Date.now()}`,
        sales: 0
      };
      state.items.unshift(newProduct);
    },
    editProduct(state, action: PayloadAction<Product>) {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteProduct(state, action: PayloadAction<string>) {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    updateProductStock(state, action: PayloadAction<{ id: string; stock: number }>) {
      const product = state.items.find(item => item.id === action.payload.id);
      if (product) {
        product.stock = action.payload.stock;
        if (product.stock === 0) {
          product.status = 'out_of_stock';
        } else if (product.status === 'out_of_stock') {
          product.status = 'active';
        }
      }
    },
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    },
    setCategoryFilter(state, action: PayloadAction<string>) {
      state.filterCategory = action.payload;
    }
  }
});

export const {
  addProduct,
  editProduct,
  deleteProduct,
  updateProductStock,
  setSearchTerm,
  setCategoryFilter
} = productsSlice.actions;

export default productsSlice.reducer;
