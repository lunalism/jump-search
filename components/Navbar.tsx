'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

export function Navbar() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

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
      setUser(null); // 사용자 상태 강제 갱신
      router.push('/'); // 홈으로 리다이렉트
      router.refresh(); // 페이지 새로고침
    }
  };

  const handleLogin = () => {
    router.push('/login');
  };

  return (
    
    <nav className="w-full p-4 flex justify-between items-center gap-4 pr-10">
      <h1 className="text-5xl font-bold mb-8 text-green-800">Jump</h1>
      <div className="flex items-center gap-4">
      {user ? (
        <>
          <Button variant="ghost" onClick={() => router.push('/profile')}>
            프로필
          </Button>
          <Button variant="ghost" onClick={handleSignOut}>
            로그아웃
          </Button>
        </>
      ) : (
        <Button variant="ghost" onClick={handleLogin}>
          로그인
        </Button>
      )}
      </div>
    </nav>
  );
}