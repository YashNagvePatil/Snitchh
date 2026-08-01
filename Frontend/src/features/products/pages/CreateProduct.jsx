import React, { useState } from 'react';
import { 
  Upload, 
  X, 
  Plus, 
  Store, 
  ArrowLeft, 
  Check, 
  DollarSign, 
  Tag, 
  FileText, 
  Sparkles,
  Info
} from 'lucide-react';

const SIZES_LIST = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'];
const CATEGORIES = ["Men's Shirts", "Men's Trousers", "Women's Dresses", "Women's Tops", "Outerwear", "Accessories"];

const CreateProduct = () => {
  const [images, setImages] = useState([]); // Array of { id, url, file }
  const [selectedSizes, setSelectedSizes] = useState(['M', 'L']);
  const [category, setCategory] = useState("Men's Shirts");
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    originalPrice: '',
    stock: '',
  });

  // Handle image upload (Max 7 images)
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const remainingSlots = 7 - images.length;
    const filesToProcess = files.slice(0, remainingSlots);

    const newImages = filesToProcess.map((file) => ({
      id: Math.random().toString(36).substring(2, 9),
      url: URL.createObjectURL(file),
      file,
    }));

    setImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (id) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const toggleSize = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Product:', {
      ...formData,
      category,
      selectedSizes,
      imageCount: images.length,
      images,
    });
    alert('Product published successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-stone-50/40 to-slate-100/60 font-sans text-neutral-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Top Navigation / Breadcrumb */}
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
                Create New Product
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="px-5 py-2.5 bg-white border border-slate-200/80 hover:bg-slate-50 text-neutral-700 rounded-xl text-xs font-light shadow-2xs transition"
            >
              Save Draft
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-2.5 bg-neutral-900 hover:bg-black text-white rounded-xl text-xs font-light shadow-md shadow-neutral-900/10 transition flex items-center gap-2"
            >
              <Sparkles size={14} className="text-amber-300" />
              <span>Publish Product</span>
            </button>
          </div>
        </div>

        {/* Main Grid: Left = Form Info, Right = 7-Image Uploader */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Main Form Details (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* General Information Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/70 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h2 className="text-lg font-light text-neutral-900 font-serif flex items-center gap-2">
                  <FileText size={18} className="text-neutral-500" />
                  Product Details
                </h2>
                <span className="text-xs font-light text-neutral-400">* Required fields</span>
              </div>

              {/* Product Title */}
              <div>
                <label className="block text-xs font-light text-neutral-600 uppercase tracking-wider mb-1.5">
                  Product Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Oversized Linen Resort Shirt"
                  required
                  className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-light text-neutral-800 placeholder-neutral-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-800 transition"
                />
              </div>

              {/* Category Select */}
              <div>
                <label className="block text-xs font-light text-neutral-600 uppercase tracking-wider mb-1.5">
                  Category *
                </label>
                <div className="relative">
                  <Tag className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" size={15} />
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-slate-50/50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm font-light text-neutral-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-800 transition appearance-none cursor-pointer"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-light text-neutral-600 uppercase tracking-wider mb-1.5">
                  Product Description *
                </label>
                <textarea
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the silhouette, fabric weight, care instructions, and fit details..."
                  className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-light text-neutral-800 placeholder-neutral-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-800 transition leading-relaxed resize-none"
                />
              </div>
            </div>

            {/* Pricing & Stock Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/70 space-y-5">
              <h2 className="text-lg font-light text-neutral-900 font-serif flex items-center gap-2 border-b border-slate-100 pb-3">
                <DollarSign size={18} className="text-neutral-500" />
                Pricing & Inventory
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Regular Price */}
                <div>
                  <label className="block text-xs font-light text-neutral-600 uppercase tracking-wider mb-1.5">
                    Selling Price ($) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="68.00"
                    required
                    className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-light text-neutral-800 placeholder-neutral-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-800 transition"
                  />
                </div>

                {/* Original Price (MSRP) */}
                <div>
                  <label className="block text-xs font-light text-neutral-600 uppercase tracking-wider mb-1.5">
                    Original Price ($)
                  </label>
                  <input
                    type="number"
                    name="originalPrice"
                    value={formData.originalPrice}
                    onChange={handleChange}
                    placeholder="85.00"
                    className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-light text-neutral-800 placeholder-neutral-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-800 transition"
                  />
                </div>

                {/* Initial Stock */}
                <div>
                  <label className="block text-xs font-light text-neutral-600 uppercase tracking-wider mb-1.5">
                    Available Stock *
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    placeholder="50"
                    required
                    className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-light text-neutral-800 placeholder-neutral-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-800 transition"
                  />
                </div>
              </div>
            </div>

            {/* Size Options Selector */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/70 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h2 className="text-lg font-light text-neutral-900 font-serif">
                  Available Sizes
                </h2>
                <span className="text-xs font-light text-neutral-500">
                  {selectedSizes.length} selected
                </span>
              </div>

              <p className="text-xs font-light text-neutral-500">
                Select all sizes currently manufactured for this listing:
              </p>

              <div className="flex flex-wrap gap-2 pt-1">
                {SIZES_LIST.map((size) => {
                  const isSelected = selectedSizes.includes(size);
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => toggleSize(size)}
                      className={`h-11 min-w-[50px] px-4 rounded-xl text-xs font-light border transition-all duration-200 flex items-center justify-center gap-1.5 ${
                        isSelected
                          ? 'bg-neutral-900 text-white border-neutral-900 shadow-xs'
                          : 'bg-white text-neutral-700 border-slate-200 hover:border-slate-400'
                      }`}
                    >
                      {isSelected && <Check size={12} />}
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: 7-Image Media Upload Grid (5 cols) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/70 space-y-5">
              
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h2 className="text-lg font-light text-neutral-900 font-serif">
                    Product Imagery
                  </h2>
                  <p className="text-xs font-light text-neutral-500">
                    Upload up to 7 photos
                  </p>
                </div>
                <span className={`text-xs font-light px-2.5 py-1 rounded-full border ${
                  images.length === 7 
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-slate-100 text-neutral-600 border-slate-200'
                }`}>
                  {images.length} / 7
                </span>
              </div>

              {/* Main Banner / Upload Slot Grid */}
              <div className="space-y-3">
                
                {/* 1. Primary Cover Image Slot */}
                <div className="relative aspect-[4/3] rounded-2xl border-2 border-dashed border-slate-200/90 bg-slate-50/50 hover:bg-slate-50 transition overflow-hidden group flex flex-col items-center justify-center text-center p-4">
                  {images[0] ? (
                    <>
                      <img
                        src={images[0].url}
                        alt="Primary Cover"
                        className="w-full h-full object-cover rounded-xl"
                      />
                      <span className="absolute top-3 left-3 bg-neutral-900/80 backdrop-blur-md text-white text-[10px] uppercase font-light tracking-widest px-2.5 py-1 rounded-md">
                        Cover Photo
                      </span>
                      <button
                        type="button"
                        onClick={() => removeImage(images[0].id)}
                        className="absolute top-3 right-3 p-1.5 bg-neutral-900/70 hover:bg-neutral-900 text-white rounded-full transition"
                      >
                        <X size={14} />
                      </button>
                    </>
                  ) : (
                    <label className="cursor-pointer w-full h-full flex flex-col items-center justify-center">
                      <div className="p-3 bg-white rounded-full shadow-2xs border border-slate-200/80 mb-2 group-hover:scale-110 transition-transform">
                        <Upload size={20} className="text-neutral-600" />
                      </div>
                      <span className="text-xs font-light text-neutral-800">
                        Upload Cover Image
                      </span>
                      <span className="text-[11px] font-light text-neutral-400 mt-1">
                        High-res PNG, JPG or WEBP
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>

                {/* 2. Remaining 6 Thumbnail Slots */}
                <div className="grid grid-cols-3 gap-2.5 pt-1">
                  {Array.from({ length: 6 }).map((_, index) => {
                    const imgIndex = index + 1; // slots 1 to 6
                    const image = images[imgIndex];

                    return (
                      <div
                        key={index}
                        className="relative aspect-square rounded-xl border border-dashed border-slate-200 bg-slate-50/60 hover:bg-slate-100/80 transition overflow-hidden flex items-center justify-center text-center"
                      >
                        {image ? (
                          <>
                            <img
                              src={image.url}
                              alt={`Slot ${imgIndex + 1}`}
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(image.id)}
                              className="absolute top-1.5 right-1.5 p-1 bg-neutral-900/70 hover:bg-neutral-900 text-white rounded-full transition"
                            >
                              <X size={12} />
                            </button>
                          </>
                        ) : (
                          <label className={`w-full h-full flex flex-col items-center justify-center p-2 ${
                            images.length < 7 ? 'cursor-pointer' : 'cursor-not-allowed opacity-40'
                          }`}>
                            <Plus size={16} className="text-neutral-400 mb-1" />
                            <span className="text-[10px] font-light text-neutral-400">
                              Slot {imgIndex + 1}
                            </span>
                            <input
                              type="file"
                              accept="image/*"
                              disabled={images.length >= 7}
                              onChange={handleImageUpload}
                              className="hidden"
                            />
                          </label>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Info Note */}
                <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-2xl flex items-start gap-2.5 mt-4">
                  <Info size={16} className="text-neutral-400 shrink-0 mt-0.5" />
                  <p className="text-[11px] font-light text-neutral-500 leading-relaxed">
                    First image will be displayed as the main catalog thumbnail. You can upload up to 7 images showing front, back, and close-up fabric details.
                  </p>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default CreateProduct