import React, { useState, useMemo } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Store, 
  ArrowLeft, 
  Package, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Edit3, 
  Trash2, 
  Eye, 
  MoreVertical,
  Minus,
  Sparkles,
  TrendingUp,
  RefreshCw
} from 'lucide-react';
import useProduct from "../hooks/useProduct.js"
import { useSelector } from 'react-redux';

const CATEGORIES = ["All", "Men's Shirts", "Men's Trousers", "Women's Dresses", "Women's Tops", "Outerwear", "Accessories"];

// Sample initial products for demonstration
const INITIAL_PRODUCTS = [
  {
    id: 'prod-1',
    title: 'Oversized Linen Resort Shirt',
    sku: 'SN-MS-001',
    category: "Men's Shirts",
    price: 68.00,
    currency: 'USD',
    stock: 42,
    sizes: ['S', 'M', 'L', 'XL'],
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=300',
    updatedAt: '2 hours ago'
  },
  {
    id: 'prod-2',
    title: 'Pleated Straight Leg Trousers',
    sku: 'SN-MT-084',
    category: "Men's Trousers",
    price: 85.00,
    currency: 'USD',
    stock: 5, // Low stock
    sizes: ['M', 'L', 'XXL'],
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=300',
    updatedAt: 'Yesterday'
  },
  {
    id: 'prod-3',
    title: 'Silk Wrap Midi Dress',
    sku: 'SN-WD-102',
    category: "Women's Dresses",
    price: 120.00,
    currency: 'EUR',
    stock: 0, // Out of stock
    sizes: ['XS', 'S', 'M'],
    status: 'Out of Stock',
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=300',
    updatedAt: '3 days ago'
  },
  {
    id: 'prod-4',
    title: 'Ribbed Cotton Tank Top',
    sku: 'SN-WT-019',
    category: "Women's Tops",
    price: 32.00,
    currency: 'USD',
    stock: 110,
    sizes: ['XS', 'S', 'M', 'L'],
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=300',
    updatedAt: 'Just now'
  },
  {
    id: 'prod-5',
    title: 'Structured Double-Breasted Trench',
    sku: 'SN-OW-005',
    category: "Outerwear",
    price: 195.00,
    currency: 'GBP',
    stock: 3, // Low stock
    sizes: ['M', 'L'],
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=300',
    updatedAt: '5 days ago'
  }
];

const SellerInventory = () => {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [stockFilter, setStockFilter] = useState('all'); // 'all', 'in_stock', 'low_stock', 'out_of_stock'


  const {handleGetSellerProduct} = useProduct()
  const sellerProducts = useSelector(state => state.product.sellerProducts)
  // Stock Quick Adjust Handler
  const handleStockChange = (id, delta) => {
    setProducts((prev) =>
      prev.map((prod) => {
        if (prod.id === id) {
          const newStock = Math.max(0, prod.stock + delta);
          let newStatus = prod.status;
          if (newStock === 0) newStatus = 'Out of Stock';
          else if (prod.status === 'Out of Stock') newStatus = 'Active';

          return { ...prod, stock: newStock, status: newStatus };
        }
        return prod;
      })
    );
  };

  // Delete product handler
  const handleDeleteProduct = (id) => {
    if (confirm('Are you sure you want to delete this listing?')) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  // Derived Stats
  const stats = useMemo(() => {
    const total = products.length;
    const active = products.filter((p) => p.stock > 0).length;
    const lowStock = products.filter((p) => p.stock > 0 && p.stock <= 5).length;
    const outOfStock = products.filter((p) => p.stock === 0).length;
    return { total, active, lowStock, outOfStock };
  }, [products]);

  // Filtered Products List
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === 'All' || product.category === selectedCategory;

      let matchesStock = true;
      if (stockFilter === 'in_stock') matchesStock = product.stock > 5;
      if (stockFilter === 'low_stock') matchesStock = product.stock > 0 && product.stock <= 5;
      if (stockFilter === 'out_of_stock') matchesStock = product.stock === 0;

      return matchesSearch && matchesCategory && matchesStock;
    });
  }, [products, searchTerm, selectedCategory, stockFilter]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-stone-50/40 to-slate-100/60 font-sans text-neutral-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Top Navigation / Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/80">
          <div className="flex items-center gap-3">
            <a
              href="#dashboard"
              className="p-2 rounded-xl bg-white border border-slate-200/80 text-neutral-600 hover:text-neutral-900 shadow-2xs transition"
            >
              <ArrowLeft size={18} />
            </a>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-semibold tracking-wider text-neutral-900 font-serif">
                  SNITCH<span className="text-[10px] font-sans align-top text-neutral-400">®</span>
                </span>
                <span className="text-xs font-light text-neutral-400">/</span>
                <span className="text-xs font-light tracking-widest text-neutral-500 uppercase flex items-center gap-1 bg-white/80 border border-slate-200 px-2.5 py-0.5 rounded-full">
                  <Store size={12} />
                  Seller Portal
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-light text-neutral-900 tracking-tight mt-1">
                Inventory & Products
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#create-product"
              className="px-6 py-2.5 bg-neutral-900 hover:bg-black text-white rounded-xl text-xs font-light shadow-md shadow-neutral-900/10 transition flex items-center gap-2"
            >
              <Plus size={16} />
              <span>Add New Product</span>
            </a>
          </div>
        </div>

        {/* Overview Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="bg-white rounded-3xl p-5 border border-slate-200/70 shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-neutral-500">
              <span className="text-xs uppercase font-light tracking-wider">Total Products</span>
              <Package size={18} className="text-neutral-400" />
            </div>
            <div className="text-2xl font-semibold text-neutral-900 font-serif">{stats.total}</div>
            <p className="text-[11px] text-neutral-400 font-light">Listings created in your store</p>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-slate-200/70 shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-neutral-500">
              <span className="text-xs uppercase font-light tracking-wider">In Stock</span>
              <CheckCircle2 size={18} className="text-emerald-500" />
            </div>
            <div className="text-2xl font-semibold text-neutral-900 font-serif">{stats.active}</div>
            <p className="text-[11px] text-emerald-600 font-light flex items-center gap-1">
              <TrendingUp size={12} /> Available for purchase
            </p>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-slate-200/70 shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-neutral-500">
              <span className="text-xs uppercase font-light tracking-wider">Low Stock</span>
              <AlertTriangle size={18} className="text-amber-500" />
            </div>
            <div className="text-2xl font-semibold text-amber-600 font-serif">{stats.lowStock}</div>
            <p className="text-[11px] text-amber-600 font-light">5 or fewer items remaining</p>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-slate-200/70 shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-neutral-500">
              <span className="text-xs uppercase font-light tracking-wider">Out of Stock</span>
              <XCircle size={18} className="text-rose-500" />
            </div>
            <div className="text-2xl font-semibold text-rose-600 font-serif">{stats.outOfStock}</div>
            <p className="text-[11px] text-rose-500 font-light">Requires immediate restock</p>
          </div>

        </div>

        {/* Filter & Controls Panel */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-sm border border-slate-200/70 space-y-4">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by product title or SKU..."
                className="w-full bg-slate-50/70 border border-slate-200 rounded-2xl pl-10 pr-4 py-2.5 text-xs sm:text-sm font-light text-neutral-800 placeholder-neutral-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-800 transition"
              />
            </div>

            {/* Category Dropdown */}
            <div className="flex flex-wrap items-center gap-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-slate-50/70 border border-slate-200 rounded-2xl px-4 py-2.5 text-xs font-light text-neutral-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-neutral-900/10 cursor-pointer"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    Category: {cat}
                  </option>
                ))}
              </select>

              {/* Stock Status Buttons */}
              <div className="flex items-center bg-slate-100/80 p-1 rounded-2xl border border-slate-200/80">
                <button
                  onClick={() => setStockFilter('all')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-light transition ${
                    stockFilter === 'all'
                      ? 'bg-white text-neutral-900 shadow-2xs font-normal'
                      : 'text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setStockFilter('in_stock')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-light transition ${
                    stockFilter === 'in_stock'
                      ? 'bg-white text-emerald-700 shadow-2xs font-normal'
                      : 'text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  In Stock
                </button>
                <button
                  onClick={() => setStockFilter('low_stock')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-light transition ${
                    stockFilter === 'low_stock'
                      ? 'bg-white text-amber-700 shadow-2xs font-normal'
                      : 'text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  Low Stock
                </button>
                <button
                  onClick={() => setStockFilter('out_of_stock')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-light transition ${
                    stockFilter === 'out_of_stock'
                      ? 'bg-white text-rose-700 shadow-2xs font-normal'
                      : 'text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  Out of Stock
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200/70 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] uppercase tracking-wider text-neutral-500 font-light">
                  <th className="py-4 px-6">Product Details</th>
                  <th className="py-4 px-4">Category</th>
                  <th className="py-4 px-4">Price</th>
                  <th className="py-4 px-4">Sizes</th>
                  <th className="py-4 px-4">Stock Level</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm font-light text-neutral-700">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => {
                    const isLowStock = product.stock > 0 && product.stock <= 5;
                    const isOutOfStock = product.stock === 0;

                    return (
                      <tr key={product.id} className="hover:bg-slate-50/50 transition duration-150">
                        {/* Product Thumbnail & Title */}
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3.5">
                            <img
                              src={product.image}
                              alt={product.title}
                              className="w-12 h-14 object-cover rounded-xl border border-slate-200/80 shrink-0 bg-slate-100"
                            />
                            <div>
                              <p className="font-normal text-neutral-900 line-clamp-1">{product.title}</p>
                              <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wide">
                                SKU: {product.sku}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="py-4 px-4 text-xs text-neutral-600">
                          <span className="bg-slate-100 px-2.5 py-1 rounded-full text-neutral-600">
                            {product.category}
                          </span>
                        </td>

                        {/* Price */}
                        <td className="py-4 px-4 font-mono font-normal text-neutral-900 text-xs">
                          {product.currency} {product.price.toFixed(2)}
                        </td>

                        {/* Sizes */}
                        <td className="py-4 px-4">
                          <div className="flex flex-wrap gap-1">
                            {product.sizes.map((s) => (
                              <span key={s} className="text-[10px] bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded-md text-neutral-600">
                                {s}
                              </span>
                            ))}
                          </div>
                        </td>

                        {/* Interactive Stock Adjuster */}
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 p-0.5">
                              <button
                                onClick={() => handleStockChange(product.id, -1)}
                                className="p-1 hover:bg-white rounded-lg text-neutral-600 transition disabled:opacity-30"
                                disabled={product.stock === 0}
                                title="Decrease stock"
                              >
                                <Minus size={12} />
                              </button>
                              <span className={`px-2 text-xs font-mono font-medium ${
                                isOutOfStock ? 'text-rose-600' : isLowStock ? 'text-amber-600' : 'text-neutral-900'
                              }`}>
                                {product.stock}
                              </span>
                              <button
                                onClick={() => handleStockChange(product.id, 1)}
                                className="p-1 hover:bg-white rounded-lg text-neutral-600 transition"
                                title="Increase stock"
                              >
                                <Plus size={12} />
                              </button>
                            </div>
                          </div>
                        </td>

                        {/* Status Badge */}
                        <td className="py-4 px-4">
                          {isOutOfStock ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-normal bg-rose-50 text-rose-700 border border-rose-200">
                              <XCircle size={12} />
                              Out of Stock
                            </span>
                          ) : isLowStock ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-normal bg-amber-50 text-amber-700 border border-amber-200">
                              <AlertTriangle size={12} />
                              Low Stock
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-normal bg-emerald-50 text-emerald-700 border border-emerald-200">
                              <CheckCircle2 size={12} />
                              In Stock
                            </span>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-6 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              className="p-2 text-neutral-500 hover:text-neutral-900 hover:bg-slate-100 rounded-xl transition"
                              title="Edit listing"
                            >
                              <Edit3 size={15} />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              className="p-2 text-neutral-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition"
                              title="Delete product"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-neutral-400 font-light">
                      <Package size={32} className="mx-auto mb-2 text-neutral-300" />
                      No products found matching your search parameters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer Pagination / Summary Info */}
          <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between text-xs text-neutral-500 font-light">
            <span>Showing {filteredProducts.length} of {products.length} products</span>
            <span>Last inventory sync: Just now</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SellerInventory;