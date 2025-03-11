'use client';

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

interface Recommendation {
  id: string;
  title: string;
  description: string;
  url: string;
}

interface RecommendationsProps {
  texts: { title: string; items: string[]; descriptions: string[] };
}

export function Recommendations({ texts }: RecommendationsProps) {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      // 임시로 모든 사용자에게 기본 추천을 보여줍니다
      setRecommendations([
        { id: '1', title: texts.items[0], description: texts.descriptions[0], url: '#' },
        { id: '2', title: texts.items[1], description: texts.descriptions[1], url: '#' },
        { id: '3', title: texts.items[2], description: texts.descriptions[2], url: '#' },
      ]);
    };

    fetchRecommendations();
  }, [texts.items, texts.descriptions]);

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">{texts.title}</h2>
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-3">
        {recommendations.length > 0 ? (
          recommendations.map((rec) => (
            <Card key={rec.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-blue-600 hover:underline">
                  <a href={rec.url} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${rec.title}`}>
                    {rec.title}
                  </a>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-700 line-clamp-2">{rec.description}</CardDescription>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-gray-600 text-center">No recommendations available.</p>
        )}
      </div>
    </div>
  );
}