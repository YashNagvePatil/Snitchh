import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, ShoppingBag, Store, ArrowRight } from 'lucide-react';

    const Login = () => {
  const [role, setRole] = useState('buyer'); // 'buyer' | 'seller'
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login Data:', { ...formData, role, rememberMe });
  };

  return (
    <div className="min-h-screen w-full bg-slate-100/70 flex items-center justify-center font-sans p-4 sm:p-6 lg:p-8">
      {/* Main Container */}
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden flex flex-col md:flex-row border border-slate-200/60">
        
        {/* LEFT SIDE: Login Form */}
        <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-between bg-gradient-to-br from-white via-slate-50/70 to-stone-100/50">
          <div>
            {/* Header / Brand */}
            <div className="flex items-center justify-between mb-8">
              <span className="text-2xl font-semibold tracking-wider text-neutral-900 font-serif">
                SNITCH<span className="text-xs font-sans tracking-normal align-top ml-1 text-neutral-400">®</span>
              </span>
              <span className="text-xs font-light text-neutral-500 uppercase tracking-widest bg-white/80 border border-slate-200 px-3 py-1 rounded-full shadow-xs">
                Sign In
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-light text-neutral-800 tracking-tight mb-1.5">
              Welcome back
            </h1>
            <p className="text-xs sm:text-sm font-light text-neutral-500 mb-6">
              Enter your details to sign in to your Snitch account.
            </p>

            {/* Role Toggle Switch */}
            <div className="mb-6">
              <label className="block text-xs font-light tracking-wider text-neutral-500 uppercase mb-2">
                Sign in as
              </label>
              <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-200/60 rounded-2xl border border-slate-200/80">
                <button
                  type="button"
                  onClick={() => setRole('buyer')}
                  className={`flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-xs font-normal transition-all duration-200 ${
                    role === 'buyer'
                      ? 'bg-white text-neutral-900 shadow-sm border border-slate-200/80 font-medium'
                      : 'text-neutral-500 hover:text-neutral-800'
                  }`}
                >
                  <ShoppingBag size={14} />
                  Buyer
                </button>
                <button
                  type="button"
                  onClick={() => setRole('seller')}
                  className={`flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-xs font-normal transition-all duration-200 ${
                    role === 'seller'
                      ? 'bg-white text-neutral-900 shadow-sm border border-slate-200/80 font-medium'
                      : 'text-neutral-500 hover:text-neutral-800'
                  }`}
                >
                  <Store size={14} />
                  Seller
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Input */}
              <div>
                <label className="block text-xs font-light text-neutral-600 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="alex@example.com"
                    required
                    className="w-full bg-white/90 border border-slate-200/90 rounded-xl pl-10 pr-4 py-2.5 text-sm font-light text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-800 transition"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-light text-neutral-600">
                    Password
                  </label>
                  <a
                    href="#forgot"
                    className="text-xs font-light text-neutral-500 hover:text-neutral-900 transition underline underline-offset-2"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                    className="w-full bg-white/90 border border-slate-200/90 rounded-xl pl-10 pr-10 py-2.5 text-sm font-light text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-800 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Remember Me Checkbox */}
              <div className="flex items-center pt-1">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-neutral-900 focus:ring-neutral-800/20 accent-neutral-900 cursor-pointer"
                />
                <label htmlFor="rememberMe" className="ml-2 text-xs font-light text-neutral-600 cursor-pointer select-none">
                  Keep me signed in
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full mt-3 bg-neutral-900 hover:bg-black text-white font-light text-sm py-3 px-4 rounded-xl shadow-md shadow-neutral-900/10 transition-all duration-200 flex items-center justify-center gap-2 group"
              >
                <span>Sign In as {role === 'buyer' ? 'Buyer' : 'Seller'}</span>
                <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </form>
          </div>

          {/* Footer link */}
          <div className="mt-8 pt-4 border-t border-slate-200/60 text-center text-xs font-light text-neutral-500">
            Don't have an account?{' '}
            <a href="#register" className="text-neutral-900 font-normal underline underline-offset-4 hover:opacity-80">
              Create one
            </a>
          </div>
        </div>

        {/* RIGHT SIDE: Visual Showcase Panel */}
        <div className="hidden md:flex md:w-1/2 bg-slate-200 relative overflow-hidden flex-col justify-between p-12">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1200&auto=format&fit=crop')`,
            }}
          />
          {/* Soft gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-neutral-900/20 to-transparent" />

          {/* Top Tag */}
          <div className="relative z-10 text-right">
            <span className="text-[11px] uppercase tracking-widest text-white/90 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 font-light">
              Spring / Summer '26
            </span>
          </div>

          {/* Bottom Caption */}
          <div className="relative z-10 text-white space-y-2">
            <p className="text-xs font-light text-white/70 uppercase tracking-widest">
              Snitch Portal
            </p>
            <h2 className="text-3xl font-light tracking-tight leading-tight">
              Elevate your daily wardrobing.
            </h2>
            <p className="text-xs font-light text-white/80 max-w-sm">
              Log in to track orders, manage active listings, or explore exclusive streetwear drops.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

  export default Login