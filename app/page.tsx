import { HomeSearchBar } from '@/components/HomeSearchBar';
import { Recommendations } from '@/components/Recommendations';
import { QuickLinks } from '@/components/QuickLinks';
import { HomeNavbar } from '@/components/HomeNavbar';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export default async function Home() {
  const cookieStore = await cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen flex flex-col items-center bg-white">
      <HomeNavbar /> {/* 수정된 HomeNavbar 사용, px-10 pt-4로 여백 유지 */}
      <main className="flex-1 w-full max-w-4xl mx-auto flex flex-col items-center justify-center p-4">
        <HomeSearchBar />
        <div className="-mt-1"> {/* HomeSearchBar와 QuickLinks 간 간격 */}
          <QuickLinks />
        </div>
        <div className="-mt-5"> {/* QuickLinks와 Recommendations 간 간격 */}
          <Recommendations userId={user?.id || null} />
        </div>
      </main>
      <footer className="w-full py-4 text-gray-300 text-right pr-10">
        © 2025 Jump. All rights reserved.
      </footer>
    </div>
  );
}