'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login'); // 비로그인 시 로그인 페이지로 리다이렉트
      } else {
        setUser(session.user);
      }
    };

    getSession();
  }, [supabase, router]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/'); // 로그아웃 후 홈으로 이동
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">프로필</h1>
        <p className="mb-4">이메일: {user.email}</p>
        <Button onClick={handleSignOut} className="bg-blue-500 hover:bg-blue-600">
          로그아웃
        </Button>
      </div>
    </div>
  );
}