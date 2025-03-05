'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function SearchBar() {
    // 검색어 상태 관리
    const [query, setQuery] = useState('');
    // 라우터 이동 기능
    const router = useRouter();

    // 검색 폼 제출 이벤트 핸들러
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            // 검색어가 있으면 검색 결과 페이지로 이동
            router.push(`/search/${encodeURIComponent(query)}`);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto mb-8">
          <div className="relative flex items-center">
            <Input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="검색어를 입력하세요 (예: 서울 맛집, IT 뉴스)..."
              className="w-full p-4 text-lg rounded-full focus-visible:ring-2 focus-visible:ring-blue-500 shadow-md"
              spellCheck={false}
            />
            <Button
              type="submit"
              className="absolute right-2 top-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 p-3"
            >
              검색
            </Button>
          </div>
        </form>
      );
}