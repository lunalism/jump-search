'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react'; // 돋보기 아이콘

export function HomeSearchBar() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && query.trim()) {
      router.push(`/search/${encodeURIComponent(query.trim())}`); // trim()으로 공백 제거, 올바른 인코딩 보장
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-12 sm:max-w-md md:max-w-2xl relative" aria-label="Search Bar">
      <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleSearch}
        placeholder="검색어를 입력하세요 (예: 서울 맛집, IT 뉴스)..."
        className="w-[900px] h-12 p-4 text-lg rounded-full focus-visible:ring-2 focus-visible:ring-blue-500 shadow-md transition-width duration-300 pr-10 sm:w-full md:w-[700px]"
        spellCheck={false}
      />
      <Search
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer sm:right-2 md:right-4"
        size={20}
        aria-label="Search"
        onClick={() => {
          if (query.trim()) {
            router.push(`/search/${encodeURIComponent(query.trim())}`); // trim()으로 공백 제거, 클릭 시도도 수정
          }
        }}
      />
    </div>
  );
}