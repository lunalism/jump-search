'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export function SearchBar() {
    // 검색어 상태 관리
    const [query, setQuery] = useState('');
    // 라우터 이동 기능
    const router = useRouter();

    // 검색 폼 제출 이벤트 핸들러
    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && query.trim()) {
          router.push(`/search/${encodeURIComponent(query)}`);
        }
      };

    return (
        <div className="w-full max-w-4xl mx-auto mb-8 sm:max-w-md md:max-w-2xl relative">
            <Input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleSearch} // Enter 키로 검색 트리거
                placeholder="검색어를 입력하세요 (예: 서울 맛집, IT 뉴스)..."
                className="w-[600px] h-12 p-4 text-lg rounded-full focus-visible:ring-2 focus-visible:ring-blue-500 shadow-md transition-width duration-300"
                spellCheck={false}
            />
            <Search
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                size={20}
                onClick={() => {
                    if (query.trim()) {
                        router.push(`/search/${encodeURIComponent(query)}`);
                    }
                }}
            />
        </div>
    );
}