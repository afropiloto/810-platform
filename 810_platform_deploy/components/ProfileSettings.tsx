'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { User, Wallet, Shield, Bell, Twitter, Youtube, CheckCircle2, AlertCircle } from 'lucide-react';
import Image from 'next/image';
import BuyModal from './BuyModal';

export default function ProfileSettings() {
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'notifications'>('profile');
  const [isWalletConnected, setIsWalletConnected] = useState(true);
  const [isTwitterConnected, setIsTwitterConnected] = useState(true);
  const [isYoutubeConnected, setIsYoutubeConnected] = useState(false);
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText("0x71C...9A23");
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-ink">Settings</h1>
        <p className="text-muted">Manage your account, security, and connected platforms.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <nav className="flex flex-col space-y-1">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === 'profile'
                  ? 'bg-accent text-black'
                  : 'text-muted hover:bg-panel hover:text-ink'
              }`}
            >
              <User className="h-4 w-4" />
              Profile & Connections
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === 'security'
                  ? 'bg-accent text-black'
                  : 'text-muted hover:bg-panel hover:text-ink'
              }`}
            >
              <Shield className="h-4 w-4" />
              Security & Wallet
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === 'notifications'
                  ? 'bg-accent text-black'
                  : 'text-muted hover:bg-panel hover:text-ink'
              }`}
            >
              <Bell className="h-4 w-4" />
              Notifications
            </button>
          </nav>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="rounded-2xl border border-border bg-panel p-6 shadow-sm"
          >
            {activeTab === 'profile' && (
              <div className="space-y-8">
                {/* Avatar & Basic Info */}
                <div>
                  <h2 className="text-lg font-bold text-ink mb-4">Public Profile</h2>
                  <div className="flex items-center gap-6">
                    <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-border flex-shrink-0">
                      <Image
                        src="https://picsum.photos/seed/user123/200/200"
                        alt="Profile"
                        fill
                        sizes="80px"
                        className="object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="space-y-2 flex-1">
                      <div>
                        <label className="block text-xs font-medium text-muted mb-1">Display Name</label>
                        <input 
                          type="text" 
                          defaultValue="Alex Trader" 
                          className="w-full max-w-md rounded-lg border border-border bg-bg px-3 py-2 text-sm text-ink focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-muted mb-1">Username</label>
                        <div className="flex max-w-md items-center rounded-lg border border-border bg-bg px-3 py-2">
                          <span className="text-muted mr-1">@</span>
                          <input 
                            type="text" 
                            defaultValue="alextrader" 
                            className="w-full bg-transparent text-sm text-ink focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <hr className="border-border" />

                {/* Connected Accounts (Crucial for Creators) */}
                <div>
                  <div className="mb-4">
                    <h2 className="text-lg font-bold text-ink">Connected Platforms</h2>
                    <p className="text-xs text-muted mt-1">Connect your social accounts to verify identity and claim creator pools.</p>
                  </div>
                  
                  <div className="space-y-3">
                    {/* Twitter/X Connection */}
                    <div className="flex items-center justify-between rounded-xl border border-border bg-bg p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1DA1F2]/10 text-[#1DA1F2]">
                          <Twitter className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium text-ink">X (Twitter)</p>
                          {isTwitterConnected ? (
                            <p className="text-xs text-muted">Connected as @alextrader</p>
                          ) : (
                            <p className="text-xs text-muted">Not connected</p>
                          )}
                        </div>
                      </div>
                      <button 
                        onClick={() => setIsTwitterConnected(!isTwitterConnected)}
                        className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                          isTwitterConnected 
                            ? 'border border-border text-muted hover:text-danger hover:border-danger' 
                            : 'bg-accent text-black hover:opacity-90'
                        }`}
                      >
                        {isTwitterConnected ? 'Disconnect' : 'Connect'}
                      </button>
                    </div>

                    {/* YouTube Connection */}
                    <div className="flex items-center justify-between rounded-xl border border-border bg-bg p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FF0000]/10 text-[#FF0000]">
                          <Youtube className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium text-ink">YouTube</p>
                          {isYoutubeConnected ? (
                            <p className="text-xs text-muted">Connected as Alex Trader</p>
                          ) : (
                            <p className="text-xs text-muted">Not connected</p>
                          )}
                        </div>
                      </div>
                      <button 
                        onClick={() => setIsYoutubeConnected(!isYoutubeConnected)}
                        className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                          isYoutubeConnected 
                            ? 'border border-border text-muted hover:text-danger hover:border-danger' 
                            : 'bg-accent text-black hover:opacity-90'
                        }`}
                      >
                        {isYoutubeConnected ? 'Disconnect' : 'Connect'}
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end pt-4">
                  <button className="rounded-lg bg-accent px-6 py-2 text-sm font-bold text-black transition-colors hover:bg-accent/90">
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-lg font-bold text-ink mb-4">Smart Account & Wallet</h2>
                  <div className="rounded-xl border border-border bg-bg p-5">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent">
                          <Wallet className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium text-ink">ERC-4337 Smart Account</p>
                          <p className="text-xs text-muted font-mono">0x71C...9A23</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-xs font-medium text-success bg-success/10 px-2 py-1 rounded-md">
                        <CheckCircle2 className="h-3 w-3" /> Google Connected
                      </div>
                    </div>

                    <div className="mb-4 rounded-lg border border-orange-500/20 bg-orange-500/5 p-3 flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-orange-500 flex-shrink-0 mt-0.5" />
                      <p className="text-[10px] text-orange-500/90 leading-relaxed">
                        <strong>Deposit Policy:</strong> Your Smart Account only accepts <strong>USDC</strong> and <strong>USDT</strong> on supported L2 networks (Base, Arbitrum, Polygon). Sending other tokens may result in permanent loss.
                      </p>
                    </div>

                    <div className="mb-4 rounded-lg border border-border bg-panel p-3 flex items-start gap-2">
                      <div className="h-4 w-4 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="h-2 w-2 rounded-full bg-success"></div>
                      </div>
                      <p className="text-[10px] text-muted leading-relaxed">
                        <strong>Web2.5 Architecture:</strong> To provide zero-latency, gasless trading, all market executions happen off-chain. The blockchain is ONLY used for deposits, withdrawals, and creator pool claims.
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <button onClick={() => setIsBuyModalOpen(true)} className="flex-1 rounded-lg bg-accent py-2 text-sm font-bold text-black transition-colors hover:opacity-90">
                        Deposit USDC/USDT
                      </button>
                      <button onClick={handleCopyAddress} className="flex-1 rounded-lg border border-border py-2 text-sm font-medium text-ink transition-colors hover:bg-panel">
                        {isCopied ? "Copied!" : "Copy Address"}
                      </button>
                    </div>
                  </div>
                </div>

                <hr className="border-border" />

                <div>
                  <h2 className="text-lg font-bold text-ink mb-4">Email Address</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-muted mb-1">Current Email</label>
                      <div className="flex gap-3">
                        <input 
                          type="email" 
                          defaultValue="alex@example.com" 
                          disabled
                          className="w-full max-w-md rounded-lg border border-border bg-bg px-3 py-2 text-sm text-muted opacity-70"
                        />
                        <button className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-panel">
                          Update
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <hr className="border-border" />
                
                <div>
                  <h2 className="text-lg font-bold text-danger mb-4">Danger Zone</h2>
                  <div className="rounded-xl border border-danger/20 bg-danger/5 p-5">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-ink">Deactivate Account</p>
                        <p className="text-xs text-muted mt-1 max-w-md">
                          Once you delete your account, there is no going back. Please be certain. All active positions will be force-closed at current market prices.
                        </p>
                      </div>
                      <button className="rounded-lg bg-danger px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-danger/90">
                        Deactivate
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-ink mb-4">Email Notifications</h2>
                  <div className="space-y-4">
                    {[
                      { id: 'trade-exec', label: 'Trade Executions', desc: 'When your limit orders are filled' },
                      { id: 'market-res', label: 'Market Resolutions', desc: 'When a market you hold a position in resolves' },
                      { id: 'creator-pool', label: 'Creator Pool Updates', desc: 'When a market about you generates significant fees' },
                      { id: 'marketing', label: 'Platform Updates', desc: 'New features, markets, and announcements' },
                    ].map((item) => (
                      <div key={item.id} className="flex items-start justify-between">
                        <div>
                          <p className="font-medium text-sm text-ink">{item.label}</p>
                          <p className="text-xs text-muted">{item.desc}</p>
                        </div>
                        <label className="relative inline-flex cursor-pointer items-center">
                          <input type="checkbox" className="peer sr-only" defaultChecked={item.id !== 'marketing'} />
                          <div className="peer h-6 w-11 rounded-full bg-border after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-accent peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent/20"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
      <BuyModal isOpen={isBuyModalOpen} onClose={() => setIsBuyModalOpen(false)} onSuccess={(amount) => console.log('Bought', amount)} />
    </div>
  );
}
