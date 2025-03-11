'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Mail, Newspaper, Map, NotebookPen, Users } from 'lucide-react';

interface QuickLinksProps {
  texts: { items: string[] };
}

export function QuickLinks({ texts }: QuickLinksProps) {
  const iconMap = {
    Mail,
    Newspaper,
    Map,
    NotebookPen,
    Users,
  };

  return (
    <div className="w-full max-w-3xl mx-auto mb-8 pt-10 text-center flex justify-center gap-15 sm:gap-15">
      {texts.items.map((text, index) => {
        const iconKey = ['Mail', 'Newspaper', 'Map', 'NotebookPen', 'Users'][index];
        const IconComponent = iconMap[iconKey as keyof typeof iconMap];
        return (
          <Link key={index} href={`/search/${encodeURIComponent(text)}`}>
            <div className="flex flex-col items-center">
              <Button variant="outline" size="sm" className="rounded-full hover:shadow-md transition-shadow">
                {IconComponent && <IconComponent className="h-6 w-6 text-green-800" />}
              </Button>
              <span className="text-gray-600 text-sm mt-1">{text}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}