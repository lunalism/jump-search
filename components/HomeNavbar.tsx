'use client';

import { Button } from '@/components/ui/button';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { User } from '@supabase/supabase-js';

interface HomeNavbarProps {
  user: User | null;
}

export function HomeNavbar({ user }: HomeNavbarProps) {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error.message);
    } else {
      router.push('/');
      router.refresh();
    }
  };

  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <nav className="w-full flex items-center justify-between px-10 pt-4">
      <h1 className="text-3xl font-bold text-gray-900" aria-label="Jump Home">Jump</h1>
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