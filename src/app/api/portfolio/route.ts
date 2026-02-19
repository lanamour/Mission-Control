import { NextResponse } from 'next/server';

interface Position {
  name: string;
  ticker: string;
  invested: number;
  currentValue?: number;
  markup?: string;
  status: string;
  notes: string;
  type: 'crypto' | 'defi' | 'nft';
}

export async function GET() {
  // Fetch ETH price
  let ethPrice = 0;
  try {
    const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd', {
      next: { revalidate: 300 },
    });
    const data = await res.json();
    ethPrice = data?.ethereum?.usd || 0;
  } catch {}

  const positions: Position[] = [
    {
      name: 'Myriad Markets',
      ticker: 'MYRIAD',
      invested: 25000,
      status: '$100M+ trading volume',
      notes: 'Prediction markets protocol. Co-founders: Farokh, Ilan, Loxley. Expanded to BNB Chain.',
      type: 'defi',
    },
    {
      name: 'MegaETH (Fluffle)',
      ticker: 'MEGA',
      invested: ethPrice > 0 ? Math.round(ethPrice) : 1970,
      status: '1 ETH in Fluffle round',
      notes: 'Real-time L2, 100k TPS, sub-ms latency. Vitalik-backed.',
      type: 'crypto',
    },
    {
      name: 'MegaETH (Echo)',
      ticker: 'MEGA',
      invested: 30000,
      status: 'Public round on Echo',
      notes: '$20M seed (Dragonfly), $450M oversubscribed token sale.',
      type: 'crypto',
    },
    {
      name: 'Humanity Protocol',
      ticker: 'HP',
      invested: 7500,
      currentValue: 7500 * 18,
      markup: '~18x',
      status: '$1.1B FDV (Pantera + Jump)',
      notes: 'Decentralized identity/proof-of-humanity. Entry at $60M val.',
      type: 'crypto',
    },
  ];

  const totalInvested = positions.reduce((s, p) => s + p.invested, 0);
  const humanityValue = 7500 * 18;

  return NextResponse.json({
    positions,
    totalInvested,
    ethPrice,
    estimatedValue: totalInvested - 7500 + humanityValue, // only HP has clear markup
    lastUpdated: new Date().toISOString(),
  });
}
