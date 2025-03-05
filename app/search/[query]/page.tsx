import { meilisearch } from '@/lib/meilisearch';
import { SearchBar } from '@/components/SearchBar';
import { SearchResultCard } from '@/components/SearchResultCard';

export default async function SearchResults({ params }: { params: Promise<{ query: string }> }) {
  const resolvedParams = await params;
  const decodedQuery = decodeURIComponent(resolvedParams.query);
  
  const results = await meilisearch.index('search_results').search(decodedQuery, {
    limit: 10,
  });

  return (
    <div className="p-4 max-w-3xl mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">검색 결과: {decodedQuery}</h1>
      <div className="relative">
        <SearchBar />
      </div>
      {results.hits.length > 0 ? (
        <div className="mt-4">
          {results.hits.map((hit: any) => (
            <SearchResultCard key={hit.id} hit={hit} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mt-4">검색 결과가 없습니다.</p>
      )}
    </div>
  );
}