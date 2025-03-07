'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { SearchResultsSearchBar } from './SearchResultsSearchBar';
import { User } from '@supabase/supabase-js';

interface SearchResultsNavbarProps {
  query: string;
}

export function SearchResultsNavbar({ query }: SearchResultsNavbarProps) {
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
    <nav className="w-full flex items-center justify-between px-10 pt-4 bg-white shadow-md z-50" aria-label="Jump Search Navigation" role="navigation">
      <h1 className="text-3xl font-bold text-gray-900" aria-label="Jump Search">Jump</h1>
      <div className="flex-1 mx-4 max-w-md sm:w-full sm:mx-0">
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