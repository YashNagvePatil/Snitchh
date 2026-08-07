import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  ShoppingBag, 
  Heart, 
  Sparkles, 
  SlidersHorizontal,
  CheckCircle2
} from 'lucide-react';
import { useSelector } from 'react-redux';
import useProduct from '../hooks/useProduct.js';
import { useNavigate } from 'react-router';

// 1. Hero Banner Slides Data (4 Banners)
const HERO_SLIDES = [
  {
    id: 1,
    tag: 'Summer Drop \'26',
    title: 'Linen & Air-Loom Essentials',
    subtitle: 'Breathable silhouettes crafted for effortless warm-weather layering.',
    buttonText: 'Explore Collection',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 2,
    tag: 'Men\'s Tailored Line',
    title: 'Clean Cuts & Urban Utility',
    subtitle: 'Structured overshirts, relaxed trousers, and versatile everyday wear.',
    buttonText: 'Shop Men\'s',
    image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 3,
    tag: 'Women\'s Luxe Collection',
    title: 'Minimalist Modern Elegance',
    subtitle: 'Monochrome dresses, soft knits, and tailored outerwear drops.',
    buttonText: 'Shop Women\'s',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 4,
    tag: 'Limited Capsule',
    title: 'Monochrome Accessories',
    subtitle: 'Precision-crafted leather goods, footwear, and subtle statement pieces.',
    buttonText: 'Discover Capsule',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1600&auto=format&fit=crop',
  },
];

// 2. Sample Products Data
const PRODUCTS = [
  {
    id: 1,
    name: 'Oversized Linen Resort Shirt',
    category: 'Men',
    price: '$68',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800&auto=format&fit=crop',
    tag: 'Bestseller',
  },
  {
    id: 2,
    name: 'Structured Trench Blazer',
    category: 'Women',
    price: '$120',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=800&auto=format&fit=crop',
    tag: 'New',
  },
  {
    id: 3,
    name: 'Relaxed Fit Utility Trousers',
    category: 'Men',
    price: '$85',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=800&auto=format&fit=crop',
    tag: 'Trending',
  },
  {
    id: 4,
    name: 'Ribbed Knit Midi Dress',
    category: 'Women',
    price: '$95',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop',
    tag: 'Exclusive',
  },
];

const Home = () => {
  const navigate = useNavigate()
  const  {handleGetAllproducts} = useProduct()
  const products = useSelector(state => state.product.products)


  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'men' | 'women'
  const [wishlist, setWishlist] = useState([]);

  // Auto-slide effect (every 5 seconds)

  console.log(products)


  // useEffect(()=>{
  //   handleGetAllproducts()
  // },[])


  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  
    

    }, 5000);    
    return () => clearInterval(timer);
      
  }, []);
 
  

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredProducts = PRODUCTS.filter((p) => {
    if (activeTab === 'men') return p.category === 'Men';
    if (activeTab === 'women') return p.category === 'Women';
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-stone-50/40 to-slate-100/60 font-sans text-neutral-800 pb-20">
      
      {/* ================= HERO BANNER SLIDER (4 SLIDES) ================= */}
      <section className="relative w-full max-w-7xl mx-auto pt-4 px-4 sm:px-6 lg:px-8">
        <div className="relative h-[500px] sm:h-[580px] lg:h-[620px] w-full rounded-3xl overflow-hidden shadow-xl shadow-slate-200/60 border border-slate-200/80 bg-neutral-900">
          
          {/* Slide Background Image & Content */}
          {HERO_SLIDES.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-10000 ease-out"
              />
              
              {/* Soft Gradient Overlay for Readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/80 via-neutral-950/40 to-transparent" />

              {/* Text overlay */}
              <div className="absolute inset-0 flex flex-col justify-end sm:justify-center p-8 sm:p-16 lg:p-20 text-white max-w-2xl">
                <span className="inline-flex items-center gap-1.5 text-xs font-light tracking-widest uppercase text-slate-200 bg-white/10 backdrop-blur-md border border-white/20 px-3.5 py-1 rounded-full w-fit mb-4">
                  <Sparkles size={12} className="text-amber-300" />
                  {slide.tag}
                </span>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight leading-none mb-4 font-serif">
                  {slide.title}
                </h1>

                <p className="text-xs sm:text-sm font-light text-slate-300 mb-8 max-w-lg leading-relaxed">
                  {slide.subtitle}
                </p>

                <div>
                  <button className="bg-white text-neutral-900 hover:bg-neutral-100 font-light text-xs sm:text-sm px-6 py-3.5 rounded-2xl shadow-lg transition-all duration-200 flex items-center gap-2 group">
                    <span>{slide.buttonText}</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-2.5 rounded-full backdrop-blur-md border border-white/30 transition"
            aria-label="Previous Slide"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-2.5 rounded-full backdrop-blur-md border border-white/30 transition"
            aria-label="Next Slide"
          >
            <ChevronRight size={20} />
          </button>

          {/* Slide Indicator Dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-neutral-950/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
            {HERO_SLIDES.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ================= CATEGORIES SECTION (MEN'S & WOMEN'S) ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-24">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-2">
          <div>
            <span className="text-xs font-light uppercase tracking-widest text-neutral-500">
              Curated Lines
            </span>
            <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-neutral-900 font-serif mt-1">
              Shop by Category
            </h2>
          </div>
          <p className="text-xs font-light text-neutral-500 max-w-xs">
            Tailored specifically for distinct fits and everyday minimalism.
          </p>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Men's Category Card */}
          <div className="group relative h-80 sm:h-96 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-200/70 bg-white flex flex-col justify-end p-8">
            <img
              src="https://images.unsplash.com/photo-1488161628813-04466f872be2?q=80&w=1000&auto=format&fit=crop"
              alt="Men's Collection"
              className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/75 via-neutral-950/20 to-transparent" />

            <div className="relative z-10 text-white flex items-end justify-between">
              <div>
                <span className="text-[11px] font-light uppercase tracking-widest text-slate-300">
                  Collection
                </span>
                <h3 className="text-2xl font-light tracking-wide font-serif mt-1">
                  Men's Fashion
                </h3>
                <div className="flex gap-2 mt-3">
                  <span className="text-[11px] font-light bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-lg">Shirts</span>
                  <span className="text-[11px] font-light bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-lg">Denim</span>
                  <span className="text-[11px] font-light bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-lg">Outerwear</span>
                </div>
              </div>

              <button
                onClick={() => setActiveTab('men')}
                className="p-3 bg-white text-neutral-900 rounded-full shadow-md group-hover:bg-neutral-900 group-hover:text-white transition-all duration-300"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

          {/* Women's Category Card */}
          <div className="group relative h-80 sm:h-96 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-200/70 bg-white flex flex-col justify-end p-8">
            <img
              src="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000&auto=format&fit=crop"
              alt="Women's Collection"
              className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/75 via-neutral-950/20 to-transparent" />

            <div className="relative z-10 text-white flex items-end justify-between">
              <div>
                <span className="text-[11px] font-light uppercase tracking-widest text-slate-300">
                  Collection
                </span>
                <h3 className="text-2xl font-light tracking-wide font-serif mt-1">
                  Women's Fashion
                </h3>
                <div className="flex gap-2 mt-3">
                  <span className="text-[11px] font-light bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-lg">Dresses</span>
                  <span className="text-[11px] font-light bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-lg">Tops</span>
                  <span className="text-[11px] font-light bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-lg">Co-ords</span>
                </div>
              </div>

              <button
                onClick={() => setActiveTab('women')}
                className="p-3 bg-white text-neutral-900 rounded-full shadow-md group-hover:bg-neutral-900 group-hover:text-white transition-all duration-300"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ================= PRODUCT SHOWCASE SECTION ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 sm:mt-28">
        
        {/* Filter Tabs Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-b border-slate-200/80 pb-6 mb-8 gap-4">
          <div>
            <span className="text-xs font-light uppercase tracking-widest text-neutral-500">
              New Arrivals
            </span>
            <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-neutral-900 font-serif mt-1">
              Featured Products
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-200/60 rounded-2xl border border-slate-200/80">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-1.5 rounded-xl text-xs font-light transition-all duration-200 ${
                activeTab === 'all'
                  ? 'bg-white text-neutral-900 shadow-xs font-normal'
                  : 'text-neutral-500 hover:text-neutral-800'
              }`}
            >
              All Drops
            </button>
            <button
              onClick={() => setActiveTab('men')}
              className={`px-4 py-1.5 rounded-xl text-xs font-light transition-all duration-200 ${
                activeTab === 'men'
                  ? 'bg-white text-neutral-900 shadow-xs font-normal'
                  : 'text-neutral-500 hover:text-neutral-800'
              }`}
            >
              Men
            </button>
            <button
              onClick={() => setActiveTab('women')}
              className={`px-4 py-1.5 rounded-xl text-xs font-light transition-all duration-200 ${
                activeTab === 'women'
                  ? 'bg-white text-neutral-900 shadow-xs font-normal'
                  : 'text-neutral-500 hover:text-neutral-800'
              }`}
            >
              Women
            </button>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              onClick={()=>navigate(`/product/${product._id}`)}             
              key={product.id}
              className="group bg-white rounded-3xl border border-slate-200/70 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/5] bg-slate-100 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />

                {/* Badge Tag */}
                <span className="absolute top-3 left-3 text-[10px] uppercase font-light tracking-widest bg-white/90 backdrop-blur-md border border-slate-200/60 text-neutral-800 px-2.5 py-1 rounded-full">
                  {product.tag}
                </span>

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md border transition ${
                    wishlist.includes(product.id)
                      ? 'bg-rose-500 text-white border-rose-500'
                      : 'bg-white/80 text-neutral-600 hover:bg-white border-slate-200'
                  }`}
                >
                  <Heart size={14} fill={wishlist.includes(product.id) ? 'currentColor' : 'none'} />
                </button>
              </div>

              {/* Product Info */}
              <div className="p-5 flex flex-col gap-2">
                <span className="text-[11px] font-light text-neutral-400 uppercase tracking-wider">
                  {product.category}
                </span>

                <h3 className="text-sm font-light text-neutral-800 tracking-tight line-clamp-1 group-hover:text-neutral-950 transition">
                  {product.name}
                </h3>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 mt-1">
                  <span className="text-base font-normal text-neutral-900 font-serif">
                    {product.price}
                  </span>

                  <button className="flex items-center gap-1.5 text-xs font-light text-neutral-800 bg-slate-100 hover:bg-neutral-900 hover:text-white px-3 py-1.5 rounded-xl transition-colors duration-200">
                    <ShoppingBag size={13} />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= LIGHT BRAND PROMISE BANNER ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="bg-white/80 border border-slate-200/80 rounded-3xl p-8 sm:p-12 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="flex flex-col items-center gap-2">
            <CheckCircle2 size={20} className="text-neutral-800" />
            <h4 className="text-sm font-medium text-neutral-800">Express Shipping</h4>
            <p className="text-xs font-light text-neutral-500">Free delivery on all orders above $100.</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <CheckCircle2 size={20} className="text-neutral-800" />
            <h4 className="text-sm font-medium text-neutral-800">Sustainable Materials</h4>
            <p className="text-xs font-light text-neutral-500">100% organic linen and recycled cotton blends.</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <CheckCircle2 size={20} className="text-neutral-800" />
            <h4 className="text-sm font-medium text-neutral-800">Seamless Returns</h4>
            <p className="text-xs font-light text-neutral-500">30-day effortless return and exchange policy.</p>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;