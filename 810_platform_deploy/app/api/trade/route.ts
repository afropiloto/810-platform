import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { marketId, outcome, amount, type } = body;

    // Basic validation
    if (!marketId || !outcome || !amount || !type) {
      return NextResponse.json({ error: 'Missing required fields (marketId, outcome, amount, type)' }, { status: 400 });
    }

    if (type !== 'buy' && type !== 'sell') {
      return NextResponse.json({ error: 'Trade type must be "buy" or "sell"' }, { status: 400 });
    }

    if (amount <= 0) {
      return NextResponse.json({ error: 'Amount must be greater than 0' }, { status: 400 });
    }

    // Web2.5 Architecture:
    // Trades are matched off-chain in a central database for zero latency and zero gas fees.
    // Blockchain (USDC/USDT) is ONLY used for deposits, withdrawals, and creator claims.
    // e.g., await db.executeTrade({ userId, marketId, outcomeIndex, amount })

    return NextResponse.json({
      success: true,
      message: `Successfully executed ${type} for ${amount} USDC on ${outcome}`,
      txId: `offchain_${Math.random().toString(16).slice(2, 10)}`, // Mock internal DB ID
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({ error: 'Trade execution failed' }, { status: 500 });
  }
}
