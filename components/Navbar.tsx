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
    // 사용자 세션 확인
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };

    getSession();

    // 세션 변경 감지 (실시간 업데이트)
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    // 클린업
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabase]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh(); // 페이지 새로고침
  };

  const handleLogin = () => {
    router.push('/login'); // 로그인 페이지로 이동 (로그인 페이지 필요 시 추가)
  };

  return (
    <nav className="w-full p-4 flex justify-end items-center gap-4">
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
    </nav>
  );
}