import { meilisearch } from '@/lib/meilisearch';
import { SearchResultsNavbar } from '@/components/SearchResultsNavbar'; // 검색 결과용 Navbar 임포트
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress'; // Progress 컴포넌트 임포트

type SearchResult = {
  id: string;
  title: string;
  description: string;
  url: string;
};

export default async function SearchResults({ params }: { params: Promise<{ query: string }> }) {
  const resolvedParams = await params;
  const decodedQuery = decodeURIComponent(resolvedParams.query);

  try {
    // 로딩 상태 시뮬레이션 (실제 데이터 로드 시간에 따라 조정)
    await new Promise((resolve) => setTimeout(resolve, 500)); // 0.5초 지연

    const results = await meilisearch.index('search_results').search<SearchResult>(decodedQuery, {
      limit: 10,
    }); // 타입 안전성 유지

    return (
      <div className="min-h-screen bg-white" aria-label="Jump Search Results">
        <div className="fixed top-0 w-full bg-white shadow-md z-50">
          <div className="max-w-5xl mx-auto p-3 sm:p-2 md:p-3"> {/* p-3 유지 */}
            <SearchResultsNavbar query={decodedQuery} />
          </div>
        </div>

        <div className="pt-16">
          <main className="max-w-5xl mx-auto p-3 sm:p-2 md:p-3" aria-label="Search Results Content"> {/* p-3 유지 */}
            {results.hits.length === 0 && (
              <Progress value={null} className="w-full h-2 mb-4" aria-label="Loading search results" /> // Progress로 로딩 상태
            )}
            {results.hits.length > 0 ? (
              <div className="grid gap-2 w-full"> {/* gap-2 유지 */}
                {results.hits.map((hit) => (
                  <Card key={hit.id} className="rounded-md shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-blue-600 hover:underline">
                        <a href={hit.url} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${hit.title}`}>
                          {hit.title}
                        </a>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-700 line-clamp-2">
                        {hit.description}
                      </CardDescription>
                      <p className="text-sm text-gray-500 mt-0.5 truncate"> {/* mt-0.5 유지 */}
                        <a href={hit.url} target="_blank" rel="noopener noreferrer" className="hover:underline" aria-label={`Go to ${hit.url}`}>
                          {hit.url}
                        </a>
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 text-xl font-medium text-center py-12" aria-live="polite">
                검색 결과가 없습니다.
              </p>
            )}
          </main>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Search error:', error);
    return (
      <div className="min-h-screen bg-white" aria-label="Jump Search Results">
        <div className="fixed top-0 w-full bg-white shadow-md z-50">
          <div className="max-w-5xl mx-auto p-3 sm:p-2 md:p-3">
            <SearchResultsNavbar query={decodedQuery} />
          </div>
        </div>
        <div className="pt-32">
          <main className="max-w-5xl mx-auto p-3 sm:p-2 md:p-3" aria-label="Search Results Content">
            <p className="text-red-500 text-xl font-medium text-center py-12" aria-live="polite">
              검색 중 오류가 발생했습니다. 다시 시도해주세요.
            </p>
          </main>
        </div>
      </div>
    );
  }
}

// 동적 라우팅 설정
export async function generateStaticParams() {
  return [
    { query: encodeURIComponent('서울') },
    { query: encodeURIComponent('seoul') },
    { query: encodeURIComponent('東京') },
  ];
}