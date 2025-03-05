'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react'; // 돋보기 아이콘

interface SearchResultsSearchBarProps {
  defaultQuery?: string; // 기본 검색어 props
}

export function SearchResultsSearchBar({ defaultQuery }: SearchResultsSearchBarProps) {
  const [query, setQuery] = useState(defaultQuery || ''); // 기본 검색어로 초기화
  const router = useRouter();

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && query.trim()) {
      router.push(`/search/${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="relative">
      <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleSearch}
        placeholder={defaultQuery ? '' : '검색어를 입력하세요...'}
        className="w-full h-10 p-3 text-base rounded-full focus-visible:ring-2 focus-visible:ring-blue-500 shadow-md transition-width duration-300 pr-8"
        spellCheck={false}
      />
      <Search
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
        size={16}
        aria-label="Search"
        onClick={() => {
          if (query.trim()) {
            router.push(`/search/${encodeURIComponent(query)}`);
          }
        }}
      />
    </div>
  );
}