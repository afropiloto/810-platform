'use client';

import { useState, useMemo } from 'react';
import { Search, Flame, TrendingUp, BarChart2, Share2, Copy, Check, X, ArrowUpRight, ArrowDownRight, Sparkles, BadgeDollarSign, Link as LinkIcon, Heart, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';

const MARKETS = [
  {
    id: "1",
    question: "Will the GTA VI Trailer 2 hit 100M views in 24h?",
    creatorHandle: "@RockstarGames",
    targetPost: "YouTube Video",
    metric: "Views",
    category: "Tech",
    target: "100,000,000",
    deadline: "Tomorrow, 4:00 PM",
    probability: 82,
    volume: "4.2M USDT",
    liquidity: "1.5M USDT",
    isHot: true,
    imageUrl: "https://unavatar.io/twitter/RockstarGames",
    socialUrl: "https://twitter.com/RockstarGames",
    socialMetrics: { reposts: 154000, likes: 1200000, velocity: 8500, sentiment: 98 },
    progress: { current: 41000000, target: 100000000, label: "Views" },
    creatorPool: 42000,
    attentionValue: "5.65M"
  },
  {
    id: "2",
    question: "Will the new Pharrell collection post hit 1M likes?",
    creatorHandle: "@LouisVuitton",
    targetPost: "Instagram Post",
    metric: "Likes",
    category: "Brands",
    target: "1,000,000",
    deadline: "Fri, 12:00 PM",
    probability: 65,
    volume: "890k USDT",
    liquidity: "120k USDT",
    imageUrl: "https://unavatar.io/twitter/LouisVuitton",
    socialUrl: "https://twitter.com/LouisVuitton",
    socialMetrics: { reposts: 3200, likes: 450000, velocity: 1200, sentiment: 85 },
    progress: { current: 650000, target: 1000000, label: "Likes" },
    creatorPool: 8900,
    attentionValue: "1.01M"
  },
  {
    id: "3",
    question: "Will my new silent reaction video get 50M views?",
    creatorHandle: "@KhabyLame",
    targetPost: "TikTok Video",
    metric: "Views",
    category: "Influencers",
    target: "50,000,000",
    deadline: "Midnight PT",
    probability: 91,
    volume: "2.1M USDT",
    liquidity: "800k USDT",
    isHot: true,
    imageUrl: "https://unavatar.io/twitter/KhabyLame",
    socialUrl: "https://twitter.com/KhabyLame",
    socialMetrics: { reposts: 56000, likes: 2200000, velocity: 8900, sentiment: 98 },
    creatorPool: 21000,
    attentionValue: "2.9M"
  },
  {
    id: "4",
    question: "Will my 'Squid Game 2' reaction video hit 50M views in 24h?",
    creatorHandle: "@MrBeast",
    targetPost: "YouTube Video",
    metric: "Views",
    category: "Influencers",
    target: "50,000,000",
    deadline: "Sat, 10:10 AM",
    probability: 78,
    volume: "5.4M USDT",
    liquidity: "1.5M USDT",
    isHot: true,
    imageUrl: "https://unavatar.io/youtube/MrBeast",
    socialUrl: "https://www.youtube.com/@MrBeast",
    socialMetrics: { reposts: 89000, likes: 4500000, velocity: 12000, sentiment: 95 },
    progress: { current: 39000000, target: 50000000, label: "Views" },
    creatorPool: 54000,
    attentionValue: "6.9M"
  },
  {
    id: "5",
    question: "Will my Cybertruck durability test get 5M views?",
    creatorHandle: "@mkbhd",
    targetPost: "YouTube Video",
    metric: "Views",
    category: "Tech",
    target: "5,000,000",
    deadline: "Mon, 9:00 AM",
    probability: 45,
    volume: "340k USDT",
    liquidity: "90k USDT",
    imageUrl: "https://unavatar.io/youtube/MKBHD",
    socialUrl: "https://www.youtube.com/@mkbhd",
    socialMetrics: { reposts: 1200, likes: 56000, velocity: 450, sentiment: 72 },
    progress: { current: 2250000, target: 5000000, label: "Views" },
    creatorPool: 3400,
    attentionValue: "430k"
  },
  {
    id: "6",
    question: "Will my retirement post on Instagram hit 20M likes?",
    creatorHandle: "@Cristiano",
    targetPost: "Instagram Post",
    metric: "Likes",
    category: "Sports",
    target: "20,000,000",
    deadline: "Dec 31",
    probability: 15,
    volume: "3.5M USDT",
    liquidity: "1.2M USDT",
    isHot: true,
    imageUrl: "https://unavatar.io/twitter/Cristiano",
    socialUrl: "https://www.instagram.com/cristiano/",
    socialMetrics: { reposts: 89000, likes: 4500000, velocity: 5600, sentiment: 99 },
    progress: { current: 3000000, target: 20000000, label: "Likes" },
    creatorPool: 35000,
    attentionValue: "4.7M"
  },
  {
    id: "7",
    question: "Will my new vlog hit 2M views in 24 hours?",
    creatorHandle: "@KaykaiSalaider",
    targetPost: "YouTube Video",
    metric: "Views",
    category: "Influencers",
    target: "2,000,000",
    deadline: "Sun, 6:00 PM",
    probability: 88,
    volume: "1.8M USDT",
    liquidity: "600k USDT",
    imageUrl: "https://unavatar.io/youtube/KaykaiSalaider",
    socialUrl: "https://www.youtube.com/@KaykaiSalaider",
    socialMetrics: { reposts: 12000, likes: 340000, velocity: 890, sentiment: 95 },
    creatorPool: 18000,
    attentionValue: "2.4M"
  },
  {
    id: "8",
    question: "Will our comeback MV break the 24h YouTube record?",
    creatorHandle: "@bts_bighit",
    targetPost: "YouTube Video",
    metric: "Views",
    category: "Music",
    target: "110,000,000",
    deadline: "Oct 10, 8:00 PM",
    probability: 58,
    volume: "8.9M USDT",
    liquidity: "2.5M USDT",
    isHot: true,
    imageUrl: "https://unavatar.io/twitter/bts_bighit",
    socialUrl: "https://twitter.com/bts_bighit",
    socialMetrics: { reposts: 250000, likes: 890000, velocity: 15000, sentiment: 99 },
    progress: { current: 86000000, target: 110000000, label: "Views" },
    creatorPool: 89000,
    attentionValue: "12.85M"
  },
  {
    id: "9",
    question: "Will Blackstone's Q1 earnings post hit 1M impressions on X?",
    creatorHandle: "@blackstone",
    targetPost: "X Post",
    metric: "Impressions",
    category: "Brands",
    target: "1,000,000",
    deadline: "Mar 31",
    probability: 42,
    volume: "1.2M USDT",
    liquidity: "350k USDT",
    imageUrl: "https://unavatar.io/twitter/blackstone",
    socialUrl: "https://twitter.com/blackstone",
    socialMetrics: { reposts: 450, likes: 1200, velocity: 50, sentiment: 60 },
    progress: { current: 420000, target: 1000000, label: "Impressions" },
    creatorPool: 12000,
    attentionValue: "1.5M"
  },
  {
    id: "10",
    question: "Will 7-Eleven's Free Slurpee Day announcement get 500k reposts?",
    creatorHandle: "@7eleven",
    targetPost: "X Post",
    metric: "Reposts",
    category: "Brands",
    target: "500,000",
    deadline: "Jun 21",
    probability: 75,
    volume: "450k USDT",
    liquidity: "120k USDT",
    isHot: true,
    imageUrl: "https://unavatar.io/twitter/7eleven",
    socialUrl: "https://twitter.com/7eleven",
    socialMetrics: { reposts: 8900, likes: 45000, velocity: 1200, sentiment: 92 },
    progress: { current: 310000, target: 500000, label: "Reposts" },
    creatorPool: 4500,
    attentionValue: "600k"
  },
  {
    id: "11",
    question: "Will the Stranger Things Season 5 trailer hit 50M views in 24h?",
    creatorHandle: "@netflix",
    targetPost: "YouTube Video",
    metric: "Views",
    category: "Tech",
    target: "50,000,000",
    deadline: "May 1",
    probability: 60,
    volume: "3.8M USDT",
    liquidity: "1.1M USDT",
    isHot: true,
    imageUrl: "https://unavatar.io/twitter/netflix",
    socialUrl: "https://twitter.com/netflix",
    socialMetrics: { reposts: 45000, likes: 320000, velocity: 5600, sentiment: 88 },
    progress: { current: 22000000, target: 50000000, label: "Views" },
    creatorPool: 38000,
    attentionValue: "4.2M"
  },
  {
    id: "12",
    question: "Will Drake's new single audio track hit 10M listens on Spotify in 24h?",
    creatorHandle: "@Drake",
    targetPost: "Spotify Stream",
    metric: "Listens",
    category: "Music",
    target: "10,000,000",
    deadline: "Next Tuesday",
    probability: 85,
    volume: "5.1M USDT",
    liquidity: "1.8M USDT",
    isHot: true,
    imageUrl: "https://unavatar.io/twitter/Drake",
    socialUrl: "https://twitter.com/Drake",
    socialMetrics: { reposts: 120000, likes: 890000, velocity: 15000, sentiment: 95 },
    progress: { current: 8500000, target: 10000000, label: "Listens" },
    creatorPool: 51000,
    attentionValue: "6.8M"
  },
  {
    id: "13",
    question: "Will Conor McGregor's fight announcement video get 2M likes on Instagram?",
    creatorHandle: "@TheNotoriousMMA",
    targetPost: "Instagram Reel",
    metric: "Likes",
    category: "Sports",
    target: "2,000,000",
    deadline: "Sun, 11:59 PM",
    probability: 35,
    volume: "2.4M USDT",
    liquidity: "750k USDT",
    imageUrl: "https://unavatar.io/twitter/TheNotoriousMMA",
    socialUrl: "https://twitter.com/TheNotoriousMMA",
    socialMetrics: { reposts: 34000, likes: 210000, velocity: 4500, sentiment: 82 },
    progress: { current: 850000, target: 2000000, label: "Likes" },
    creatorPool: 24000,
    attentionValue: "3.1M"
  },
  {
    id: "14",
    question: "Will Patrick Mahomes' Super Bowl highlight reel hit 15M views on TikTok?",
    creatorHandle: "@PatrickMahomes",
    targetPost: "TikTok Video",
    metric: "Views",
    category: "Sports",
    target: "15,000,000",
    deadline: "Sep 5",
    probability: 28,
    volume: "1.5M USDT",
    liquidity: "400k USDT",
    imageUrl: "https://unavatar.io/twitter/PatrickMahomes",
    socialUrl: "https://twitter.com/PatrickMahomes",
    socialMetrics: { reposts: 15000, likes: 120000, velocity: 2100, sentiment: 90 },
    progress: { current: 4200000, target: 15000000, label: "Views" },
    creatorPool: 15000,
    attentionValue: "1.9M"
  },
  {
    id: "15",
    question: "Will Messi's next Inter Miami match post hit 10M likes on Instagram?",
    creatorHandle: "@TeamMessi",
    targetPost: "Instagram Post",
    metric: "Likes",
    category: "Sports",
    target: "10,000,000",
    deadline: "Saturday",
    probability: 18,
    volume: "3.2M USDT",
    liquidity: "900k USDT",
    imageUrl: "https://unavatar.io/twitter/TeamMessi",
    socialUrl: "https://twitter.com/TeamMessi",
    socialMetrics: { reposts: 56000, likes: 450000, velocity: 8900, sentiment: 96 },
    progress: { current: 1800000, target: 10000000, label: "Likes" },
    creatorPool: 32000,
    attentionValue: "4.5M"
  },
  {
    id: "16",
    question: "Will LeBron's podcast episode 1 hit 5M views on YouTube?",
    creatorHandle: "@KingJames",
    targetPost: "YouTube Video",
    metric: "Views",
    category: "Sports",
    target: "5,000,000",
    deadline: "Tomorrow, 7:30 PM",
    probability: 45,
    volume: "2.8M USDT",
    liquidity: "850k USDT",
    isHot: true,
    imageUrl: "https://unavatar.io/twitter/KingJames",
    socialUrl: "https://twitter.com/KingJames",
    socialMetrics: { reposts: 45000, likes: 320000, velocity: 6700, sentiment: 88 },
    progress: { current: 2100000, target: 5000000, label: "Views" },
    creatorPool: 28000,
    attentionValue: "3.6M"
  }
];

const CATEGORIES = ["All", "Highest Pool", "Influencers", "Brands", "Music", "Sports", "Tech", "Crypto"];

export default function Markets() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMarket, setSelectedMarket] = useState<any>(null);
  const [amplifyMarket, setAmplifyMarket] = useState<any>(null);
  const [claimMarket, setClaimMarket] = useState<any>(null);

  const filteredMarkets = useMemo(() => {
    let result = [...MARKETS];
    
    if (activeCategory === "Highest Pool") {
      result.sort((a, b) => {
        const valA = parseFloat(a.volume.replace(/[^0-9.]/g, "")) * (a.volume.includes('M') ? 1000000 : 1000);
        const valB = parseFloat(b.volume.replace(/[^0-9.]/g, "")) * (b.volume.includes('M') ? 1000000 : 1000);
        return valB - valA;
      });
    } else if (activeCategory !== "All") {
      result = result.filter(m => m.category === activeCategory);
    }

    if (searchQuery) {
      result = result.filter(m => 
        m.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.target.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return result;
  }, [activeCategory, searchQuery]);

  return (
    <div className="mb-8 space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-ink">Live Markets</h1>
          <p className="text-muted">Trade on social outcomes with verified data.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              type="text"
              placeholder="Search markets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 w-full rounded-lg border border-border bg-panel pl-9 pr-4 text-sm outline-none focus:border-accent md:w-64"
            />
          </div>
          <button className="relative rounded-lg border border-border bg-panel p-2 hover:bg-border">
            <Flame className="h-5 w-5 text-muted" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-accent"></span>
          </button>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {CATEGORIES.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`whitespace-nowrap rounded-full border px-4 py-1.5 text-sm font-bold transition-all ${
              activeCategory === category
                ? "border-accent bg-accent text-black"
                : "border-border bg-panel text-muted hover:border-muted hover:text-ink"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filteredMarkets.map(market => (
          <div key={market.id} className="relative h-full">
            <div onClick={() => setSelectedMarket(market)} className="cursor-pointer h-full">
              <MarketCard market={market} onClaim={setClaimMarket} />
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setAmplifyMarket(market);
              }}
              className="absolute top-4 right-4 z-10 rounded-full bg-panel p-2 text-muted shadow-sm hover:bg-bg hover:text-accent"
            >
              <Share2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      <TradeModal market={selectedMarket} isOpen={!!selectedMarket} onClose={() => setSelectedMarket(null)} />
      <AmplifyModal market={amplifyMarket} isOpen={!!amplifyMarket} onClose={() => setAmplifyMarket(null)} />
      <CreatorClaimModal market={claimMarket} isOpen={!!claimMarket} onClose={() => setClaimMarket(null)} />
    </div>
  );
}

function MarketCard({ market, onClaim }: { market: any, onClaim?: (market: any) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative flex flex-col gap-4 rounded-xl border border-border bg-panel p-5 transition-all hover:border-muted hover:shadow-lg h-full"
    >
      {market.creatorPool && (
        <div className="absolute -top-3 -right-3 z-20">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onClaim?.(market);
            }}
            className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-3 py-1 text-xs font-bold text-white shadow-lg hover:scale-105 transition-transform"
          >
            <Sparkles className="h-3 w-3" />
            Claim {market.creatorPool.toLocaleString()} USDT
          </button>
        </div>
      )}

      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted">
          {market.isHot && (
            <span className="flex items-center gap-1 text-warning">
              <Flame className="h-3 w-3" /> Hot
            </span>
          )}
          <span>{market.metric}</span>
        </div>
        <div className="font-mono text-xs text-muted">{market.deadline}</div>
      </div>

      <div className="flex gap-4">
        {market.imageUrl && (
          <div className="relative h-16 w-16 flex-none">
            {market.socialUrl ? (
              <a
                href={market.socialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative block h-full w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={market.imageUrl}
                  alt="Market context"
                  fill
                  sizes="64px"
                  className="rounded-lg object-cover border border-border transition-opacity hover:opacity-80"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-black ring-2 ring-panel">
                  <span className="text-[10px] font-bold">@</span>
                </div>
              </a>
            ) : (
              <div className="relative block h-full w-full">
                <Image
                  src={market.imageUrl}
                  alt="Market context"
                  fill
                  sizes="64px"
                  className="rounded-lg object-cover border border-border"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-black ring-2 ring-panel">
                  <span className="text-[10px] font-bold">@</span>
                </div>
              </div>
            )}
          </div>
        )}
        <div>
          {(market.creatorHandle || market.targetPost) && (
            <div className="mb-1.5 flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-muted">
              {market.creatorHandle && (
                <span className="font-bold text-accent hover:underline">{market.creatorHandle}</span>
              )}
              {market.creatorHandle && market.targetPost && <span>•</span>}
              {market.targetPost && <span>{market.targetPost}</span>}
            </div>
          )}
          <h3 className="text-lg font-medium leading-snug text-ink group-hover:text-accent transition-colors">
            {market.question}
          </h3>
          <p className="mt-1 text-sm text-muted">
            Target: <span className="font-mono text-ink">{market.target}</span>
          </p>
        </div>
      </div>

      {market.socialMetrics && (
        <div className="grid grid-cols-3 gap-2 rounded-lg bg-bg p-3 text-xs">
          <div className="flex flex-col items-center gap-1">
            <span className="text-muted">Velocity</span>
            <span className="font-mono font-bold text-ink">{market.socialMetrics.velocity}/hr</span>
          </div>
          <div className="flex flex-col items-center gap-1 border-l border-border">
            <span className="text-muted">Reposts</span>
            <span className="font-mono font-bold text-ink">{market.socialMetrics.reposts.toLocaleString()}</span>
          </div>
          <div className="flex flex-col items-center gap-1 border-l border-border">
            <span className="text-muted">Sentiment</span>
            <span className={`font-mono font-bold ${market.socialMetrics.sentiment > 50 ? "text-success" : "text-danger"}`}>
              {market.socialMetrics.sentiment}%
            </span>
          </div>
        </div>
      )}

      <div className="space-y-4 mt-auto pt-2">
        {market.progress && (
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="font-medium text-accent">Live: {market.progress.current.toLocaleString()} {market.progress.label}</span>
              <span className="font-medium text-muted">Target: {market.progress.target.toLocaleString()}</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-border">
              <div className="h-full bg-accent" style={{ width: `${Math.min(100, (market.progress.current / market.progress.target) * 100)}%` }}></div>
            </div>
          </div>
        )}

        <div className="space-y-1.5">
          <div className="flex justify-between text-sm">
            <span className="font-medium text-success">YES</span>
            <span className="font-mono font-bold">{market.probability}%</span>
            <span className="font-medium text-danger">NO</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-border">
            <div className="h-full bg-success" style={{ width: `${market.probability}%` }}></div>
          </div>
        </div>
      </div>

      <div className="mt-auto flex items-center justify-between border-t border-border pt-4 text-xs text-muted">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1" title="Total Trading Volume">
            <BarChart2 className="h-3 w-3" />
            <span className="font-mono">{market.volume}</span>
          </div>
          {market.attentionValue && (
            <div className="flex items-center gap-1 rounded bg-blue-500/10 px-1.5 py-0.5 text-blue-500" title="Attention Value (Market Cap)">
              <Sparkles className="h-3 w-3" />
              <span className="font-mono font-bold">AV: ${market.attentionValue}</span>
            </div>
          )}
        </div>
        <button className="flex items-center gap-1 rounded-md bg-border px-2 py-1 font-medium text-ink transition-colors hover:bg-muted hover:text-white">
          Trade <ArrowUpRight className="h-3 w-3" />
        </button>
      </div>
    </motion.div>
  );
}

function TradeModal({ isOpen, onClose, market }: { isOpen: boolean, onClose: () => void, market: any }) {
  const [side, setSide] = useState<"YES" | "NO">("YES");
  const [amount, setAmount] = useState("100");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Reset state when modal opens/closes
  useMemo(() => {
    if (isOpen) {
      setIsProcessing(false);
      setIsSuccess(false);
      setAmount("100");
      setSide("YES");
    }
  }, [isOpen]);

  const prob = market ? (side === "YES" ? market.probability / 100 : 1 - market.probability / 100) : 0.5;
  const payout = market ? (parseFloat(amount || "0") / prob).toFixed(2) : "0.00";
  const roi = market ? (((parseFloat(payout) - parseFloat(amount || "0")) / parseFloat(amount || "0")) * 100).toFixed(0) : "0";

  const handleTrade = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && market && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border bg-panel p-6 shadow-2xl"
          >
            {!isSuccess ? (
              <>
                <div className="mb-6 flex items-start justify-between">
                  <div>
                    <h2 className="text-lg font-semibold leading-tight text-ink">{market.question}</h2>
                    <p className="mt-1 text-sm text-muted">
                      Target: <span className="font-mono text-ink">{market.target}</span>
                    </p>
                  </div>
                  <button onClick={onClose} className="rounded-lg p-1 text-muted hover:bg-border hover:text-ink">
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="mb-6 grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setSide("YES")}
                    className={`relative flex flex-col items-center justify-center gap-1 rounded-xl border p-4 transition-all ${
                      side === "YES"
                        ? "border-success bg-success/10 text-success"
                        : "border-border bg-bg text-muted hover:border-muted"
                    }`}
                  >
                    <span className="text-sm font-bold uppercase tracking-wider">YES</span>
                    <span className="font-mono text-2xl font-bold">{market.probability}%</span>
                    <ArrowUpRight className={`absolute right-2 top-2 h-4 w-4 ${side === "YES" ? "opacity-100" : "opacity-0"}`} />
                  </button>
                  <button
                    onClick={() => setSide("NO")}
                    className={`relative flex flex-col items-center justify-center gap-1 rounded-xl border p-4 transition-all ${
                      side === "NO"
                        ? "border-danger bg-danger/10 text-danger"
                        : "border-border bg-bg text-muted hover:border-muted"
                    }`}
                  >
                    <span className="text-sm font-bold uppercase tracking-wider">NO</span>
                    <span className="font-mono text-2xl font-bold">{100 - market.probability}%</span>
                    <ArrowDownRight className={`absolute right-2 top-2 h-4 w-4 ${side === "NO" ? "opacity-100" : "opacity-0"}`} />
                  </button>
                </div>

                <div className="mb-6 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">Amount</span>
                    <span className="flex items-center gap-1 text-ink">
                      <span className="h-3 w-3 rounded-full bg-accent"></span> 12,450.00 USDT
                    </span>
                  </div>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted text-xs font-bold">USDT</span>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full rounded-xl border border-border bg-bg px-12 py-3 font-mono text-lg font-bold text-ink outline-none focus:border-accent"
                    />
                  </div>
                </div>

                <div className="mb-6 rounded-lg bg-bg p-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted">Potential Payout</span>
                    <span className="font-mono font-bold text-success">{payout} USDT</span>
                  </div>
                  <div className="mt-1 flex justify-between text-xs">
                    <span className="text-muted">Return on Investment</span>
                    <span className="font-mono text-success">+{roi}%</span>
                  </div>
                </div>

                <button
                  onClick={handleTrade}
                  disabled={isProcessing || !amount || parseFloat(amount) <= 0}
                  className={`w-full rounded-xl py-3 text-sm font-bold uppercase tracking-wider text-white transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed ${
                    side === "YES" ? "bg-success" : "bg-danger"
                  }`}
                >
                  {isProcessing ? "Processing..." : `Place ${side} Order`}
                </button>
              </>
            ) : (
              <div className="text-center py-12">
                <div className="mb-6 flex justify-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-success/10">
                    <Check className="h-10 w-10 text-success" />
                  </div>
                </div>
                <h2 className="text-3xl font-bold tracking-tight mb-4 text-ink">Order Placed!</h2>
                <p className="font-medium text-muted">
                  You bought <span className="text-ink font-bold">{amount} USDT</span> of <span className={side === "YES" ? "text-success font-bold" : "text-danger font-bold"}>{side}</span>.
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function AmplifyModal({ isOpen, onClose, market }: { isOpen: boolean, onClose: () => void, market: any }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!market) return;
    navigator.clipboard.writeText(`Check out this market on 810: ${market.question}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && market && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border bg-panel p-6 shadow-2xl"
          >
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold leading-tight text-ink">Amplify Outcome</h2>
                <p className="mt-1 text-sm text-muted">Drive attention to influence the market result.</p>
              </div>
              <button onClick={onClose} className="rounded-lg p-1 text-muted hover:border hover:text-ink">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mb-6 flex gap-4 rounded-lg border border-border bg-bg p-4">
              {market.imageUrl && (
                <div className="relative h-12 w-12 flex-none">
                  <Image src={market.imageUrl} alt="" fill sizes="48px" className="rounded-md object-cover" referrerPolicy="no-referrer" />
                </div>
              )}
              <div>
                <p className="font-medium text-ink line-clamp-2">{market.question}</p>
                <div className="mt-1 flex items-center gap-3 text-xs text-muted">
                  <span className="flex items-center gap-1">
                    <Share2 className="h-3 w-3" /> {market.socialMetrics?.reposts.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Flame className="h-3 w-3" /> {market.socialMetrics?.likes.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button className="flex flex-col items-center justify-center gap-2 rounded-xl border border-border bg-bg p-4 transition-all hover:border-accent hover:text-accent">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                  <Share2 className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium">Share to X</span>
              </button>
              <button className="flex flex-col items-center justify-center gap-2 rounded-xl border border-border bg-bg p-4 transition-all hover:border-accent hover:text-accent">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-50 text-green-600">
                  <Share2 className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium">Discuss</span>
              </button>
            </div>

            <div className="mt-4 rounded-xl border border-accent/20 bg-accent/5 p-4">
              <div className="flex items-center gap-2 mb-2">
                <BadgeDollarSign className="h-4 w-4 text-accent" />
                <h3 className="text-sm font-bold text-accent">Proof of Amplification (PoA)</h3>
              </div>
              <p className="text-xs text-muted mb-3">
                Share your unique affiliate link. Earn <span className="font-bold text-ink">50% of trading fees</span> from users who join and trade via your link.
              </p>
              
              <div className="flex items-center gap-2">
                <div className="flex-1 flex items-center gap-2 rounded-lg border border-border bg-panel px-3 py-2 text-xs font-mono text-muted">
                  <LinkIcon className="h-3 w-3" />
                  <span className="truncate">810.app/m/{market.id}?ref=u_8x92f</span>
                </div>
                <button
                  onClick={handleCopy}
                  className="flex items-center justify-center rounded-lg bg-accent px-4 py-2 text-xs font-bold text-black hover:opacity-90 transition-opacity"
                >
                  {copied ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function CreatorClaimModal({ isOpen, onClose, market }: { isOpen: boolean, onClose: () => void, market: any }) {
  return (
    <AnimatePresence>
      {isOpen && market && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border bg-panel p-6 shadow-2xl overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-orange-500"></div>
            
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold leading-tight text-ink flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-orange-500" />
                  Creator Claim Pool
                </h2>
                <p className="mt-1 text-sm text-muted">Verify your identity to claim the attention value generated by your content.</p>
              </div>
              <button onClick={onClose} className="rounded-lg p-1 text-muted hover:border hover:text-ink">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mb-6 rounded-xl border border-orange-500/20 bg-orange-500/5 p-6 text-center">
              <p className="text-sm text-orange-600/80 font-medium mb-1 uppercase tracking-wider">Unclaimed Pool</p>
              <div className="text-4xl font-mono font-black text-orange-500">
                {market.creatorPool.toLocaleString()} <span className="text-2xl">USDT</span>
              </div>
              <p className="text-xs text-muted mt-3">
                This market has generated <span className="font-bold text-ink">{market.attentionValue} AV</span> in total attention value. 1% of all trading volume is locked for the creator.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted mb-2">Are you the creator?</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button className="flex flex-col items-center justify-center gap-2 rounded-xl border border-border bg-panel p-3 text-sm font-bold text-ink transition-all hover:border-accent hover:text-accent">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500/10 text-orange-500">
                      <BadgeDollarSign className="h-4 w-4" />
                    </div>
                    Claim to Wallet
                  </button>
                  <button className="flex flex-col items-center justify-center gap-2 rounded-xl border border-border bg-panel p-3 text-sm font-bold text-ink transition-all hover:border-success hover:text-success">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-success/10 text-success">
                      <Heart className="h-4 w-4" />
                    </div>
                    Donate to Charity
                  </button>
                </div>
              </div>

              <div className="mt-3 flex items-start gap-2 rounded-lg bg-success/5 p-3 border border-success/20">
                <ShieldCheck className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                <p className="text-[10px] leading-relaxed text-muted">
                  <strong className="text-success">Bank-Grade Security:</strong> Claiming requires cryptographic proof of account ownership via OAuth 2.0 combined with a signed Web3 wallet transaction. Funds are secured in an audited, time-locked escrow smart contract to prevent spoofing and unauthorized withdrawals.
                </p>
              </div>

              <div className="relative flex items-center py-2">
                <div className="flex-grow border-t border-border"></div>
                <span className="mx-4 flex-shrink-0 text-xs text-muted">OR</span>
                <div className="flex-grow border-t border-border"></div>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted mb-2">Community Action</h3>
                <button 
                  onClick={() => {
                    const text = `Hey, you have ${market.creatorPool.toLocaleString()} USDT waiting to be claimed or donated to charity on @810app! 👇\n\n810.app/m/${market.id}`;
                    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent py-3 text-sm font-bold text-black transition-all hover:opacity-90"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  Tag Creator on X
                </button>
              </div>
            </div>
            
            <p className="mt-4 text-center text-[10px] text-muted">
              By interacting, you agree to the 810 Terms of Service.
            </p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
