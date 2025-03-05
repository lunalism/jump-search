import { SearchBar } from '@/components/SearchBar';
import { Recommendations } from '@/components/Recommendations';
import { QuickLinks } from '@/components/QuickLinks';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });

  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen flex flex-col items-center p-4 bg-gray-100">
      <header className="w-full max-w-4xl mb-12">
        <h1 className="text-5xl font-bold mb-6 text-gray-900">Jump</h1>
        <SearchBar />
        <QuickLinks />
      </header>
      <main className="w-full max-w-4xl">
        <Recommendations userId={user?.id || null} />
      </main>
      <footer className="mt-auto py-4 text-gray-600 text-center">
        © 2025 Jump. 모든 권리 보유.
      </footer>
    </div>
  );
}