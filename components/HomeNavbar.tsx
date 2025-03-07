'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { User } from '@supabase/supabase-js';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { translations } from '@/lib/translations'; // translations 임포트

type Locale = 'ko' | 'en' | 'ja' | 'zh' | 'fr' | 'de' | 'es' | 'it';
// 컴포넌트 타입 정의
interface HomeNavbarProps {
  onLanguageChange: (locale: Locale) => void;
}

// 컴포넌트 구현
export function HomeNavbar({ onLanguageChange }: HomeNavbarProps) {
  // supabase 인스턴스 생성
  const supabase = createClientComponentClient();
  // 라우터 인스턴스 생성
  const router = useRouter();
  // 사용자 상태 관리
  const [user, setUser] = useState<User | null>(null);
  // 언어 상태 관리
  const [locale, setLocale] = useState<Locale>('ko'); // 기본 언어: 한국어

  // 사용자 세션 가져오기
  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };
    // 세션 가져오기
    getSession();
    // 인증 상태 변경 리스너 설정
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabase]);

  // 로그아웃 처리
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error.message);
    } else {
      setUser(null);
      router.push('/');
      router.refresh();
    }
  };

  // 로그인 처리
  const handleLogin = () => {
    router.push('/login');
  };

  // 언어 변경 처리
  const handleLocaleChange = (newLocale: string) => {
    setLocale(newLocale as Locale);
    onLanguageChange(newLocale as Locale); // 상위 컴포넌트에 언어 변경 전달
  };

  // 번역 데이터 가져오기
  const t = translations[locale];

  // 컴포넌트 렌더링
  return (
    <nav className="w-full flex items-center justify-between px-10 pt-4" aria-label="Jump Navigation">
      <h1 className="text-3xl font-bold text-gray-900" aria-label="Jump Home">Jump</h1>
      <div className="flex items-center gap-4">
        <Select onValueChange={handleLocaleChange} defaultValue="ko">
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="언어" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ko">한국어</SelectItem>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="ja">日本語</SelectItem>
            <SelectItem value="zh">中文</SelectItem>
            <SelectItem value="fr">Français</SelectItem>
            <SelectItem value="de">Deutsch</SelectItem>
            <SelectItem value="es">Español</SelectItem>
            <SelectItem value="it">Italiano</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Button variant="ghost" size="sm" onClick={() => router.push('/profile')}>
                {t.profile}
              </Button>
              <Button variant="ghost" size="sm" onClick={handleSignOut}>
                {t.logout}
              </Button>
            </>
          ) : (
            <Button variant="ghost" size="sm" onClick={handleLogin}>
              {t.login}
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}