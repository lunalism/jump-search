import { SearchBar } from '@/components/SearchBar';
import { Recommendations } from '@/components/Recommendations';
import { QuickLinks } from '@/components/QuickLinks';
import { Navbar } from '@/components/Navbar';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export default async function Home() {
  const cookieStore = await cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen flex flex-col items-center bg-white">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <h1 className="text-5xl font-bold mb-8 text-gray-900">Jump</h1>
        <SearchBar />
        <QuickLinks />
        <Recommendations userId={user?.id || null} />
      </main>
      <footer className="w-full py-4 text-gray-600 text-center border-t">
        © 2025 Jump. 모든 권리 보유.
      </footer>
    </div>
  );
}