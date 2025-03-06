import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

interface SearchHit {
  id: string | number;
  title: string;
  description: string;
  url: string;
}

export function SearchResultCard({ hit }: { hit: SearchHit }) {
  return (
    <Card className="mb-4 hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-blue-600">{hit.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-gray-700">{hit.description}</CardDescription>
        <a
          href={hit.url}
          target="_blank"
          className="text-blue-500 hover:underline mt-2 inline-block"
        >
          더 보기
        </a>
      </CardContent>
    </Card>
  );
}