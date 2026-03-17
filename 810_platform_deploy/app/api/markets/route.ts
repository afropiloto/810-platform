import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const mockMarkets = [
  {
    id: '1',
    title: 'Will MrBeast reach 300M subscribers before June 2026?',
    creator: 'MrBeast',
    creatorImage: 'https://unavatar.io/youtube/mrbeast',
    category: 'YouTube',
    volume: '1.2M USDC',
    liquidity: '450k USDC',
    creatorPool: '50,000 USDC',
    endDate: '2026-06-01',
    options: [
      { label: 'Yes', probability: 65, price: 0.65, trend: 'up' },
      { label: 'No', probability: 35, price: 0.35, trend: 'down' }
    ]
  },
  {
    id: '2',
    title: 'Will Elon Musk step down as X CEO in 2026?',
    creator: 'Elon Musk',
    creatorImage: 'https://unavatar.io/twitter/elonmusk',
    category: 'X (Twitter)',
    volume: '3.4M USDC',
    liquidity: '1.1M USDC',
    creatorPool: '125,000 USDC',
    endDate: '2026-12-31',
    options: [
      { label: 'Yes', probability: 22, price: 0.22, trend: 'down' },
      { label: 'No', probability: 78, price: 0.78, trend: 'up' }
    ]
  },
  {
    id: '3',
    title: 'Will GTA VI be delayed to 2027?',
    creator: 'Rockstar Games',
    creatorImage: 'https://unavatar.io/twitter/rockstargames',
    category: 'Gaming',
    volume: '850k USDC',
    liquidity: '200k USDC',
    creatorPool: '15,000 USDC',
    endDate: '2026-12-31',
    options: [
      { label: 'Yes', probability: 45, price: 0.45, trend: 'up' },
      { label: 'No', probability: 55, price: 0.55, trend: 'down' }
    ]
  },
  {
    id: '11',
    title: "Will Netflix's One Piece Season 2 trailer reach 50M likes on X?",
    creator: '@onepiecenetflix',
    creatorImage: 'https://unavatar.io/twitter/onepiecenetflix',
    category: 'Brands',
    volume: '1.5M USDC',
    liquidity: '500k USDC',
    creatorPool: '15,000 USDC',
    endDate: '2026-12-31',
    options: [
      { label: 'Yes', probability: 60, price: 0.60, trend: 'up' },
      { label: 'No', probability: 40, price: 0.40, trend: 'down' }
    ]
  },
  {
    id: '12',
    title: 'Will Khaby Lame reach 200M followers on TikTok before 2027?',
    creator: '@khaby.lame',
    creatorImage: 'https://unavatar.io/twitter/khabylame',
    category: 'Influencers',
    volume: '2.2M USDC',
    liquidity: '800k USDC',
    creatorPool: '22,000 USDC',
    endDate: '2026-12-31',
    options: [
      { label: 'Yes', probability: 85, price: 0.85, trend: 'up' },
      { label: 'No', probability: 15, price: 0.15, trend: 'down' }
    ]
  },
  {
    id: '13',
    title: 'Will GTA VI Trailer 2 break 100M views in 24 hours?',
    creator: '@RockstarGames',
    creatorImage: 'https://unavatar.io/twitter/rockstargames',
    category: 'Gaming',
    volume: '4.5M USDC',
    liquidity: '1.2M USDC',
    creatorPool: '45,000 USDC',
    endDate: '2026-12-31',
    options: [
      { label: 'Yes', probability: 75, price: 0.75, trend: 'up' },
      { label: 'No', probability: 25, price: 0.25, trend: 'down' }
    ]
  }
];

export async function GET() {
  // In a real app, this would fetch from a database (e.g., PostgreSQL / Supabase)
  return NextResponse.json({ markets: mockMarkets });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.title || !body.category || !body.endDate) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Mock DB insert
    const newMarket = { 
      id: Date.now().toString(), 
      ...body, 
      volume: '0 USDC', 
      liquidity: '0 USDC',
      creatorPool: '0 USDC'
    };
    
    return NextResponse.json({ success: true, market: newMarket }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request payload' }, { status: 400 });
  }
}
