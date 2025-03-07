'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react'; // 돋보기 아이콘

interface SearchBarProps {
  defaultQuery?: string; // 기본 검색어 props 유지
}

export function SearchBar({ defaultQuery }: SearchBarProps) {
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
        placeholder={defaultQuery ? '' : '검색어를 입력하세요 (예: 서울 맛집, IT 뉴스)...'}
        className="w-full h-12 p-4 text-lg rounded-full focus-visible:ring-2 focus-visible:ring-blue-500 shadow-md transition-width duration-300 pr-10"
        spellCheck={false}
      />
      <Search
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
        size={20}
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