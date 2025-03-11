'use client';


import { Button } from '@/components/ui/button';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { User } from '@supabase/supabase-js';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

interface HomeNavbarProps {
  onLanguageChange: (locale: string) => void;
  user: User | null;
  locale: string;
  texts: { profile: string; logout: string; login: string };
}

export function HomeNavbar({ onLanguageChange, user, locale, texts }: HomeNavbarProps) {
  const supabase = createClientComponentClient();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error.message);
    }
  };

  const handleLogin = () => {
    window.location.href = '/login';
  };

  return (
    <nav className="w-full flex items-center justify-between px-10 pt-4" aria-label="Jump Navigation">
      <h1 className="text-3xl font-bold text-gray-900" aria-label="Jump Home">Jump</h1>
      <div className="flex items-center gap-4">
        <Select onValueChange={onLanguageChange} defaultValue={locale}>
          <SelectTrigger className="w-[120px]">
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
              <Button variant="ghost" size="sm" onClick={() => window.location.href = '/profile'}>
                {texts.profile}
              </Button>
              <Button variant="ghost" size="sm" onClick={handleSignOut}>
                {texts.logout}
              </Button>
            </>
          ) : (
            <Button variant="ghost" size="sm" onClick={handleLogin}>
              {texts.login}
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}