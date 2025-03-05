'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function SearchBar() {
    const [query, setQuery] = useState('');
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
        router.push(`/search/${encodeURIComponent(query)}`);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto mb-8">
        <div className="relative flex items-center">
            <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="검색어를 입력하세요 (예: 서울 맛집, IT 뉴스)..."
            className="w-full p-4 rounded-l-lg focus-visible:ring-2 focus-visible:ring-blue-500"
            />
            <Button
            type="submit"
            className="bg-blue-500 text-white rounded-r-lg hover:bg-blue-600"
            >
            검색
            </Button>
        </div>
        </form>
    );
}