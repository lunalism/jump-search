'use client';

import { HomeSearchBar } from '@/components/HomeSearchBar';
import { Recommendations } from '@/components/Recommendations';
import { QuickLinks } from '@/components/QuickLinks';
import { HomeNavbar } from '@/components/HomeNavbar';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useState, useEffect } from 'react';
import LocationDisplay from '@/components/LocationDisplay';

export default function Home() {
  const supabase = createClientComponentClient(); // 클라이언트 컴포넌트에서 사용
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

  return (
    <div className="min-h-screen flex flex-col items-center bg-white" aria-label="Jump Home Page">
      <HomeNavbar />
      <main className="flex-1 w-full max-w-4xl mx-auto flex flex-col items-center justify-center p-4">
        <HomeSearchBar />
        <div className="-mt-2">
          <QuickLinks />
        </div>
        <div className="-mt-2">
          <Recommendations userId={user?.id || null} />
        </div>
      </main>
      <footer className="w-full py-4 text-gray-300 flex items-center justify-between pr-10">
        <span>© 2025 Jump. All rights reserved.</span>
        <LocationDisplay />
      </footer>
    </div>
  );
}