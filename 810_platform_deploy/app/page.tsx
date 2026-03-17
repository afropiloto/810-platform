'use client';

import { useState } from 'react';
import { Menu, X, LayoutGrid, PieChart, Activity as ActivityIcon, Trophy, PlusCircle, Wallet, User, LogOut } from 'lucide-react';
import Markets from '@/components/Markets';
import Portfolio from '@/components/Portfolio';
import Activity from '@/components/Activity';
import Leaderboard from '@/components/Leaderboard';
import CreateMarket from '@/components/CreateMarket';
import ProfileSettings from '@/components/ProfileSettings';
import LoginModal from '@/components/LoginModal';
import ThemeToggle from '@/components/ThemeToggle';

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("markets");
  const [walletConnected, setWalletConnected] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [following, setFollowing] = useState<string[]>([]);

  const toggleWallet = () => {
    if (walletConnected) {
      setWalletConnected(false);
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const toggleFollow = (id: string) => {
    setFollowing(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  return (
    <div className="flex min-h-screen">
      {/* Mobile Header */}
      <header className="fixed top-0 left-0 right-0 z-40 flex h-16 items-center justify-between border-b border-border bg-bg/80 px-4 backdrop-blur-md lg:hidden">
        <button onClick={() => { setActiveTab("markets"); setIsMobileMenuOpen(false); }} className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-accent text-black font-bold">8</div>
          <span className="font-mono font-bold tracking-tight">810</span>
        </button>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 transform border-r border-border bg-bg transition-transform duration-200 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col p-4 pt-20 lg:pt-4">
          <div className="mb-8 hidden items-center justify-between px-2 lg:flex">
            <button onClick={() => setActiveTab("markets")} className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-accent text-black font-bold">8</div>
              <span className="font-mono text-xl font-bold tracking-tight">810</span>
            </button>
            <ThemeToggle />
          </div>

          <nav className="space-y-1">
            <NavItem
              icon={<LayoutGrid />}
              label="Markets"
              active={activeTab === "markets"}
              onClick={() => { setActiveTab("markets"); setIsMobileMenuOpen(false); }}
            />
            <NavItem
              icon={<PieChart />}
              label="Portfolio"
              active={activeTab === "portfolio"}
              onClick={() => { setActiveTab("portfolio"); setIsMobileMenuOpen(false); }}
            />
            <NavItem
              icon={<ActivityIcon />}
              label="Activity"
              active={activeTab === "activity"}
              onClick={() => { setActiveTab("activity"); setIsMobileMenuOpen(false); }}
            />
            <NavItem
              icon={<Trophy />}
              label="Leaderboard"
              active={activeTab === "leaderboard"}
              onClick={() => { setActiveTab("leaderboard"); setIsMobileMenuOpen(false); }}
            />
            <NavItem
              icon={<PlusCircle />}
              label="Create"
              active={activeTab === "create"}
              onClick={() => { setActiveTab("create"); setIsMobileMenuOpen(false); }}
            />
            <NavItem
              icon={<User />}
              label="Profile"
              active={activeTab === "profile"}
              onClick={() => { setActiveTab("profile"); setIsMobileMenuOpen(false); }}
            />
          </nav>

          <div className="mt-auto border-t border-border pt-4">
            {walletConnected ? (
              <>
                <div className="mb-4 px-2">
                  <p className="text-xs text-muted uppercase tracking-wider">Balance</p>
                  <div className="mt-1 flex items-baseline gap-1">
                    <span className="text-xl font-mono font-bold">12,450.00 USDT</span>
                    <span className="text-xs text-success">+2.4%</span>
                  </div>
                </div>
                <button
                  onClick={toggleWallet}
                  className="flex w-full items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium transition-all bg-danger/10 text-danger hover:bg-danger/20"
                >
                  <LogOut className="h-4 w-4" />
                  Log Out
                </button>
              </>
            ) : (
              <button
                onClick={toggleWallet}
                className="flex w-full items-center justify-center gap-2 rounded-lg py-2 text-sm font-bold transition-all bg-accent text-black hover:opacity-90"
              >
                <Wallet className="h-4 w-4" />
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 p-4 lg:p-8 mt-16 lg:mt-0">
        {activeTab === "markets" && <Markets />}
        {activeTab === "portfolio" && <Portfolio />}
        {activeTab === "activity" && <Activity following={following} />}
        {activeTab === "leaderboard" && <Leaderboard following={following} onToggleFollow={toggleFollow} />}
        {activeTab === "create" && <CreateMarket onSuccess={() => setActiveTab("markets")} />}
        {activeTab === "profile" && <ProfileSettings />}
      </main>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Login Modal */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
        onConnect={() => {
          setWalletConnected(true);
          setIsLoginModalOpen(false);
        }} 
      />
    </div>
  );
}

function NavItem({ icon, label, active = false, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
        active ? "bg-panel text-ink" : "text-muted hover:bg-panel hover:text-ink"
      }`}
    >
      <span className="[&>svg]:h-5 [&>svg]:w-5">{icon}</span>
      {label}
    </button>
  );
}
