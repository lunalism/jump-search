'use client';
import { HomeSearchBar } from '@/components/HomeSearchBar';
import { Recommendations } from '@/components/Recommendations';
import { QuickLinks } from '@/components/QuickLinks';
import { HomeNavbar } from '@/components/HomeNavbar';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useState, useEffect } from 'react';
import Footer from '@/components/Footer'; // Footer 임포트
import { User } from '@supabase/supabase-js';

export default function Home() {
  const supabase = createClientComponentClient();
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

  return (
    <div className="min-h-screen flex flex-col items-center bg-white" aria-label="Jump Home Page">
      <HomeNavbar user={user} />
      <main className="flex-1 w-full max-w-4xl mx-auto flex flex-col items-center justify-center p-4 sm:p-2 md:p-4">
        <HomeSearchBar />
        <div className="-mt-1">
          <QuickLinks />
        </div>
        <div className="-mt-1">
          <Recommendations userId={user?.id || null} />
        </div>
      </main>
      <Footer /> {/* Footer 컴포넌트 사용 */}
    </div>
  );
}