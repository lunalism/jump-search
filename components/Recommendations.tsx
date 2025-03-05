'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export function Recommendations({ userId }: { userId: string | null }) {
  const [recommendations, setRecommendations] = useState<string[]>([]);

  useEffect(() => {
    async function fetchRecommendations() {
      if (!userId) return;

      const threeDaysAgo = new Date();
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
      const { data, error } = await supabase
        .from('search_history')
        .select('query')
        .eq('user_id', userId)
        .gte('timestamp', threeDaysAgo.toISOString())
        .order('timestamp', { ascending: false })
        .limit(5);

      if (error) {
        console.error('Error fetching recommendations:', error);
        return;
      }

      const queryCount: { [key: string]: number } = {};
      data.forEach((item) => {
        queryCount[item.query] = (queryCount[item.query] || 0) + 1;
      });
      const sortedQueries = Object.entries(queryCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([query]) => query);
      setRecommendations(sortedQueries);
    }

    fetchRecommendations();
  }, [userId]);

  if (!userId) {
    return (
      <div className="mt-8 text-gray-500 text-center">
        로그인 후 추천을 받으세요!
      </div>
    );
  }

  if (recommendations.length === 0) {
    return (
      <div className="mt-8 text-gray-500 text-center">
        검색 기록이 없습니다.
      </div>
    );
  }

  return (
    <div className="mt-8 w-full max-w-3xl mx-auto">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">추천 검색어</h2>
      <ul className="flex flex-wrap gap-2">
        {recommendations.map((query, index) => (
          <li key={index} className="bg-gray-100 px-4 py-2 rounded-full text-blue-500 hover:bg-gray-200 cursor-pointer">
            <a href={`/search/${encodeURIComponent(query)}`}>{query}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}