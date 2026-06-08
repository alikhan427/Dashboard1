/**
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Filter, 
  Plus, 
  Edit2, 
  Trash2, 
  X, 
  Upload, 
  Boxes, 
  ChevronsRight, 
  AlertCircle,
  AlertTriangle,
  RefreshCw,
  Eye,
  Settings,
  Flame,
  Check
} from 'lucide-react';
import { RootState } from '../redux/store';
import { 
  addProduct, 
  editProduct, 
  deleteProduct, 
  setSearchTerm, 
  setCategoryFilter 
} from '../redux/slices/productsSlice';
import { addNotification } from '../redux/slices/notificationsSlice';
import { Product } from '../types';

export default function ProductsPage() {
  const dispatch = useDispatch();
  const { items, searchTerm, filterCategory } = useSelector((state: RootState) => state.products);
  const { theme } = useSelector((state: RootState) => state.settings);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Form states
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Local drawer form states
  const [productName, setProductName] = useState('');
  const [sku, setSku] = useState('');
  const [category, setCategory] = useState('Electronics');
  const [price, setPrice] = useState('');
  const [cost, setCost] = useState('');
  const [stock, setStock] = useState('');
  const [status, setStatus] = useState<'active' | 'draft' | 'out_of_stock'>('active');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Available categories
  const categoriesList = ['All', 'Electronics', 'Accessories', 'Living', 'Office'];

  // Handle Search Input
  const handleSearchChangeLocal = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(e.target.value));
    setCurrentPage(1);
  };

  // Handle Category Filtering
  const handleCategoryChangeLocal = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setCategoryFilter(e.target.value));
    setCurrentPage(1);
  };

  // Filtered Items logic
  const filteredProducts = items.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Pagination bounds math
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  // Add tag helper
  const handleAddTag = () => {
    const trimmed = tagInput.trim().toLowerCase();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (t: string) => {
    setTags(tags.filter(tag => tag !== t));
  };

  // Handle File upload UI simulation
  const handleTriggerMockUpload = () => {
    const defaultImages = [
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&auto=format&fit=crop&q=80'
    ];
    // Random image insert
    setImageUrl(defaultImages[Math.floor(Math.random() * defaultImages.length)]);
  };

  // Handle Delete product Action
  const handleDeleteAction = (prodId: string, prodName: string) => {
    dispatch(deleteProduct(prodId));
    dispatch(addNotification({
      title: 'Merchant Inventory Decoupled',
      message: `Product "${prodName}" has been completely removed from current SKU books.`,
      type: 'system'
    }));
  };

  // Populate drawer model for edit
  const handleOpenEditDrawer = (product: Product) => {
    setSelectedProduct(product);
    setProductName(product.name);
    setSku(product.sku);
    setCategory(product.category);
    setPrice(String(product.price));
    setCost(String(product.cost));
    setStock(String(product.stock));
    setStatus(product.stock === 0 ? 'out_of_stock' : product.status);
    setImageUrl(product.image);
    setDescription(product.description);
    setTags(product.tags);
    setIsEditing(true);
    setValidationError(null);
    setDrawerOpen(true);
  };

  const handleOpenAddDrawer = () => {
    setSelectedProduct(null);
    setProductName('');
    setSku(`AE-SKU-${Math.floor(1000 + Math.random() * 9000)}`);
    setCategory('Electronics');
    setPrice('');
    setCost('');
    setStock('');
    setStatus('active');
    setImageUrl('https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop&q=80');
    setDescription('');
    setTags(['workspace']);
    setIsEditing(false);
    setValidationError(null);
    setDrawerOpen(true);
  };

  // Submit action handler
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    const priceNum = parseFloat(price);
    const costNum = parseFloat(cost);
    const stockNum = parseInt(stock);

    if (!productName || !sku || isNaN(priceNum) || isNaN(costNum) || isNaN(stockNum)) {
      setValidationError('Please verify numerical bounds for all product inventory properties.');
      return;
    }

    if (isEditing && selectedProduct) {
      const revisedProduct: Product = {
        id: selectedProduct.id,
        name: productName,
        sku: sku,
        category: category,
        price: priceNum,
        cost: costNum,
        stock: stockNum,
        status: stockNum === 0 ? 'out_of_stock' : status,
        sales: selectedProduct.sales,
        image: imageUrl || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=80',
        description: description,
        tags: tags
      };

      dispatch(editProduct(revisedProduct));
      dispatch(addNotification({
        title: 'SKU Integrity Updated',
        message: `Product "${productName}" details and pricing sheets updated successfully.`,
        type: 'system'
      }));
    } else {
      const newProd = {
        name: productName,
        sku: sku,
        category: category,
        price: priceNum,
        cost: costNum,
        stock: stockNum,
        status: stockNum === 0 ? 'out_of_stock' : status,
        image: imageUrl || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=80',
        description: description || 'New product added to catalog.',
        tags: tags
      };

      dispatch(addProduct(newProd));
      dispatch(addNotification({
        title: 'New SKU Registered',
        message: `Successfully indexed custom SKU "${sku}" ("${productName}") under category "${category}".`,
        type: 'system'
      }));
    }

    setDrawerOpen(false);
  };

  return (
    <div className="space-y-6 animate-fade-in relative">
      
      {/* Header and Add Action */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl tracking-tight text-white">Merchant Products</h1>
          <p className="text-xs text-gray-500 font-mono">WORKSPACE CATALOG • {filteredProducts.length} SYSTEM SKUS</p>
        </div>
        <button
          onClick={handleOpenAddDrawer}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-purple text-dark-950 text-xs font-bold shadow-md shadow-brand-cyan/15 hover:brightness-110 active:scale-[0.98] transition-all flex items-center space-x-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4 text-dark-950 stroke-[2.5]" />
          <span>Add Custom SKU</span>
        </button>
      </div>

      {/* FILTER CONTROLS */}
      <div className={`p-4 rounded-xl border flex flex-col md:flex-row gap-4 items-center justify-between ${
        theme === 'dark' ? 'bg-dark-900/60 border-white/5' : 'bg-white border-gray-200'
      }`}>
        {/* Search query box */}
        <div className="relative w-full md:w-80">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChangeLocal}
            className="w-full pl-9 pr-4 py-2 bg-dark-950 border border-white/5 rounded-lg text-xs font-mono text-white placeholder:text-gray-600 focus:outline-none focus:border-brand-cyan"
            placeholder="Search by name, tags, SKU..."
          />
        </div>

        {/* Filter categories drop-downs */}
        <div className="w-full md:w-auto flex items-center space-x-3 self-stretch md:self-auto">
          <span className="text-xs text-gray-500 font-mono shrink-0">CATEGORY:</span>
          <select
            value={filterCategory}
            onChange={(e) => {
              dispatch(setCategoryFilter(e.target.value));
              setCurrentPage(1);
            }}
            className="flex-1 md:flex-initial pl-3 pr-8 py-2 bg-dark-950 text-xs font-mono border border-white/5 rounded-lg text-white focus:outline-none focus:border-brand-cyan"
          >
            {categoriesList.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* CATALOG TABLE CONTAINER */}
      <div className={`rounded-2xl border overflow-hidden ${
        theme === 'dark' ? 'glass-pane border-white/5' : 'bg-white border-gray-200'
      }`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-white/10 text-gray-400 uppercase tracking-widest bg-white/5 pb-2">
                <th className="p-4">SKU / PHOTO</th>
                <th className="p-4">NAME</th>
                <th className="p-4">CATEGORY</th>
                <th className="p-4 text-right">UNIT PRICE</th>
                <th className="p-4 text-right">INVENTORY UNITS</th>
                <th className="p-4 text-center">STATUS</th>
                <th className="p-4 text-right">CONTROLS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {currentProducts.map((prod) => (
                <tr key={prod.id} className="hover:bg-white/5 transition-colors">
                  {/* Image / SKU */}
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={prod.image} 
                        alt={prod.name} 
                        className="w-12 h-12 object-cover rounded-lg border border-white/10 shrink-0" 
                      />
                      <span className="text-brand-cyan font-bold block">{prod.sku}</span>
                    </div>
                  </td>

                  {/* Name, tags */}
                  <td className="p-4 font-sans max-w-xs">
                    <h3 className="font-semibold text-sm text-white line-clamp-1">{prod.name}</h3>
                    <div className="flex flex-wrap gap-1 mt-1 font-mono">
                      {prod.tags.map(t => (
                        <span key={t} className="text-[9px] bg-white/5 px-1.5 py-0.5 rounded text-gray-400">
                          #{t}
                        </span>
                      ))}
                    </div>
                  </td>

                  {/* Category */}
                  <td className="p-4 font-sans text-gray-300">
                    {prod.category}
                  </td>

                  {/* Price */}
                  <td className="p-4 text-right font-bold text-white">
                    ${prod.price.toFixed(2)}
                  </td>

                  {/* Stock */}
                  <td className="p-4 text-right">
                    <span className={prod.stock === 0 ? 'text-rose-400 font-bold' : 'text-gray-300'}>
                      {prod.stock} units
                    </span>
                  </td>

                  {/* Status badge */}
                  <td className="p-4 text-center">
                    <span className={`inline-flex px-2 py-0.5 rounded-full font-sans text-[10px] font-bold capitalize select-none ${
                      prod.status === 'active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                      prod.status === 'draft' ? 'bg-gray-500/10 text-gray-400 border border-gray-500/20' :
                      'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    }`}>
                      {prod.status.replace('_', ' ')}
                    </span>
                  </td>

                  {/* Controls Actions */}
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button 
                        onClick={() => handleOpenEditDrawer(prod)}
                        className="p-1.5 rounded-lg bg-white/5 text-gray-300 hover:text-brand-cyan hover:bg-white/10 transition-colors cursor-pointer"
                        title="Edit properties"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        onClick={() => handleDeleteAction(prod.id, prod.name)}
                        className="p-1.5 rounded-lg bg-white/5 text-gray-300 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                        title="Decouple item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {currentProducts.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-12 text-center text-gray-500 font-mono">
                    No SKU indexes matched current query filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION PANEL FOOTER */}
        <div className="p-4 border-t border-white/5 bg-white/5 flex items-center justify-between font-mono text-[11px] text-gray-400">
          <span>
            PAGE {currentPage} OF {totalPages} ({filteredProducts.length} MATCHED SKUS)
          </span>
          <div className="flex space-x-1.5">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-2.5 py-1 bg-white/5 rounded hover:bg-white/10 text-white disabled:opacity-25 transition-opacity"
            >
              PREV
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-2.5 py-1 bg-white/5 rounded hover:bg-white/10 text-white disabled:opacity-25 transition-opacity"
            >
              NEXT
            </button>
          </div>
        </div>
      </div>

      {/* DETAILED SLIDING EDIT/ADD DRAWER */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Dark screen backdrop overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
              className="fixed inset-0 bg-black z-50 cursor-pointer"
            />
            
            {/* Sliding Panel sheet container */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className={`fixed right-0 top-0 h-full w-full max-w-xl shadow-2xl z-50 p-6 flex flex-col ${
                theme === 'dark' ? 'bg-dark-900 text-white border-l border-white/5' : 'bg-white text-gray-900 border-l border-gray-200'
              }`}
            >
              {/* Drawer Top Header info */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 shrink-0">
                <div>
                  <h2 className="font-display font-semibold text-xl">
                    {isEditing ? 'Revise Channel SKU details' : 'Register Custom Catalog SKU'}
                  </h2>
                  <p className="text-xs text-gray-500 font-mono">
                    {isEditing ? `INDEX CODE: ${selectedProduct?.id}` : 'CREATING SHELF RECORD'}
                  </p>
                </div>
                <button 
                  onClick={() => setDrawerOpen(false)}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form Validation Indicator banner */}
              {validationError && (
                <div className="mt-4 p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-xs text-rose-300 flex items-start space-x-2 animate-pulse shrink-0">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{validationError}</span>
                </div>
              )}

              {/* Scrollable form body content */}
              <form onSubmit={handleSaveProduct} className="flex-1 overflow-y-auto space-y-5 py-4 font-sans text-xs">
                
                {/* Product Name */}
                <div className="space-y-1.5 animate-fade-in">
                  <label className="text-[10px] font-mono tracking-wider font-semibold text-gray-400 uppercase">Product Display Title</label>
                  <input
                    type="text"
                    required
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="w-full bg-dark-950 border border-white/5 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-brand-cyan"
                    placeholder="Aether Premium S-Mech..."
                  />
                </div>

                {/* SKU Code reference */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono tracking-wider font-semibold text-gray-400 uppercase">SKU IDENTIFIER ID</label>
                    <input
                      type="text"
                      required
                      value={sku}
                      onChange={(e) => setSku(e.target.value)}
                      className="w-full bg-dark-950 border border-white/5 rounded-xl px-4 py-2 text-sm text-white font-mono focus:outline-none focus:border-brand-cyan"
                      placeholder="AE-MECH-65"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono tracking-wider font-semibold text-gray-400 uppercase">Product Taxonomy Field</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-dark-950 border border-white/5 rounded-xl px-4 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-brand-cyan"
                    >
                      <option value="Electronics">Electronics</option>
                      <option value="Accessories">Accessories</option>
                      <option value="Living">Living & Interior</option>
                      <option value="Office">Office workspace</option>
                    </select>
                  </div>
                </div>

                {/* Economics Prices Unit cost setup */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono tracking-wider font-semibold text-gray-400 uppercase">UNIT PRICE ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full bg-dark-950 border border-white/5 rounded-xl px-4 py-2 text-sm text-white font-mono focus:outline-none focus:border-brand-cyan"
                      placeholder="189.00"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono tracking-wider font-semibold text-gray-400 uppercase">UNIT COST ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={cost}
                      onChange={(e) => setCost(e.target.value)}
                      className="w-full bg-dark-950 border border-white/5 rounded-xl px-4 py-2 text-sm text-white font-mono focus:outline-none focus:border-brand-cyan"
                      placeholder="58.00"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono tracking-wider font-semibold text-gray-400 uppercase">STOCK LEVEL</label>
                    <input
                      type="number"
                      required
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                      className="w-full bg-dark-950 border border-white/5 rounded-xl px-4 py-2 text-sm text-white font-mono focus:outline-none focus:border-brand-cyan"
                      placeholder="42"
                    />
                  </div>
                </div>

                {/* Shelf photo / Simulation image upload */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono tracking-wider font-semibold text-gray-400 uppercase">SHELF PRODUCT PHOTO</label>
                  <div className="grid grid-cols-4 gap-4 items-center">
                    <div className="col-span-1 rounded-xl bg-dark-950 border border-white/10 h-20 flex items-center justify-center overflow-hidden">
                      {imageUrl ? (
                        <img src={imageUrl} alt="preview" className="w-full h-full object-cover" />
                      ) : (
                        <Boxes className="w-6 h-6 text-gray-600" />
                      )}
                    </div>
                    <div className="col-span-3 space-y-2">
                      <input
                        type="text"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        className="w-full bg-dark-950 border border-white/5 rounded-xl px-4 py-2 text-xs text-brand-cyan font-mono focus:outline-none"
                        placeholder="Paste unsplash or web custom photo..."
                      />
                      <button
                        type="button"
                        onClick={handleTriggerMockUpload}
                        className="px-3.5 py-1.5 bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan rounded-lg text-xs font-mono font-bold flex items-center space-x-1 hover:bg-brand-cyan/20 cursor-pointer"
                      >
                        <Upload className="w-3.5 h-3.5 shrink-0" />
                        <span>Mock Random Photo Sync</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Category tags block */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono tracking-wider font-semibold text-gray-400 uppercase">Marketing tags</label>
                  <div className="flex flex-wrap gap-1.5 p-2 bg-dark-950 border border-white/5 rounded-xl min-h-12 items-center">
                    {tags.map(t => (
                      <span key={t} className="px-2 py-0.5 rounded-md bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan font-mono text-[11px] flex items-center space-x-1">
                        <span>#{t}</span>
                        <X className="w-3 h-3 hover:text-white cursor-pointer shrink-0" onClick={() => handleRemoveTag(t)} />
                      </span>
                    ))}
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                      className="bg-transparent border-none outline-none text-white text-xs pl-2 shrink flex-1 min-w-20"
                      placeholder="Type tag & Enter..."
                    />
                  </div>
                </div>

                {/* Detailed descriptions */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono tracking-wider font-semibold text-gray-400 uppercase">EXECUTIVE BRIEF DESCRIPTION</label>
                  <textarea
                    value={description}
                    rows={3}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-dark-950 border border-white/5 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-brand-cyan"
                    placeholder="Provide aircraft-grade specs, custom features, or marketing briefings..."
                  />
                </div>

                {/* Save block controls */}
                <div className="pt-4 border-t border-white/5 shrink-0 flex items-center space-x-3">
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-gradient-to-r from-brand-cyan to-brand-purple text-dark-950 text-xs font-bold rounded-xl shadow shadow-brand-cyan/10 hover:brightness-110 cursor-pointer"
                  >
                    Save SKU Sheets
                  </button>
                  <button
                    type="button"
                    onClick={() => setDrawerOpen(false)}
                    className="px-6 py-3 bg-white/5 hover:bg-white/10 text-xs font-mono font-semibold rounded-xl text-gray-400 hover:text-white"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
