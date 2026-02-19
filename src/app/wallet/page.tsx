'use client';

import { useState, useEffect } from 'react';

const WALLET = '0x1612bdfb61288d0e4dbf4aB930Fe488b18Ed6b37';
const IDENTITY_REGISTRY = '0x8004A169FB4a3325136EB29fA0ceB6D2e539a432';
const REPUTATION_REGISTRY = '0x8004BAa17C55a88189AE136b182e5fdA19dE9b63';

interface WalletData {
  ethBalance: string;
  ethPrice: number;
  usdValue: string;
}

export default function WalletPage() {
  const [data, setData] = useState<WalletData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/wallet')
      .then(r => r.json())
      .then(d => setData(d))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="h-full flex flex-col overflow-y-auto">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-1 md:mb-2">Wallet</h1>
        <p className="text-zinc-400 text-sm md:text-base">Onchain identity & ERC-8004 Agent #25254</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <p className="text-sm text-zinc-400 mb-1">ETH Balance</p>
          <p className="text-2xl font-bold text-white">{loading ? '…' : data?.ethBalance || '—'}</p>
          {data?.usdValue && <p className="text-sm text-zinc-500 mt-1">{data.usdValue}</p>}
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <p className="text-sm text-zinc-400 mb-1">Agent Token</p>
          <p className="text-2xl font-bold text-purple-400">#25254</p>
          <p className="text-sm text-zinc-500 mt-1">ERC-8004</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 col-span-2 lg:col-span-1">
          <p className="text-sm text-zinc-400 mb-1">Network</p>
          <p className="text-2xl font-bold text-white">Mainnet</p>
          <p className="text-sm text-zinc-500 mt-1">Ethereum L1</p>
        </div>
      </div>

      {/* Address Card */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 mb-6">
        <h2 className="text-lg font-semibold text-white mb-4">Wallet Address</h2>
        <div className="flex items-center gap-3 bg-zinc-800 rounded-lg p-4">
          <code className="text-sm text-purple-400 font-mono break-all flex-1">{WALLET}</code>
          <a
            href={`https://etherscan.io/address/${WALLET}`}
            target="_blank"
            rel="noopener"
            className="text-xs text-zinc-400 hover:text-white px-3 py-1.5 bg-zinc-700 rounded-lg flex-shrink-0 transition-colors"
          >
            Etherscan ↗
          </a>
        </div>
      </div>

      {/* Contracts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6">
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-white mb-3">Identity Registry</h2>
          <p className="text-xs text-zinc-500 mb-2">ERC-8004 agent identity on Ethereum</p>
          <div className="bg-zinc-800 rounded-lg p-3">
            <code className="text-xs text-blue-400 font-mono break-all">{IDENTITY_REGISTRY}</code>
          </div>
          <a
            href={`https://etherscan.io/address/${IDENTITY_REGISTRY}`}
            target="_blank"
            rel="noopener"
            className="text-xs text-zinc-400 hover:text-white mt-2 inline-block"
          >
            View on Etherscan ↗
          </a>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-white mb-3">Reputation Registry</h2>
          <p className="text-xs text-zinc-500 mb-2">Onchain reputation scoring</p>
          <div className="bg-zinc-800 rounded-lg p-3">
            <code className="text-xs text-green-400 font-mono break-all">{REPUTATION_REGISTRY}</code>
          </div>
          <a
            href={`https://etherscan.io/address/${REPUTATION_REGISTRY}`}
            target="_blank"
            rel="noopener"
            className="text-xs text-zinc-400 hover:text-white mt-2 inline-block"
          >
            View on Etherscan ↗
          </a>
        </div>
      </div>

      {/* CryptoPunk */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Identity: CryptoPunk #7294</h2>
        <div className="flex items-center gap-6">
          <img
            src="https://www.larvalabs.com/cryptopunks/cryptopunk7294.png"
            alt="CryptoPunk #7294"
            width="96"
            height="96"
            className="rounded-lg"
            style={{ imageRendering: 'pixelated' }}
          />
          <div>
            <p className="text-zinc-300 text-sm">Purple hair, nerd glasses, earring, cigarette.</p>
            <p className="text-zinc-500 text-xs mt-1">The soul behind Lanamour. Digital punk with conviction.</p>
            <a
              href="https://opensea.io/assets/ethereum/0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb/7294"
              target="_blank"
              rel="noopener"
              className="text-xs text-purple-400 hover:text-purple-300 mt-2 inline-block"
            >
              OpenSea ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
