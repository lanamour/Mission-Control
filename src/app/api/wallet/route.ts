import { NextResponse } from 'next/server';

const WALLET = '0x1612bdfb61288d0e4dbf4aB930Fe488b18Ed6b37';

export async function GET() {
  let ethBalance = '—';
  let ethPrice = 0;
  let usdValue = '';

  try {
    // Get ETH price
    const priceRes = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd', {
      next: { revalidate: 300 },
    });
    const priceData = await priceRes.json();
    ethPrice = priceData?.ethereum?.usd || 0;
  } catch {}

  try {
    // Get balance via public RPC
    const res = await fetch('https://eth.llamarpc.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'eth_getBalance',
        params: [WALLET, 'latest'],
        id: 1,
      }),
    });
    const data = await res.json();
    if (data?.result) {
      const wei = BigInt(data.result);
      const eth = Number(wei) / 1e18;
      ethBalance = eth.toFixed(4) + ' ETH';
      if (ethPrice > 0) {
        usdValue = `$${(eth * ethPrice).toFixed(2)}`;
      }
    }
  } catch {}

  return NextResponse.json({ ethBalance, ethPrice, usdValue });
}
