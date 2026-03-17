'use client';

export default function Activity({ following }: { following: string[] }) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-ink">Activity</h1>
        <p className="text-muted">
          {following.length > 0 ? `Filtering by ${following.length} followed traders.` : "Real-time transaction log."}
        </p>
      </div>

      <div className="space-y-4">
        <ActivityRow 
          user="0x71C...3A4E"
          action="BOUGHT YES"
          market="Will @elonmusk reach 200M followers by April?"
          amount="$500.00"
          time="2m ago"
        />
        <ActivityRow 
          user="0x4B2...F912"
          action="BOUGHT NO"
          market="MrBeast's next video to hit 100M views in 24h?"
          amount="$1,200.00"
          time="5m ago"
        />
        <ActivityRow 
          user="0x9D1...E204"
          action="CLAIMED ROYALTIES"
          market="Will #AttentionProtocol trend in the top 10 today?"
          amount="$420.00"
          time="12m ago"
        />
        <ActivityRow 
          user="0x1A5...C831"
          action="BOUGHT YES"
          market="Will @elonmusk reach 200M followers by April?"
          amount="$50.00"
          time="15m ago"
        />
      </div>
    </div>
  );
}

function ActivityRow({ user, action, market, amount, time }: any) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-panel p-4 transition-all hover:border-muted md:flex-row md:items-center md:justify-between">
      <div className="flex flex-wrap items-center gap-3">
        <div className="font-mono text-sm text-muted">{user}</div>
        <div className={`rounded-md px-2 py-1 text-xs font-bold uppercase tracking-wider ${action.includes('YES') ? "bg-success/10 text-success" : action.includes('NO') ? "bg-danger/10 text-danger" : "bg-accent/10 text-accent"}`}>
          {action}
        </div>
        <div className="text-sm font-medium text-ink line-clamp-1">{market}</div>
      </div>
      <div className="flex items-center justify-between md:justify-end gap-4">
        <div className="font-mono text-sm font-bold text-ink">{amount}</div>
        <div className="text-xs text-muted">{time}</div>
      </div>
    </div>
  );
}
