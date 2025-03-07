'use client';

import { HomeSearchBar } from '@/components/HomeSearchBar';
import { Recommendations } from '@/components/Recommendations';
import { QuickLinks } from '@/components/QuickLinks';
import { HomeNavbar } from '@/components/HomeNavbar';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useState, useEffect } from 'react';
import LocationDisplay from '@/components/LocationDisplay';
import { User } from '@supabase/supabase-js';

type Locale = 'ko' | 'en' | 'ja' | 'zh' | 'fr' | 'de' | 'es' | 'it';

export default function Home() {
  const supabase = createClientComponentClient();
  const [user, setUser] = useState<User | null>(null);
  const [locale, setLocale] = useState<Locale>('ko');

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

  const handleLanguageChange = (newLocale: string) => {
    setLocale(newLocale as Locale);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-white" aria-label="Jump Home Page">
      <HomeNavbar onLanguageChange={handleLanguageChange} />
      <main className="flex-1 w-full max-w-4xl mx-auto flex flex-col items-center justify-center p-4 sm:p-2 md:p-4">
        <HomeSearchBar locale={locale} />
        <div className="-mt-1">
          <QuickLinks locale={locale} />
        </div>
        <div className="-mt-1">
          <Recommendations userId={user?.id || null} locale={locale} />
        </div>
      </main>
      <footer className="w-full py-4 text-gray-300 flex items-center justify-between pr-10">
        <span>© 2025 Jump. All rights reserved.</span>
        <LocationDisplay />
      </footer>
    </div>
  );
}