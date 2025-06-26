'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const clearSearch = () => {
    setQuery('');
  };

  return (
    <header className="w-full bg-primary text-primary-foreground px-6 py-3 flex items-center justify-between shadow">
      <h1 className="text-lg font-bold">JS/TS Problem Explorer</h1>
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search code or description..."
            className="px-3 py-1 pr-8 rounded border border-muted focus:outline-none focus:ring text-black bg-white"
          />
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          )}
        </div>
        <button type="submit" className="bg-accent text-accent-foreground px-3 py-1 rounded">Search</button>
      </form>
    </header>
  );
} 