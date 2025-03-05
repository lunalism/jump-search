'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

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
        .slice(0, 3)
        .map(([query]) => query);
      setRecommendations(sortedQueries);
    }

    fetchRecommendations();
  }, [userId]);

  if (!userId) {
    return (
      <Card className="mt-8 p-4 bg-gray-50 shadow-md">
        <CardContent>
          <p className="text-gray-500">로그인 후 추천을 받으세요!</p>
        </CardContent>
      </Card>
    );
  }

  if (recommendations.length === 0) {
    return (
      <Card className="mt-8 p-4 bg-gray-50 shadow-md">
        <CardContent>
          <p className="text-gray-500">검색 기록이 없습니다.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-8 p-4 bg-gray-50 shadow-md">
      <CardHeader>
        <CardTitle className="text-gray-800">나를 위한 Jump</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-disc pl-5 space-y-2">
          {recommendations.map((query, index) => (
            <li key={index} className="text-blue-500 hover:underline cursor-pointer">
              <a href={`/search/${encodeURIComponent(query)}`}>{query}</a>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}