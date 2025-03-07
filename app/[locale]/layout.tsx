import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;

  // 지원하는 언어 목록
  const supportedLocales = ['ko', 'en', 'ja', 'zh', 'fr', 'de', 'es', 'it'];
  if (!supportedLocales.includes(locale)) {
    notFound();
  }

  const messages = (await import(`../../locales/${locale}.json`)).default;

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}