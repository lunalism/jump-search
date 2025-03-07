'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { User } from '@supabase/supabase-js';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

// 번역 데이터 정의
const translations = {
  ko: {
    profile: '프로필',
    logout: '로그아웃',
    login: '로그인',
  },
  en: {
    profile: 'Profile',
    logout: 'Logout',
    login: 'Login',
  },
  ja: {
    profile: 'プロフィール',
    logout: 'ログアウト',
    login: 'ログイン',
  },
  zh: {
    profile: '个人资料',
    logout: '退出登录',
    login: '登录',
  },
  fr: {
    profile: 'Profil',
    logout: 'Déconnexion',
    login: 'Connexion',
  },
  de: {
    profile: 'Profil',
    logout: 'Abmelden',
    login: 'Anmelden',
  },
  es: {
    profile: 'Perfil',
    logout: 'Cerrar sesión',
    login: 'Iniciar sesión',
  },
  it: {
    profile: 'Profilo',
    logout: 'Disconnessione',
    login: 'Accesso',
  },
};

export function HomeNavbar() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [locale, setLocale] = useState('ko'); // 기본 언어: 한국어

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

  const t = translations[locale]; // 현재 언어에 맞는 번역 선택

  return (
    <nav className="w-full flex items-center justify-between px-10 pt-4" aria-label="Jump Navigation">
      <h1 className="text-3xl font-bold text-gray-900" aria-label="Jump Home">Jump</h1>
      <div className="flex items-center gap-4">
        <Select onValueChange={setLocale} defaultValue="ko">
          <SelectTrigger className="w-[80px]">
            <SelectValue placeholder="언어" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ko">한국어</SelectItem>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="ja">日本語</SelectItem>
            <SelectItem value="zh">中文</SelectItem>
            <SelectItem value="fr">Français</SelectItem>
            <SelectItem value="de">Deutsch</SelectItem>
            <SelectItem value="es">Español</SelectItem>
            <SelectItem value="it">Italiano</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Button variant="ghost" size="sm" onClick={() => router.push('/profile')}>
                {t.profile}
              </Button>
              <Button variant="ghost" size="sm" onClick={handleSignOut}>
                {t.logout}
              </Button>
            </>
          ) : (
            <Button variant="ghost" size="sm" onClick={handleLogin}>
              {t.login}
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}