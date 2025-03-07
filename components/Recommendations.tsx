'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { translations } from '@/lib/translations';

interface Recommendation {
  id: string;
  title: string;
  description: string;
  url: string;
}

type Locale = 'ko' | 'en' | 'ja' | 'zh' | 'fr' | 'de' | 'es' | 'it';

interface RecommendationsProps {
  userId: string | null;
  locale: Locale;
}

export function Recommendations({ userId, locale }: RecommendationsProps) {
  const [recommendation, setRecommendation] = useState<Recommendation[]>([]);
  const t = translations[locale as Locale];

  useEffect(() => {
    const supabase = createClientComponentClient();
    
    const fetchRecommendations = async () => {
      if (!userId) {
        // 비로그인 사용자용 기본 추천
        setRecommendation([
          { id: '1', title: t.recommendations.items[0], description: t.recommendations.descriptions[0], url: '#' },
          { id: '2', title: t.recommendations.items[1], description: t.recommendations.descriptions[1], url: '#' },
          { id: '3', title: t.recommendations.items[2], description: t.recommendations.descriptions[2], url: '#' },
        ]);
        return;
      }

      // 로그인 사용자용 추천 (예시, 실제 API 호출 필요)
      const { data, error } = await supabase
        .from('recommendations')
        .select('id, title, description, url')
        .eq('user_id', userId)
        .limit(3);

      if (error) {
        console.error('Error fetching recommendations:', error);
      } else {
        setRecommendation(data as Recommendation[]);
      }
    };

    fetchRecommendations();
  }, [userId, locale, t]);

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">{t.recommendations.title}</h2>
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-3">
        {recommendation.length > 0 ? (
          recommendation.map((rec) => (
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
          <p className="text-gray-600 text-center">추천 항목이 없습니다.</p>
        )}
      </div>
    </div>
  );
}