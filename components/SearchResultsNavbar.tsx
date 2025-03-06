'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { SearchResultsSearchBar } from './SearchResultsSearchBar'; // 검색 결과용 SearchBar 임포트
import { User } from '@supabase/supabase-js';

export function SearchResultsNavbar({ query }: { query: string }) {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabase]);

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

  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <nav className="w-full flex items-center justify-between">
      <h1 className="text-3xl font-bold text-gray-900" aria-label="Jump Home">Jump</h1> {/* 로고 왼쪽 */}
      <div className="flex-1 mx-4 max-w-md sm:w-full sm:mx-0"> {/* SearchBar 중간, 여백 추가, 반응형 */}
        <SearchResultsSearchBar defaultQuery={query} />
      </div>
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <Button variant="ghost" size="sm" onClick={() => router.push('/profile')}>
              프로필
            </Button>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              로그아웃
            </Button>
          </>
        ) : (
          <Button variant="ghost" size="sm" onClick={handleLogin}>
            로그인
          </Button>
        )}
      </div>
    </nav>
  );
}