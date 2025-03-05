import { meilisearch } from '@/lib/meilisearch';
import { SearchResultsNavbar } from '@/components/SearchResultsNavbar'; // 검색 결과용 Navbar 임포트
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default async function SearchResults({ params }: { params: Promise<{ query: string }> }) {
  const resolvedParams = await params;
  const decodedQuery = decodeURIComponent(resolvedParams.query);
  
  const results = await meilisearch.index('search_results').search(decodedQuery, {
    limit: 10,
  });

  return (
    <div className="min-h-screen bg-white">
      {/* SearchResultsNavbar를 상단 고정 div로 유지 */}
      <div className="fixed top-0 w-full bg-white shadow-md z-50">
        <div className="max-w-4xl mx-auto p-2">
          <SearchResultsNavbar query={decodedQuery} />
        </div>
      </div>

      <main className="max-w-4xl mx-auto pt-16 p-4"> {/* Navbar 높이만큼 padding-top 유지 */}
        {results.hits.length > 0 ? (
          <div className="grid gap-4">
            {results.hits.map((hit: any) => (
              <Card key={hit.id} className="rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-blue-600 hover:underline">
                    <a href={hit.url} target="_blank" rel="noopener noreferrer">
                      {hit.title}
                    </a>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-700 line-clamp-2">
                    {hit.description}
                  </CardDescription>
                  <p className="text-sm text-gray-500 mt-2">
                    <a href={hit.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {hit.url}
                    </a>
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">검색 결과가 없습니다.</p>
        )}
      </main>
    </div>
  );
}