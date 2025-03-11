'use client';

import { HomeSearchBar } from '@/components/HomeSearchBar';
import { Recommendations } from '@/components/Recommendations';
import { QuickLinks } from '@/components/QuickLinks';
import { HomeNavbar } from '@/components/HomeNavbar';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useState, useEffect } from 'react';
import Footer from '@/components/Footer';
import { User } from '@supabase/supabase-js';
import { translateText } from '@/components/TranslateService';

type TextsType = {
  navbar: { profile: string; logout: string; login: string };
  searchBar: { inputPlaceholder: string };
  quickLinks: { items: string[] };
  recommendations: { title: string; items: string[]; descriptions: string[] };
  footer: {
    copyright: string;
    locationNotSupported: string;
    apiKeyMissing: string;
    countryNotFound: string;
    locationNotFound: string;
    fetchingLocation: string;
    failedToGetLocation: string;
    unknownError: string;
  };
  [key: string]: { [key: string]: string | string[] };
};

const originalTexts: TextsType = {
  navbar: {
    profile: 'Profile',
    logout: 'Logout',
    login: 'Login',
  },
  searchBar: {
    inputPlaceholder: 'Search... (e.g., Seoul food, IT news)',
  },
  quickLinks: {
    items: ['Mails', 'Newspaper', 'Map', 'NotebookPen', 'Users'],
  },
  recommendations: {
    title: 'Recommendations',
    items: ['Seoul Travel Guide', 'IT Trends 2025', 'Cooking Recipes'],
    descriptions: [
      'Explore major attractions in Seoul.',
      'Check out IT industry trends for 2025.',
      'Learn simple cooking recipes.',
    ],
  },
  footer: {
    copyright: '© 2025 Jump. All rights reserved.',
    locationNotSupported: 'Geolocation is not supported by your browser.',
    apiKeyMissing: 'Google API key is missing.',
    countryNotFound: 'Unable to find country information.',
    locationNotFound: 'Unable to retrieve location information.',
    fetchingLocation: 'Fetching location...',
    failedToGetLocation: 'Failed to get location: ',
    unknownError: 'An unknown error occurred.',
  },
};

export default function Home() {
  const supabase = createClientComponentClient();
  const [user, setUser] = useState<User | null>(null);
  const [locale, setLocale] = useState<string>('en');
  const [translatedTexts, setTranslatedTexts] = useState(originalTexts);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    const translateAll = async () => {
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_TRANSLATE_API_KEY;
      if (!apiKey) return;

      const newTranslations: typeof originalTexts = { ...originalTexts };
      const targetLanguage = locale;

      for (const [section, texts] of Object.entries(originalTexts)) {
        if (typeof texts === 'object' && texts !== null) {
          for (const [key, value] of Object.entries(texts)) {
            if (typeof value === 'string') {
              newTranslations[section][key] = await translateText(value, targetLanguage, apiKey);
            } else if (Array.isArray(value)) {
              newTranslations[section][key] = await Promise.all(value.map(text => translateText(text, targetLanguage, apiKey)));
            }
          }
        }
      }
      setTranslatedTexts(newTranslations);
    };

    if (locale !== 'en') translateAll();

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [locale, supabase]);

  const changeLanguage = (newLocale: string) => {
    setLocale(newLocale);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-white" aria-label="Jump Home Page">
      <HomeNavbar onLanguageChange={changeLanguage} user={user} locale={locale} texts={translatedTexts.navbar} />
      <main className="flex-1 w-full max-w-4xl mx-auto flex flex-col items-center justify-center p-4 sm:p-2 md:p-4">
        <HomeSearchBar texts={translatedTexts.searchBar} />
        <div className="-mt-1">
          <QuickLinks texts={translatedTexts.quickLinks} />
        </div>
        <div className="-mt-1">
          <Recommendations texts={translatedTexts.recommendations} />
        </div>
      </main>
      <Footer texts={translatedTexts.footer} />
    </div>
  );
}