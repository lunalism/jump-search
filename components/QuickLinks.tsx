'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Mail, Newspaper, Map, NotebookPen, Users } from 'lucide-react';
import { translations } from '@/lib/translations';

// 언어 타입 정의
type Locale = 'ko' | 'en' | 'ja' | 'zh' | 'fr' | 'de' | 'es' | 'it';
// 아이콘 이름 타입 정의
type IconName = keyof typeof iconMap;

// 아이콘 이름을 매핑하는 객체
const iconMap = {
  Mail,
  Newspaper,
  Map,
  NotebookPen,
  Users,
};


// 컴포넌트 타입 정의
interface QuickLinksProps {
  locale: Locale;
}

// 컴포넌트 구현
export function QuickLinks({ locale }: QuickLinksProps) {
    // 링크 목록 가져오기
    const links = translations[locale].quickLinks;

    return (
        <div className="w-full max-w-3xl mx-auto mb-8 text-center flex justify-center gap-10">
        {links.map((item: { text: string; icon: IconName }, index: number) => {
            const IconComponent = iconMap[item.icon];
            return (
                <Link key={index} href={`/search/${encodeURIComponent(item.text)}`}>
                    <div className="flex flex-col items-center">
                        <Button variant="outline" size="sm" className="rounded-half hover:shadow-md transition-shadow">
                            {IconComponent && <IconComponent className="h-6 w-6 text-green-800" />}
                        </Button>
                        <span className="text-gray-600 text-sm mt-1">{item.text}</span>
                    </div>
                </Link>
            );
        })}
        </div>
    );
}