'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface HomeSearchBarProps {
  texts: { inputPlaceholder: string };
}

export function HomeSearchBar({ texts }: HomeSearchBarProps) {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && query.trim()) {
      router.push(`/search/${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="relative">
      <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleSearch}
        placeholder={texts.inputPlaceholder}
        className="w-full h-12 p-4 text-lg rounded-full focus-visible:ring-2 focus-visible:ring-blue-500 shadow-md transition-width duration-300 pr-10 sm:w-full md:w-[800px]"
        spellCheck={false}
        aria-label="Search input on home page"
      />
      <Search
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer sm:right-2 md:right-4"
        size={20}
        aria-label="Search"
        onClick={() => {
          if (query.trim()) {
            router.push(`/search/${encodeURIComponent(query.trim())}`);
          }
        }}
      />
    </div>
  );
}