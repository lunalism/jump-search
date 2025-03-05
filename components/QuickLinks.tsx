import { Button } from '@/components/ui/button';
import { Mails, Map, Newspaper, NotebookPen, Users } from 'lucide-react';

export function QuickLinks() {
  return (
    <div className="w-full max-w-3xl mx-auto mb-8 text-center flex justify-center gap-10">
        <a href="#" className="flex items-center">
            <div className="flex flex-col items-center">
                <Button variant="outline" size="icon" className="rounded-half hover:shadow-md transition-shadow">
                    <Mails className="h-6 w-6 text-green-800" />
                </Button>
                <span className="text-gray-600 text-sm mt-1">메일</span>
            </div>
        </a>
        <a href="#" className="flex items-center">
            <div className="flex flex-col items-center">
                <Button variant="outline" size="icon" className="rounded-half hover:shadow-md transition-shadow">
                    <Newspaper className="h-6 w-6 text-green-800" />
                </Button>
                <span className="text-gray-600 text-sm mt-1">뉴스</span>
            </div>
        </a>
        <a href="#" className="flex items-center">
            <div className="flex flex-col items-center">
                <Button variant="outline" size="icon" className="rounded-half hover:shadow-md transition-shadow">
                    <Map className="h-6 w-6 text-green-800" />
                </Button>
                <span className="text-gray-600 text-sm mt-1">지도</span>
            </div>
        </a>
        <a href="#" className="flex items-center">
            <div className="flex flex-col items-center">
                <Button variant="outline" size="icon" className="rounded-half hover:shadow-md transition-shadow">
                    <NotebookPen className="h-6 w-6 text-green-800" />
                </Button>
                <span className="text-gray-600 text-sm mt-1">블로그</span>
            </div>
        </a>
        <a href="#" className="flex items-center">
            <div className="flex flex-col items-center">
                <Button variant="outline" size="icon" className="rounded-half hover:shadow-md transition-shadow">
                    <Users className="h-6 w-6 text-green-800" />
                </Button>
                <span className="text-gray-600 text-sm mt-1">커뮤니티</span>
            </div>
        </a>
    </div>
  );
}