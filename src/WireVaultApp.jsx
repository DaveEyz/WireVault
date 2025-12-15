import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, Lock, Zap, ChevronRight, Activity, Globe, Menu, X, 
  ArrowUpRight, ArrowDownRight, Database, Layers, Hexagon, CheckCircle2, 
  LayoutDashboard, FileText, Map, User, LogOut, Wallet, 
  Bot, Terminal, Send, Twitter, MessageCircle, Send as TelegramIcon, Facebook, BookOpen, Github
} from 'lucide-react';
import LiquidChrome from '../components/LiquidChrome';

// --- Shared Components ---

const Button = ({ children, variant = 'primary', className = '', icon: Icon, onClick, disabled }) => {
  const baseStyle = "inline-flex items-center justify-center gap-2 px-6 py-3 font-mono font-bold text-sm tracking-wider transition-all duration-300 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed rounded-sm";
  
  const variants = {
    primary: "bg-[#ccff00] text-black hover:bg-white hover:shadow-[0_0_20px_rgba(204,255,0,0.4)]",
    outline: "border border-white/20 text-white hover:border-[#ccff00] hover:text-[#ccff00] bg-transparent",
    ghost: "text-gray-400 hover:text-white hover:bg-white/5",
    danger: "text-red-500 hover:bg-red-500/10 border border-red-500/20"
  };

  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {children}
      {Icon && <Icon className="w-4 h-4" />}
    </button>
  );
};

const FadeIn = ({ children, delay = 0, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// Toast Notification Component
const Toast = ({ message, type = 'success', onClose, isVisible }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const icons = {
    success: CheckCircle2,
    error: X,
    info: Activity
  };

  const colors = {
    success: 'bg-[#ccff00]/10 border-[#ccff00]/30 text-[#ccff00]',
    error: 'bg-red-500/10 border-red-500/30 text-red-400',
    info: 'bg-blue-500/10 border-blue-500/30 text-blue-400'
  };

  const Icon = icons[type] || icons.success;

  return (
    <div 
      className={`fixed top-20 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-lg border backdrop-blur-md shadow-2xl animate-fade-in-down ${colors[type]}`}
      style={{ animation: 'slideInRight 0.3s ease-out' }}
    >
      <Icon className="w-5 h-5 flex-shrink-0" />
      <span className="font-mono text-sm font-semibold">{message}</span>
      <button
        onClick={onClose}
        className="ml-2 hover:opacity-70 transition-opacity"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};


// Intro Experience Component
const IntroExperience = ({ onDismiss }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleDismiss = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsVisible(false);
      onDismiss();
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}
      onClick={handleDismiss}
    >
      <div 
        className="max-w-2xl mx-6 bg-[#111] border border-[#ccff00]/30 rounded-2xl p-8 md:p-12 relative overflow-hidden animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#ccff00]/10 rounded-full blur-3xl"></div>
        
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="relative w-20 h-20">
            <img 
              src="/assets/WireVault_LOGO.jpg" 
              alt="WireVault Logo" 
              className="w-full h-full object-contain rounded-lg"
            />
            <div className="absolute inset-0 bg-[#ccff00]/20 rounded-lg animate-pulse"></div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">
            Welcome to <span className="text-[#ccff00]">WireVault</span>
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed">
            Institutional Defense Layer for your crypto assets.
          </p>
          <p className="text-gray-500 leading-relaxed">
            WireVault isn't just a wallet. It's a fortified mesh of smart contracts designed to protect your alpha with time-locked vaults, flash liquidation, and global consensus.
          </p>
          
          {/* Features */}
          <div className="grid md:grid-cols-3 gap-4 mt-8">
            {[
              { icon: Lock, text: "Time-Locked Vaults" },
              { icon: Zap, text: "Flash Liquidation" },
              { icon: Globe, text: "Global Consensus" }
            ].map((feature, i) => (
              <div key={i} className="flex flex-col items-center gap-2 p-4 bg-black/50 rounded-lg border border-white/5 hover:border-[#ccff00]/30 transition-all">
                <feature.icon className="w-6 h-6 text-[#ccff00]" />
                <span className="text-sm text-gray-400">{feature.text}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button onClick={handleDismiss} variant="primary" icon={ChevronRight}>
              GET STARTED
            </Button>
            <Button onClick={handleDismiss} variant="outline">
              EXPLORE
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Views ---

// Coin data for live charts
const COINS = [
  { symbol: 'BTC', name: 'Bitcoin', coinGeckoId: 'bitcoin' },
  { symbol: 'ETH', name: 'Ethereum', coinGeckoId: 'ethereum' },
  { symbol: 'SOL', name: 'Solana', coinGeckoId: 'solana' },
  { symbol: 'BNB', name: 'BNB', coinGeckoId: 'binancecoin' }
];

// Live Chart Component
const LiveChartSection = () => {
  const [selectedCoin, setSelectedCoin] = useState('BTC');
  const [coinPrice, setCoinPrice] = useState(null);
  const [priceChange, setPriceChange] = useState(null);

  // Fetch live price data
  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const selectedCoinData = COINS.find(c => c.symbol === selectedCoin);
        if (!selectedCoinData) return;

        const response = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${selectedCoinData.coinGeckoId}&vs_currencies=usd&include_24hr_change=true`
        );
        const data = await response.json();
        
        if (data[selectedCoinData.coinGeckoId]) {
          setCoinPrice(data[selectedCoinData.coinGeckoId].usd);
          setPriceChange(data[selectedCoinData.coinGeckoId].usd_24h_change);
        }
      } catch (error) {
        console.error('Error fetching price:', error);
      }
    };

    fetchPrice();
    const interval = setInterval(fetchPrice, 10000); // Update every 10 seconds
    return () => clearInterval(interval);
  }, [selectedCoin]);

  const selectedCoinData = COINS.find(c => c.symbol === selectedCoin);
  
  // TradingView chart symbol mapping
  const getTradingViewSymbol = (symbol) => {
    const mapping = {
      'BTC': 'BINANCE:BTCUSDT',
      'ETH': 'BINANCE:ETHUSDT',
      'SOL': 'BINANCE:SOLUSDT',
      'BNB': 'BINANCE:BNBUSDT'
    };
    return mapping[symbol] || 'BINANCE:BTCUSDT';
  };

  return (
    <div className="space-y-4">
      {/* Coin Selector */}
      <div className="flex flex-wrap gap-2 justify-center">
        {COINS.map((coin) => (
          <button
            key={coin.symbol}
            onClick={() => setSelectedCoin(coin.symbol)}
            className={`px-4 py-2 rounded-lg font-mono text-sm font-semibold transition-all duration-300 ${
              selectedCoin === coin.symbol
                ? 'bg-[#ccff00] text-black border-2 border-[#ccff00] shadow-[0_0_20px_rgba(204,255,0,0.3)]'
                : 'bg-[#111] text-gray-400 border-2 border-white/10 hover:border-[#ccff00]/50 hover:text-white'
            }`}
          >
            {coin.symbol}
          </button>
        ))}
      </div>

      {/* Price Info */}
      {coinPrice && (
        <div className="bg-[#111] border border-white/10 rounded-xl p-4 backdrop-blur-sm">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h3 className="text-lg font-bold flex items-center gap-2 flex-wrap">
                {selectedCoinData?.name} ({selectedCoin})
                <span className={`text-sm font-mono px-2 py-1 rounded ${
                  priceChange >= 0 
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                    : 'bg-red-500/20 text-red-400 border border-red-500/30'
                }`}>
                  {priceChange >= 0 ? '+' : ''}{priceChange?.toFixed(2)}%
                </span>
              </h3>
              <p className="text-2xl font-bold font-mono mt-1 text-[#ccff00]">
                ${coinPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-mono">Live</span>
            </div>
          </div>
        </div>
      )}

      {/* Chart Container */}
      <div className="bg-[#111] border border-white/10 rounded-xl p-6 overflow-hidden">
        <iframe
          src={`https://www.tradingview.com/widgetembed/?symbol=${getTradingViewSymbol(selectedCoin)}&interval=1&theme=dark&style=1&locale=en&toolbar_bg=111111&enable_publishing=false&hide_top_toolbar=true&hide_legend=false&save_image=false&studies=Volume&hide_volume=false`}
          className="w-full h-[500px] border-0 rounded-lg"
          title={`${selectedCoin} Live Chart`}
          allow="clipboard-read; clipboard-write"
        />
      </div>

      {/* Chart Info */}
      <div className="text-center">
        <p className="text-xs text-gray-500 font-mono">
          Powered by TradingView • Data updates in real-time
        </p>
      </div>
    </div>
  );
};

// 1. HOME VIEW
const HomeView = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const [securityStats, setSecurityStats] = useState({
    inbound: 0,
    blocked: 0,
    uptime: 99.99,
    lastActivity: '2m ago',
    transactions: 0
  });

  // Simulate realistic security stats updates
  useEffect(() => {
    // Initialize with realistic values
    setSecurityStats({
      inbound: 2.45,
      blocked: 127,
      uptime: 99.98,
      lastActivity: '2m ago',
      transactions: 1847
    });

    // Update stats periodically for realism
    const interval = setInterval(() => {
      setSecurityStats(prev => ({
        inbound: prev.inbound + (Math.random() * 0.1 - 0.05),
        blocked: prev.blocked + (Math.random() > 0.7 ? 1 : 0),
        uptime: Math.max(99.5, prev.uptime + (Math.random() * 0.01 - 0.005)),
        lastActivity: ['Just now', '1m ago', '2m ago', '3m ago'][Math.floor(Math.random() * 4)],
        transactions: prev.transactions + Math.floor(Math.random() * 3)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleJoin = async (e) => {
    e.preventDefault();
    if (!email) {
      setToastMessage('Please enter a valid email address');
      setToastType('error');
      setShowToast(true);
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setToastMessage('Invalid email format');
      setToastType('error');
      setShowToast(true);
      return;
    }

    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      // Store in localStorage for demo purposes
      const waitlist = JSON.parse(localStorage.getItem('wirevault_waitlist') || '[]');
      if (!waitlist.includes(email)) {
        waitlist.push(email);
        localStorage.setItem('wirevault_waitlist', JSON.stringify(waitlist));
      }
      
      setStatus('success');
      setEmail('');
      setToastMessage('Successfully joined the waitlist! We\'ll notify you soon.');
      setToastType('success');
      setShowToast(true);
      
      // Reset status after showing success
      setTimeout(() => {
        setStatus('idle');
      }, 2000);
    }, 1500);
  };

  return (
    <div className="space-y-32 pb-20">
      {/* Hero */}
      <section className="min-h-[80vh] flex items-center relative overflow-hidden rounded-2xl">
        {/* Liquid Chrome Background */}
        <div className="absolute inset-0 w-full h-full z-0 opacity-60">
          <LiquidChrome
            baseColor={[0.08, 0.1, 0.08]}
            speed={0.12}
            amplitude={0.35}
            frequencyX={2.5}
            frequencyY={2.5}
            interactive={true}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
        
        {/* Subtle overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 z-[1] pointer-events-none"></div>
        
        {/* Content Overlay */}
        <div className="grid lg:grid-cols-2 gap-16 items-center w-full relative z-10 p-8 md:p-12">
          <FadeIn>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[1.1] mb-6 text-white drop-shadow-[0_0_20px_rgba(0,0,0,0.8)]">
              Institutional <br/>
              <span className="text-[#ccff00] drop-shadow-[0_0_15px_rgba(204,255,0,0.5)]">Defense Layer.</span>
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-lg leading-relaxed drop-shadow-[0_0_10px_rgba(0,0,0,0.6)]">
              WireVault isn't just a wallet. It's a fortified mesh of smart contracts designed to bleed attackers and protect your alpha.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button onClick={() => onNavigate('dashboard')} variant="primary" icon={ChevronRight}>LAUNCH APP</Button>
              <Button onClick={() => onNavigate('security')} variant="outline" icon={Shield}>VIEW AUDITS</Button>
            </div>
            <div className="mt-12 flex items-center gap-4 text-sm text-gray-500 font-mono">
              <div className="flex -space-x-2">
                {[
                  { name: 'Alex Chen', initials: 'AC' },
                  { name: 'Sarah Kim', initials: 'SK' },
                  { name: 'Marcus Johnson', initials: 'MJ' }
                ].map((user, i) => (
                  <div 
                    key={i}
                    className="relative group"
                    title={user.name}
                  >
                    <img
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=ccff00&color=000000&size=128&bold=true&font-size=0.5`}
                      alt={user.name}
                      className="w-10 h-10 rounded-full border-2 border-black hover:border-[#ccff00] transition-all duration-300 hover:scale-110 cursor-pointer shadow-lg"
                    />
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-black rounded-full"></div>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <p>
                  {(JSON.parse(localStorage.getItem('wirevault_waitlist') || '[]').length + 1042).toLocaleString()} Secured Users
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            {/* 3D Visual */}
            <div className="relative h-[400px] flex items-center justify-center">
              <div className="absolute inset-0 bg-[#ccff00] blur-[150px] opacity-10"></div>
              <div className="relative w-64 h-64 border border-white/10 rounded-full animate-[spin_20s_linear_infinite]">
                 <div className="absolute inset-0 border-t border-[#ccff00] rounded-full"></div>
              </div>
              <div className="absolute w-48 h-48 border border-white/20 rounded-full animate-[spin_15s_linear_infinite_reverse] rotate-45"></div>
              <div className="absolute z-10 bg-black/70 border border-[#ccff00]/20 p-3 rounded-xl backdrop-blur-sm shadow-xl min-w-[200px] max-w-[220px] bottom-8 right-8 md:bottom-12 md:right-12">
                {/* Header */}
                <div className="flex items-center justify-between mb-2 border-b border-white/5 pb-2">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-[#ccff00] rounded-full animate-pulse"></div>
                    <span className="text-[10px] text-gray-400 font-mono uppercase tracking-wider">Status</span>
                  </div>
                  <span className="text-[10px] text-[#ccff00] font-bold font-mono px-1.5 py-0.5 bg-[#ccff00]/10 rounded border border-[#ccff00]/20">
                    SECURE
                  </span>
                </div>
                
                {/* Stats Grid */}
                <div className="space-y-1.5 font-mono text-[10px]">
                  {/* Inbound Transactions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-gray-400">
                      <Activity className="w-2.5 h-2.5 text-[#ccff00]/60" />
                      <span>Inbound</span>
                    </div>
                    <span className="text-white font-semibold tabular-nums text-[10px]">
                      {securityStats.inbound.toFixed(2)} ETH
                    </span>
                  </div>
                  
                  {/* Blocked Attempts */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-gray-400">
                      <Shield className="w-2.5 h-2.5 text-red-500/60" />
                      <span>Blocked</span>
                    </div>
                    <span className="text-red-400 font-semibold tabular-nums text-[10px]">
                      {securityStats.blocked.toLocaleString()}
                    </span>
                  </div>
                  
                  {/* Uptime */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-gray-400">
                      <CheckCircle2 className="w-2.5 h-2.5 text-green-500/60" />
                      <span>Uptime</span>
                    </div>
                    <span className="text-green-400 font-semibold tabular-nums text-[10px]">
                      {securityStats.uptime.toFixed(2)}%
                    </span>
                  </div>
                  
                  {/* Divider */}
                  <div className="border-t border-white/5 my-1"></div>
                  
                  {/* Additional Info */}
                  <div className="flex items-center justify-between text-gray-500">
                    <span className="text-[9px]">Activity</span>
                    <span className="text-[9px] font-semibold text-gray-400">{securityStats.lastActivity}</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-500">
                    <span className="text-[9px]">TX</span>
                    <span className="text-[9px] font-semibold text-gray-400">{securityStats.transactions.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Hardened Infrastructure</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Lock, title: "Time-Locked Vaults", desc: "Assets unlock only when you say so. Even we can't touch them." },
            { icon: Zap, title: "Flash Liquidation", desc: "Automated exit strategies that trigger milliseconds before a crash." },
            { icon: Globe, title: "Global Consensus", desc: "A decentralized mesh of nodes verifies every signature." }
          ].map((feature, i) => (
            <FadeIn key={i} delay={i * 100}>
              <div className="bg-[#111] border border-white/5 p-8 hover:border-[#ccff00]/30 transition-all duration-300 group hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(204,255,0,0.1)] cursor-pointer">
                <feature.icon className="w-8 h-8 text-[#ccff00] mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-bold mb-2 group-hover:text-[#ccff00] transition-colors duration-300">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">{feature.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Waitlist CTA */}
      <section className="bg-gradient-to-br from-[#111] to-black border border-white/10 rounded-3xl p-12 text-center relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#ccff00]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#ccff00]/3 rounded-full blur-3xl"></div>
        
        {/* Content */}
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#ccff00]/10 border border-[#ccff00]/30 rounded-full mb-6">
            <Activity className="w-4 h-4 text-[#ccff00]" />
            <span className="text-xs font-mono text-[#ccff00] font-semibold uppercase tracking-wider">Early Access</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Join the <span className="text-[#ccff00]">Closed Beta</span>
          </h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            Be among the first to experience WireVault's institutional-grade security. Get priority access when we launch.
          </p>
          
          {status === 'success' ? (
            <div className="inline-flex items-center gap-3 text-[#ccff00] font-mono border border-[#ccff00]/30 px-8 py-4 bg-[#ccff00]/10 rounded-xl backdrop-blur-sm">
              <CheckCircle2 className="w-6 h-6" />
              <div className="text-left">
                <div className="font-bold text-base">Added to Priority Queue</div>
                <div className="text-xs text-gray-400">Check your email for confirmation</div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleJoin} className="max-w-lg mx-auto">
              <div className="flex gap-3 mb-4">
                <div className="flex-1 relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                    <User className="w-5 h-5" />
                  </div>
                  <input 
                    type="email" 
                    placeholder="Enter your email address" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === 'loading'}
                    className="w-full bg-black/50 border border-white/20 px-12 py-4 text-white placeholder-gray-500 focus:border-[#ccff00] focus:ring-2 focus:ring-[#ccff00]/20 outline-none rounded-lg transition-all disabled:opacity-50"
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  variant="primary" 
                  disabled={status === 'loading'}
                  className="px-8"
                >
                  {status === 'loading' ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                      Joining...
                    </span>
                  ) : (
                    'JOIN'
                  )}
                </Button>
              </div>
              <p className="text-xs text-gray-500 font-mono">
                {JSON.parse(localStorage.getItem('wirevault_waitlist') || '[]').length} people already joined
              </p>
            </form>
          )}
        </div>
      </section>
      
      {/* Toast Notification */}
      <Toast 
        message={toastMessage}
        type={toastType}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />

      {/* Live Chart Section */}
      <section className="py-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-4">Live Market Charts</h2>
          <p className="text-gray-400 text-sm">Track cryptocurrency performance in real-time</p>
        </div>
        
        {/* Coin Selector */}
        <LiveChartSection />
      </section>
    </div>
  );
};

// Dashboard asset definitions
const DASHBOARD_ASSETS = [
  { name: "Bitcoin", sym: "BTC", amt: 2.45, coinGeckoId: "bitcoin" },
  { name: "Ethereum", sym: "ETH", amt: 14.20, coinGeckoId: "ethereum" },
  { name: "USDC", sym: "USDC", amt: 11480, coinGeckoId: "usd-coin" },
];

// 2. DASHBOARD VIEW (Connected to Backend)
const DashboardView = () => {
  const [marketData, setMarketData] = useState(null);
  const [totalBalance, setTotalBalance] = useState(0);
  const [currency, setCurrency] = useState('USD');
  const [exchangeRate, setExchangeRate] = useState(1);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [assets, setAssets] = useState(DASHBOARD_ASSETS);

  // Fetch exchange rate for PHP
  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const data = await response.json();
        setExchangeRate(data.rates?.PHP || 56.5); // Fallback to approximate rate
      } catch (error) {
        console.error('Error fetching exchange rate:', error);
        setExchangeRate(56.5); // Fallback
      }
    };
    fetchExchangeRate();
    const interval = setInterval(fetchExchangeRate, 3600000); // Update every hour
    return () => clearInterval(interval);
  }, []);

  // Fetch real-time market data from CoinGecko
  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const coinIds = DASHBOARD_ASSETS.map(a => a.coinGeckoId).join(',');
        const response = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${coinIds}&vs_currencies=usd&include_24hr_change=true`
        );
        const data = await response.json();

        const updatedAssets = DASHBOARD_ASSETS.map(asset => {
          const coinData = data[asset.coinGeckoId];
          if (!coinData) {
            return { 
              ...asset, 
              price: 0, 
              change: 0, 
              val: 0 
            };
          }

          const price = coinData.usd || 0;
          const change = coinData.usd_24h_change || 0;
          const value = (asset.amt || 0) * (price || 0);

          return {
            ...asset,
            price: price || 0,
            change: change || 0,
            val: value || 0
          };
        });

        setAssets(updatedAssets);
        const total = updatedAssets.reduce((sum, asset) => sum + asset.val, 0);
        setTotalBalance(total);
        setMarketData(data);
      } catch (error) {
        console.error('Error fetching market data:', error);
      }
    };

    fetchMarketData();
    const interval = setInterval(fetchMarketData, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (value) => {
    if (value === null || value === undefined || isNaN(value)) {
      return currency === 'PHP' ? '₱0.00' : '$0.00';
    }
    const rate = exchangeRate || 1;
    if (currency === 'PHP') {
      return `₱${(value * rate).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    return `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatPrice = (value) => {
    if (value === null || value === undefined || isNaN(value)) {
      return currency === 'PHP' ? '₱0.00' : '$0.00';
    }
    const rate = exchangeRate || 1;
    if (currency === 'PHP') {
      return `₱${(value * rate).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    return `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const getTradingViewSymbol = (symbol) => {
    const mapping = {
      'BTC': 'BINANCE:BTCUSDT',
      'ETH': 'BINANCE:ETHUSDT',
      'USDC': 'BINANCE:USDCUSDT'
    };
    return mapping[symbol] || 'BINANCE:BTCUSDT';
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-end border-b border-white/10 pb-6 flex-wrap gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-gray-400 text-sm font-mono">TOTAL VAULT VALUE</h2>
            {/* Currency Selector */}
            <div className="flex gap-1 bg-[#111] border border-white/10 rounded-lg p-1">
              <button
                onClick={() => setCurrency('USD')}
                className={`px-3 py-1 text-xs font-mono rounded transition-all ${
                  currency === 'USD'
                    ? 'bg-[#ccff00] text-black font-bold'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                USD
              </button>
              <button
                onClick={() => setCurrency('PHP')}
                className={`px-3 py-1 text-xs font-mono rounded transition-all ${
                  currency === 'PHP'
                    ? 'bg-[#ccff00] text-black font-bold'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                PHP
              </button>
            </div>
          </div>
          <div className="text-5xl font-bold font-mono tracking-tighter text-white">
            {formatCurrency(totalBalance || 0)}
          </div>
          {!marketData && (
            <p className="text-xs text-gray-500 mt-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#ccff00] rounded-full animate-pulse"></span>
              Loading market data...
            </p>
          )}
          {marketData && currency === 'PHP' && (
            <p className="text-xs text-gray-500 mt-2 font-mono">
              Rate: 1 USD = ₱{exchangeRate.toFixed(2)}
            </p>
          )}
        </div>
        <div className="flex gap-2">
           <Button variant="outline" icon={ArrowUpRight}>DEPOSIT</Button>
           <Button variant="primary" icon={ArrowUpRight}>WITHDRAW</Button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Asset Allocation */}
        <div className="md:col-span-2 bg-[#111] border border-white/5 p-6 rounded-xl">
           <h3 className="font-bold mb-6 flex items-center gap-2"><Layers className="w-4 h-4 text-[#ccff00]" /> ASSETS</h3>
           <div className="space-y-4">
             {assets.map((asset, i) => (
               <div 
                 key={i} 
                 className={`bg-black/50 border rounded-lg transition-all duration-300 overflow-hidden ${
                   selectedAsset === i 
                     ? 'border-[#ccff00]/50 shadow-[0_0_20px_rgba(204,255,0,0.1)]' 
                     : 'border-white/5 hover:border-[#ccff00]/30'
                 }`}
               >
                 <div 
                   className="flex justify-between items-center p-4 cursor-pointer"
                   onClick={() => setSelectedAsset(selectedAsset === i ? null : i)}
                 >
                   <div className="flex items-center gap-4">
                     <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#ccff00]/20 to-[#ccff00]/5 border border-[#ccff00]/30 flex items-center justify-center font-bold text-sm">
                       {asset.sym}
                     </div>
                     <div>
                       <div className="font-bold text-white">{asset.name}</div>
                       <div className="text-xs text-gray-500 font-mono">{asset.amt.toLocaleString()} {asset.sym}</div>
                     </div>
                   </div>
                   <div className="text-right">
                     <div className="font-mono text-white font-semibold">{formatCurrency(asset.val || 0)}</div>
                     <div className="flex items-center gap-2 justify-end mt-1">
                       <div className={`text-xs font-mono ${
                         (asset.change || 0) >= 0 ? 'text-[#ccff00]' : 'text-red-500'
                       }`}>
                         {(asset.change || 0) >= 0 ? '+' : ''}{(asset.change || 0).toFixed(2)}%
                       </div>
                       <div className="text-xs text-gray-500 font-mono">
                         {formatPrice(asset.price || 0)}
                       </div>
                     </div>
                   </div>
                 </div>
                 
                 {/* Embedded Chart */}
                 {selectedAsset === i && (
                   <div className="border-t border-white/10 p-4 bg-black/30">
                     <div className="h-[300px] rounded-lg overflow-hidden">
                       <iframe
                         src={`https://www.tradingview.com/widgetembed/?symbol=${getTradingViewSymbol(asset.sym)}&interval=1&theme=dark&style=1&locale=en&toolbar_bg=000000&enable_publishing=false&hide_top_toolbar=true&hide_legend=false&save_image=false&studies=Volume&hide_volume=false`}
                         className="w-full h-full border-0"
                         title={`${asset.name} Chart`}
                         allow="clipboard-read; clipboard-write"
                       />
                     </div>
                   </div>
                 )}
               </div>
             ))}
           </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-[#111] border border-white/5 p-6 rounded-xl">
           <h3 className="font-bold mb-6 flex items-center gap-2"><Activity className="w-4 h-4 text-[#ccff00]" /> ACTIVITY</h3>
           <div className="space-y-6 relative">
             <div className="absolute left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-[#ccff00]/30 to-transparent"></div>
             {[
               { 
                 action: "Deposit", 
                 time: "2m ago", 
                 val: formatCurrency(5000),
                 type: "deposit",
                 icon: ArrowUpRight,
                 color: "text-[#ccff00]"
               },
               { 
                 action: "Vault Lock", 
                 time: "1h ago", 
                 val: "Secure",
                 type: "security",
                 icon: Lock,
                 color: "text-green-400"
               },
               { 
                 action: "Interest Earned", 
                 time: "1d ago", 
                 val: formatCurrency(42.50),
                 type: "interest",
                 icon: Activity,
                 color: "text-[#ccff00]"
               },
               { 
                 action: "Withdrawal", 
                 time: "3d ago", 
                 val: formatCurrency(1200),
                 type: "withdrawal",
                 icon: ArrowDownRight,
                 color: "text-red-400"
               },
             ].map((item, i) => {
               const Icon = item.icon;
               return (
                 <div key={i} className="relative pl-10 group">
                   <div className="absolute left-3 top-1.5 w-4 h-4 rounded-full bg-black border-2 border-[#ccff00] z-10 flex items-center justify-center">
                     <Icon className="w-2 h-2 text-[#ccff00]" />
                   </div>
                   <div className="text-sm font-bold text-white group-hover:text-[#ccff00] transition-colors">{item.action}</div>
                   <div className="flex justify-between text-xs text-gray-500 mt-1">
                     <span className="font-mono">{item.time}</span>
                     <span className={`font-mono font-semibold ${item.color}`}>{item.val}</span>
                   </div>
                 </div>
               );
             })}
           </div>
        </div>
      </div>
    </div>
  );
};

// 3. SECURITY VIEW
const SecurityView = () => {
  const [securityStats] = useState({
    totalValueLocked: 124750000,
    auditsCompleted: 3,
    securityScore: 98,
    incidentsBlocked: 1247,
    uptime: 99.99
  });

  const audits = [
    { 
      name: 'OpenZeppelin', 
      status: 'passed', 
      date: '2024-12-15',
      score: '98/100',
      report: 'https://openzeppelin.com',
      issues: 0,
      critical: 0
    },
    { 
      name: 'Certik', 
      status: 'in-progress', 
      date: '2025-01-20',
      score: 'Pending',
      report: null,
      issues: 0,
      critical: 0
    },
    { 
      name: 'Trail of Bits', 
      status: 'scheduled', 
      date: '2025-02-10',
      score: 'Scheduled',
      report: null,
      issues: 0,
      critical: 0
    }
  ];

  const securityFeatures = [
    {
      icon: Lock,
      title: 'Multi-Signature Vaults',
      description: '5-of-7 multisig scheme ensures no single point of failure. Treasury movements require consensus.',
      stat: '7 Signers',
      color: 'text-[#ccff00]'
    },
    {
      icon: Shield,
      title: 'Time-Locked Withdrawals',
      description: 'All withdrawals are time-locked with configurable delays. Emergency exits available for verified threats.',
      stat: '24h Delay',
      color: 'text-green-400'
    },
    {
      icon: Zap,
      title: 'Flash Liquidation Protection',
      description: 'Automated circuit breakers trigger milliseconds before market crashes to protect your assets.',
      stat: '0.5s Response',
      color: 'text-blue-400'
    },
    {
      icon: Globe,
      title: 'Decentralized Consensus',
      description: 'Global mesh of validator nodes verify every transaction. No central authority can censor or freeze.',
      stat: '127 Nodes',
      color: 'text-purple-400'
    }
  ];

  const getStatusBadge = (status) => {
    const badges = {
      passed: { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30', label: 'PASSED' },
      'in-progress': { bg: 'bg-yellow-500/20', text: 'text-yellow-400', border: 'border-yellow-500/30', label: 'IN PROGRESS' },
      scheduled: { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/30', label: 'SCHEDULED' }
    };
    return badges[status] || badges.scheduled;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#ccff00]/10 border border-[#ccff00]/30 rounded-full">
          <Shield className="w-4 h-4 text-[#ccff00]" />
          <span className="text-xs font-mono text-[#ccff00] font-semibold">SECURITY ARCHITECTURE</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tighter">
          Trust is good.<br/>
          <span className="text-[#ccff00]">Proof is better.</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          WireVault employs institutional-grade security measures. Every line of code is audited, every transaction is verified, and every asset is protected.
        </p>
      </div>

      {/* Security Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: 'TVL', value: `$${(securityStats.totalValueLocked / 1000000).toFixed(1)}M`, icon: Database },
          { label: 'Security Score', value: `${securityStats.securityScore}/100`, icon: Shield },
          { label: 'Audits', value: securityStats.auditsCompleted, icon: CheckCircle2 },
          { label: 'Threats Blocked', value: securityStats.incidentsBlocked.toLocaleString(), icon: Lock },
          { label: 'Uptime', value: `${securityStats.uptime}%`, icon: Activity }
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <FadeIn key={i} delay={i * 100}>
              <div className="bg-[#111] border border-white/10 rounded-xl p-4 hover:border-[#ccff00]/30 transition-all duration-300 group">
                <Icon className="w-5 h-5 text-[#ccff00] mb-3 group-hover:scale-110 transition-transform" />
                <div className="text-2xl font-bold font-mono text-white mb-1">{stat.value}</div>
                <div className="text-xs text-gray-500 font-mono uppercase tracking-wider">{stat.label}</div>
              </div>
            </FadeIn>
          );
        })}
      </div>

      {/* Smart Contract Audits */}
      <div className="bg-[#111] border border-white/10 rounded-2xl p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-[#ccff00]/10 border border-[#ccff00]/30 rounded-lg">
            <Shield className="w-6 h-6 text-[#ccff00]" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Smart Contract Audits</h2>
            <p className="text-sm text-gray-400">Third-party security assessments from industry leaders</p>
          </div>
        </div>
        
        <div className="space-y-4">
          {audits.map((audit, i) => {
            const badge = getStatusBadge(audit.status);
            return (
              <FadeIn key={i} delay={i * 150}>
                <div className="bg-black/50 border border-white/5 rounded-xl p-6 hover:border-[#ccff00]/30 transition-all duration-300 group">
                  <div className="flex items-start justify-between flex-wrap gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-lg font-bold text-white">{audit.name}</h3>
                        <span className={`px-3 py-1 text-xs font-mono font-semibold rounded border ${badge.bg} ${badge.text} ${badge.border}`}>
                          {badge.label}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="text-gray-500 text-xs mb-1">Date</div>
                          <div className="font-mono text-white">{audit.date}</div>
                        </div>
                        <div>
                          <div className="text-gray-500 text-xs mb-1">Score</div>
                          <div className="font-mono text-[#ccff00]">{audit.score}</div>
                        </div>
                        <div>
                          <div className="text-gray-500 text-xs mb-1">Issues</div>
                          <div className="font-mono text-white">{audit.issues}</div>
                        </div>
                        <div>
                          <div className="text-gray-500 text-xs mb-1">Critical</div>
                          <div className={`font-mono ${audit.critical > 0 ? 'text-red-400' : 'text-green-400'}`}>
                            {audit.critical}
                          </div>
                        </div>
                      </div>
                    </div>
                    {audit.report && (
                      <a
                        href={audit.report}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-[#ccff00]/10 border border-[#ccff00]/30 rounded-lg text-[#ccff00] hover:bg-[#ccff00]/20 transition-all group"
                      >
                        <span className="text-sm font-mono">View Report</span>
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </a>
                    )}
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>

      {/* Security Features Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {securityFeatures.map((feature, i) => {
          const Icon = feature.icon;
          return (
            <FadeIn key={i} delay={i * 100}>
              <div className="bg-[#111] border border-white/10 rounded-xl p-6 hover:border-[#ccff00]/30 transition-all duration-300 group hover:scale-[1.02]">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-black/50 border border-white/10 rounded-lg group-hover:border-[#ccff00]/30 transition-colors">
                    <Icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <span className="text-xs font-mono text-gray-500 bg-black/50 px-2 py-1 rounded">
                    {feature.stat}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-[#ccff00] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </FadeIn>
          );
        })}
      </div>

      {/* Multi-Signature Details */}
      <div className="bg-gradient-to-br from-[#111] to-black border border-[#ccff00]/20 rounded-2xl p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#ccff00]/5 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-[#ccff00]/10 border border-[#ccff00]/30 rounded-lg">
              <Lock className="w-6 h-6 text-[#ccff00]" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Multi-Signature Treasury</h2>
              <p className="text-sm text-gray-400">5-of-7 consensus required for all treasury movements</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <div className="text-sm text-gray-400 mb-2">Signer Distribution</div>
              <div className="space-y-2">
                {['Founder', 'CTO', 'Security Lead', 'Community Rep', 'DAO Council', 'Technical Advisor', 'External Auditor'].map((signer, i) => (
                  <div key={i} className="flex items-center gap-3 p-2 bg-black/30 rounded">
                    <div className={`w-2 h-2 rounded-full ${i < 5 ? 'bg-[#ccff00]' : 'bg-gray-600'}`}></div>
                    <span className="text-sm text-gray-300">{signer}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-400 mb-2">Security Guarantees</div>
              <ul className="space-y-3">
                {[
                  'No single point of failure',
                  'Time-locked emergency procedures',
                  'On-chain verification available',
                  'Transparent governance model'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <Button variant="outline" icon={ArrowUpRight} className="w-full md:w-auto">
            VERIFY ON-CHAIN
          </Button>
        </div>
      </div>
    </div>
  );
};

// 4. ROADMAP VIEW
const RoadmapView = () => {
  const [isVisible, setIsVisible] = useState(false);
  const timelineRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const phases = [
    { q: "Q1 2025", title: "Beta Launch", items: ["Whitelist opening", "Core contract deployment", "Initial audits"], active: true },
    { q: "Q2 2025", title: "Public Access", items: ["Governance token drop", "Mobile App Beta", "Staking pools"], active: false },
    { q: "Q3 2025", title: "Decentralization", items: ["DAO transition", "Open sourcing UI", "Cross-chain bridge"], active: false }
  ];

  return (
    <div className="max-w-3xl mx-auto animate-fade-in relative rounded-2xl overflow-hidden p-8 md:p-12 min-h-[600px]">
      {/* Liquid Chrome Background */}
      <div className="absolute inset-0 w-full h-full z-0 opacity-50">
        <LiquidChrome
          baseColor={[0.08, 0.1, 0.08]}
          speed={0.1}
          amplitude={0.3}
          frequencyX={2.5}
          frequencyY={2.5}
          interactive={true}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      
      {/* Subtle overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60 z-[1] pointer-events-none rounded-2xl"></div>
      
      {/* Content */}
      <div className="relative z-10">
        <h1 className="text-4xl font-bold mb-12 text-center text-white drop-shadow-[0_0_20px_rgba(0,0,0,0.8)]">
          Protocol <span className="text-[#ccff00] drop-shadow-[0_0_15px_rgba(204,255,0,0.5)]">Roadmap</span>
        </h1>
        <div className="space-y-8 relative pb-8" ref={timelineRef}>
         {/* Animated gradient line that extends to bottom */}
         <div 
           className={`absolute left-[20px] top-0 bottom-0 w-px transition-all duration-[2000ms] ease-out z-10 ${
             isVisible ? 'opacity-100' : 'opacity-0'
           }`}
           style={{ 
             background: 'linear-gradient(to bottom, #ccff00 0%, #ccff00 20%, rgba(204, 255, 0, 0.8) 40%, rgba(204, 255, 0, 0.5) 70%, transparent 100%)',
             boxShadow: '0 0 15px rgba(204, 255, 0, 0.6), 0 0 30px rgba(204, 255, 0, 0.3), 0 0 50px rgba(204, 255, 0, 0.2)'
           }}
         />
         
         {/* Animated progress line that draws from top to bottom */}
         <div 
           className={`absolute left-[20px] top-0 w-0.5 transition-all duration-[2500ms] ease-out z-10 ${
             isVisible ? 'h-full opacity-100' : 'h-0 opacity-0'
           }`}
           style={{ 
             background: 'linear-gradient(to bottom, #ccff00, rgba(204, 255, 0, 0.9), rgba(204, 255, 0, 0.4))',
             boxShadow: '0 0 12px rgba(204, 255, 0, 0.8), 0 0 24px rgba(204, 255, 0, 0.5), 0 0 40px rgba(204, 255, 0, 0.3)'
           }}
         />
         
         {phases.map((phase, i) => (
           <div 
             key={i} 
             className={`relative pl-16 transition-all duration-700 ${
               phase.active ? 'opacity-100' : 'opacity-50'
             }`}
             style={{ 
               animationDelay: `${i * 300}ms`,
               animation: isVisible ? 'fadeInUp 0.6s ease-out forwards' : 'none'
             }}
           >
             <div 
               className={`absolute left-3 top-1 w-6 h-6 rounded-full border-2 transition-all duration-500 z-20 ${
                 phase.active 
                   ? 'bg-[#ccff00] border-[#ccff00] shadow-[0_0_15px_rgba(204,255,0,0.9),0_0_30px_rgba(204,255,0,0.5)]' 
                   : 'bg-black/80 border-gray-500 backdrop-blur-sm'
               }`}
             >
               {phase.active && (
                 <div className="absolute inset-0 rounded-full bg-[#ccff00] animate-ping opacity-75"></div>
               )}
               {phase.active && (
                 <div className="absolute inset-0 rounded-full bg-[#ccff00] animate-pulse"></div>
               )}
             </div>
             <div className="text-[#ccff00] font-mono text-sm mb-1 font-semibold drop-shadow-[0_0_10px_rgba(204,255,0,0.3)]">{phase.q}</div>
             <h3 className="text-2xl font-bold mb-4 text-white drop-shadow-[0_0_15px_rgba(0,0,0,0.6)]">{phase.title}</h3>
             <ul className="space-y-2">
               {phase.items.map((item, j) => (
                 <li 
                   key={j} 
                   className="flex items-center gap-2 text-gray-200 text-sm transition-all duration-300 hover:text-white hover:translate-x-1 drop-shadow-[0_0_8px_rgba(0,0,0,0.5)]"
                   style={{ 
                     animationDelay: `${(i * 300) + (j * 100)}ms`,
                     animation: isVisible ? 'fadeInUp 0.5s ease-out forwards' : 'none',
                     opacity: isVisible ? 1 : 0
                   }}
                 >
                   <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                     phase.active ? 'bg-[#ccff00] shadow-[0_0_4px_rgba(204,255,0,0.6)]' : 'bg-gray-600'
                   }`}></div>
                   {item}
                 </li>
               ))}
             </ul>
           </div>
         ))}
        </div>
      </div>
      
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

// 5. SENTINEL AI VIEW
const SentinelView = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'system', text: 'WIRELINK SECURE CHANNEL ESTABLISHED. SENTINEL AI ONLINE. AWAITING QUERY.' }
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    // Simulate AI response for demo
    setTimeout(() => {
      const responses = [
        "ANALYSIS COMPLETE. The contract appears secure. No critical vulnerabilities detected in the current audit.",
        "MARKET INTELLIGENCE: Current market conditions suggest increased volatility. Recommend defensive positioning.",
        "THREAT ASSESSMENT: Multiple attack vectors detected. Implementing countermeasures. Status: SECURE.",
        "SECURITY AUDIT: Smart contract functions verified. Time-lock mechanisms operational. All systems nominal.",
        "RISK ANALYSIS: Low to moderate risk profile. Flash liquidation protection active. Vault integrity: 99.8%"
      ];
      const aiText = responses[Math.floor(Math.random() * responses.length)];
      setMessages(prev => [...prev, { role: 'ai', text: aiText }]);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto h-[70vh] flex flex-col animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-[#ccff00]/10 border border-[#ccff00] rounded-lg">
          <Bot className="w-6 h-6 text-[#ccff00]" />
        </div>
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            SENTINEL <span className="text-[#ccff00] text-xs font-mono border border-[#ccff00] px-1 rounded">AI POWERED</span>
          </h1>
          <p className="text-gray-400 text-sm font-mono">Threat Detection & Market Intelligence</p>
        </div>
      </div>

      {/* Terminal Window */}
      <div className="flex-1 bg-black border border-white/20 rounded-xl overflow-hidden flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        {/* Terminal Header */}
        <div className="bg-[#111] border-b border-white/10 p-3 flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500"></div>
          </div>
          <div className="flex-1 text-center font-mono text-xs text-gray-500">secure_shell_v2.0</div>
        </div>

        {/* Chat Area */}
        <div ref={scrollRef} className="flex-1 p-6 overflow-y-auto space-y-4 font-mono text-sm">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`max-w-[80%] p-4 rounded-lg border ${
                  msg.role === 'user' 
                    ? 'bg-white/10 border-white/20 text-white' 
                    : msg.role === 'system'
                    ? 'bg-red-500/10 border-red-500/50 text-red-400'
                    : 'bg-[#ccff00]/10 border-[#ccff00]/30 text-[#ccff00]'
                }`}
              >
                {msg.role === 'ai' && <div className="text-[10px] opacity-50 mb-1">SENTINEL_NODE_01</div>}
                <div className="whitespace-pre-wrap">{msg.text}</div>
              </div>
            </div>
          ))}
          {loading && (
             <div className="flex justify-start">
               <div className="bg-[#ccff00]/5 border border-[#ccff00]/20 p-4 rounded-lg flex items-center gap-2 text-[#ccff00]">
                 <span className="w-2 h-2 bg-[#ccff00] animate-pulse"></span>
                 ANALYZING...
               </div>
             </div>
          )}
        </div>

        {/* Input Area */}
        <form onSubmit={handleSend} className="bg-[#111] p-4 border-t border-white/10 flex gap-4">
          <div className="flex-1 relative">
            <Terminal className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about contract risks, market trends, or security..."
              className="w-full bg-black border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white focus:border-[#ccff00] focus:ring-1 focus:ring-[#ccff00] outline-none font-mono"
            />
          </div>
          <Button type="submit" variant="primary" disabled={loading || !input.trim()}>
            SEND <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

// --- Main Layout ---

export default function WireVaultApp() {
  const [currentView, setCurrentView] = useState('home'); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [logoSpin, setLogoSpin] = useState(false);

  // Check if this is first visit
  useEffect(() => {
    const hasVisited = localStorage.getItem('wirevault_has_visited');
    if (!hasVisited) {
      setShowIntro(true);
    }
  }, []);

  const handleIntroDismiss = () => {
    localStorage.setItem('wirevault_has_visited', 'true');
    setShowIntro(false);
  };

  const navigate = (view) => {
    setCurrentView(view);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogoClick = () => {
    setLogoSpin(true);
    setTimeout(() => setLogoSpin(false), 500);
    navigate('home');
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#ccff00] selection:text-black flex flex-col">
      {/* Intro Experience */}
      {showIntro && <IntroExperience onDismiss={handleIntroDismiss} />}
      
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-lg border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          {/* Logo */}
          <div 
            onClick={handleLogoClick} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div 
              className={`relative w-10 h-10 flex items-center justify-center transition-transform duration-500 ${logoSpin ? 'rotate-360' : ''}`}
            >
              <img 
                src="/assets/WireVault_LOGO.jpg" 
                alt="WireVault Logo" 
                className="w-full h-full object-contain rounded-sm transition-all duration-300 group-hover:brightness-110 group-hover:drop-shadow-[0_0_10px_rgba(204,255,0,0.5)]"
              />
              <div className="absolute inset-0 bg-[#ccff00]/0 group-hover:bg-[#ccff00]/10 rounded-sm transition-all duration-300"></div>
            </div>
            <span className="font-bold text-xl tracking-tighter transition-colors group-hover:text-[#ccff00]">WIRE<span className="text-[#ccff00]">VAULT</span></span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => navigate('home')} className={`text-sm font-medium transition-colors ${currentView === 'home' ? 'text-white' : 'text-gray-400 hover:text-white'}`}>Home</button>
            <button onClick={() => navigate('security')} className={`text-sm font-medium transition-colors ${currentView === 'security' ? 'text-white' : 'text-gray-400 hover:text-white'}`}>Security</button>
            <button onClick={() => navigate('sentinel')} className={`text-sm font-medium transition-colors flex items-center gap-2 ${currentView === 'sentinel' ? 'text-[#ccff00]' : 'text-gray-400 hover:text-[#ccff00]'}`}>
               <Bot className="w-4 h-4" /> Sentinel AI
            </button>
            <button onClick={() => navigate('roadmap')} className={`text-sm font-medium transition-colors ${currentView === 'roadmap' ? 'text-white' : 'text-gray-400 hover:text-white'}`}>Roadmap</button>
            <div className="h-6 w-px bg-white/20 mx-2"></div>
            <Button 
              variant={currentView === 'dashboard' ? 'primary' : 'outline'} 
              onClick={() => navigate('dashboard')}
              icon={LayoutDashboard}
              className="py-2 px-4"
            >
              {currentView === 'dashboard' ? 'DASHBOARD' : 'LAUNCH APP'}
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-black border-b border-white/10 p-6 flex flex-col gap-4 animate-fade-in-down">
            {['home', 'security', 'sentinel', 'roadmap', 'dashboard'].map((item) => (
              <button 
                key={item}
                onClick={() => navigate(item)}
                className="text-left text-lg font-medium text-gray-400 hover:text-[#ccff00] capitalize"
              >
                {item === 'sentinel' ? 'Sentinel AI ✨' : item}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow pt-32 px-6 pb-20 max-w-7xl mx-auto w-full relative z-10">
        
        {/* Background FX */}
        <div className="fixed inset-0 pointer-events-none z-0">
           <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#ccff00]/5 rounded-full blur-[120px]"></div>
           <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px]"></div>
           <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        </div>

        {/* View Switcher */}
        <div className="page-transition">
          {currentView === 'home' && <HomeView onNavigate={navigate} />}
          {currentView === 'dashboard' && <DashboardView />}
          {currentView === 'security' && <SecurityView />}
          {currentView === 'roadmap' && <RoadmapView />}
          {currentView === 'sentinel' && <SentinelView />}
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 bg-black relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-gray-500 font-mono">
            <div className="flex gap-4">
              <span>STATUS: <span className="text-[#ccff00]">ONLINE</span></span>
              <span>BLOCK: 18,242,910</span>
            </div>
            <div className="flex items-center gap-4">
              <a 
                href="https://docs.wirevault.io" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-5 h-5 text-gray-500 hover:text-[#ccff00] transition-colors"
                aria-label="Documentation"
              >
                <BookOpen className="w-full h-full" />
              </a>
              <a 
                href="https://x.com/DeyWebPH" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-5 h-5 text-gray-500 hover:text-[#ccff00] transition-colors"
                aria-label="X (Twitter)"
              >
                <Twitter className="w-full h-full" />
              </a>
              <a 
                href="https://discord.gg/wirevault" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-5 h-5 text-gray-500 hover:text-[#ccff00] transition-colors"
                aria-label="Discord"
              >
                <MessageCircle className="w-full h-full" />
              </a>
              <a 
                href="https://t.me/DeyWebPH" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-5 h-5 text-gray-500 hover:text-[#ccff00] transition-colors"
                aria-label="Telegram"
              >
                <TelegramIcon className="w-full h-full" />
              </a>
              <a 
                href="https://facebook.com/wirevault" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-5 h-5 text-gray-500 hover:text-[#ccff00] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-full h-full" />
              </a>
              <a 
                href="https://github.com/DaveEyz/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-5 h-5 text-gray-500 hover:text-[#ccff00] transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-full h-full" />
              </a>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-white/5 text-center">
            <a 
              href="https://github.com/DaveEyz/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-gray-600 hover:text-[#ccff00] transition-colors inline-flex items-center gap-1"
            >
              Created by Dave
              <Github className="w-3 h-3" />
            </a>
            <span className="text-gray-700 mx-2">•</span>
            <a 
              href="https://github.com/DaveEyz/WireVault" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-gray-600 hover:text-[#ccff00] transition-colors"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

