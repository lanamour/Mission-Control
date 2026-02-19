import { NextResponse } from 'next/server';
import { readFileSync, statSync } from 'fs';

export async function GET() {
  try {
    const csvPath = '/data/workspace/gtcp/car-transactions-db.csv';
    const csv = readFileSync(csvPath, 'utf-8');
    const lines = csv.trim().split('\n');
    const headers = lines[0].split(',');
    const rows = lines.slice(1).map(line => {
      const vals = line.split(',');
      const obj: any = {};
      headers.forEach((h, i) => obj[h.trim()] = vals[i]?.trim() || '');
      return obj;
    });

    // Stats
    const totalRecords = rows.length;
    const makes = [...new Set(rows.map(r => r.make))];
    const categories = rows.reduce((acc: any, r) => {
      acc[r.category] = (acc[r.category] || 0) + 1;
      return acc;
    }, {});

    const prices = rows
      .map(r => parseFloat(r.sale_price_usd))
      .filter(p => !isNaN(p) && p > 0);
    const avgPrice = prices.length > 0 ? Math.round(prices.reduce((s, p) => s + p, 0) / prices.length) : 0;
    const maxPrice = prices.length > 0 ? Math.max(...prices) : 0;

    // Recent transactions (last 10)
    const recent = rows.slice(0, 15).map(r => ({
      date: r.date,
      make: r.make,
      model: r.model,
      year: r.year,
      price: parseFloat(r.sale_price_usd) || 0,
      priceEur: parseFloat(r.sale_price_eur) || 0,
      auction: r.auction_house,
      category: r.category,
      sold: r.sold,
    }));

    // Top makes by count
    const makeCounts = rows.reduce((acc: any, r) => {
      acc[r.make] = (acc[r.make] || 0) + 1;
      return acc;
    }, {});
    const topMakes = Object.entries(makeCounts)
      .sort((a: any, b: any) => b[1] - a[1])
      .slice(0, 8)
      .map(([make, count]) => ({ make, count }));

    // LP research
    let lpCount = 0;
    try {
      const lp = readFileSync('/data/workspace/gtcp/lp-research.md', 'utf-8');
      lpCount = (lp.match(/^##\s/gm) || []).length;
    } catch {}

    const stat = statSync(csvPath);

    return NextResponse.json({
      totalRecords,
      makes: makes.length,
      categories,
      avgPrice,
      maxPrice,
      recent,
      topMakes,
      lpProspects: lpCount,
      lastUpdated: stat.mtime.toISOString(),
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}
