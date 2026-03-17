'use client';

import { motion, AnimatePresence } from 'motion/react';

export default function Portfolio() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-ink">Portfolio</h1>
          <p className="text-muted">Manage your active positions and performance.</p>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex flex-col">
            <span className="text-muted">Net Worth</span>
            <span className="font-mono font-bold text-ink">$12,450.00</span>
          </div>
          <div className="h-8 w-px bg-border"></div>
          <div className="flex flex-col">
            <span className="text-muted">Available Cash</span>
            <span className="font-mono font-bold text-ink">$2,450.00</span>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-xl border border-border bg-panel p-6"
        >
          <div className="text-sm text-muted mb-2">Total Profit</div>
          <div className="text-3xl font-bold tracking-tight text-success">+$2,140.00</div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-xl border border-border bg-panel p-6"
        >
          <div className="text-sm text-muted mb-2">Active Positions</div>
          <div className="text-3xl font-bold tracking-tight text-ink">12</div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-xl border border-border bg-panel p-6"
        >
          <div className="text-sm text-muted mb-2">Win Rate</div>
          <div className="text-3xl font-bold tracking-tight text-ink">64%</div>
        </motion.div>
      </div>

      <div>
        <h2 className="text-lg font-semibold tracking-tight text-ink mb-4">Active Positions</h2>
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            <motion.div
              key="pos-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <PositionRow 
                market="Will @elonmusk reach 200M followers by April?"
                side="YES"
                amount="$500.00"
                value="$620.00"
                profit="+$120.00"
              />
            </motion.div>
            <motion.div
              key="pos-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <PositionRow 
                market="MrBeast's next video to hit 100M views in 24h?"
                side="NO"
                amount="$250.00"
                value="$210.00"
                profit="-$40.00"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function PositionRow({ market, side, amount, value, profit }: any) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border bg-panel p-4 transition-all hover:border-muted md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-4 flex-1">
        <div className={`flex h-8 w-12 items-center justify-center rounded-md text-xs font-bold tracking-wider ${side === "YES" ? "bg-success/10 text-success" : "bg-danger/10 text-danger"}`}>
          {side}
        </div>
        <div className="font-medium text-ink line-clamp-1">{market}</div>
      </div>
      <div className="flex items-center justify-between md:justify-end gap-8 text-sm">
        <div className="flex flex-col items-start md:items-end">
          <span className="text-muted text-xs">Cost</span>
          <span className="font-mono font-medium text-ink">{amount}</span>
        </div>
        <div className="flex flex-col items-start md:items-end">
          <span className="text-muted text-xs">Value</span>
          <span className="font-mono font-medium text-ink">{value}</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-muted text-xs">Profit</span>
          <span className={`font-mono font-bold ${profit.startsWith('+') ? "text-success" : "text-danger"}`}>{profit}</span>
        </div>
      </div>
    </div>
  );
}
