import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { useParams } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { supportedLngs, getBestMatchingLanguage } from "~/i18n";
import LanguageSwitcher from "~/components/LanguageSwitcher";

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  const lang = params.lang.split("-")[0]; // Handle cases like 'en-US' -> 'en'
  
  if (!supportedLngs.includes(lang)) {
    // Get the best matching language if the requested language is not supported
    const acceptLanguage = request.headers.get("Accept-Language");
    const bestLanguage = getBestMatchingLanguage(acceptLanguage);
    return redirect(bestLanguage === "en" ? "/" : `/${bestLanguage}`);
  }

  return json({ lang });
};

export default function Index() {
  const { lang } = useParams();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (lang && i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [i18n, lang]);

  return (
    <div className="min-h-screen px-4 py-8 relative overflow-hidden">
      <LanguageSwitcher />
      {/* Decorative bubbles */}
      <div className="bubble w-32 h-32 bg-purple-300 left-[10%] top-[20%]" />
      <div className="bubble w-24 h-24 bg-pink-300 right-[15%] top-[30%]" />
      <div className="bubble w-16 h-16 bg-yellow-300 left-[20%] bottom-[20%]" />
      
      <main className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
            {t('hero.title')}
          </h1>
          <p className="text-2xl md:text-3xl text-gray-700 dark:text-gray-300 mb-8">
            {t('hero.subtitle')}
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12">
            {t('hero.description')}
          </p>
          
          <div className="flex flex-wrap justify-center gap-6">
            <a
              href="#"
              className="flex items-center px-8 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition"
            >
              <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.5 12.3c-.1-1.2.5-2.3 1.4-3.1-.5-1.3-1.4-2.2-2.6-2.7-1.2-.5-2.3-.5-3.4.1-.5.3-1 .4-1.5.4-.6 0-1.1-.1-1.6-.4-1.1-.6-2.2-.6-3.4-.1-1.3.5-2.2 1.4-2.7 2.7-1 2.5-.3 5.5 1.8 8.3.9 1.2 1.9 2.3 3.1 2.3.6 0 1.1-.2 1.6-.4.5-.3 1-.4 1.5-.4.6 0 1.1.1 1.6.4.5.3 1 .4 1.6.4 1.2 0 2.2-1.1 3.1-2.3.7-.9 1.3-1.9 1.7-2.9-1.1-.4-1.7-1.4-1.6-2.3zM14.9 5c.6-.8.9-1.7.8-2.7-.9.1-1.7.5-2.3 1.2-.6.7-.9 1.5-.8 2.6.9 0 1.7-.4 2.3-1.1z"/>
              </svg>
              {t('download.appStore')}
            </a>
            <a
              href="#"
              className="flex items-center px-8 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition"
            >
              <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 20.5v-17c0-.83.67-1.5 1.5-1.5h11c.83 0 1.5.67 1.5 1.5v17c0 .83-.67 1.5-1.5 1.5h-11c-.83 0-1.5-.67-1.5-1.5zm3.5-16c0 .28.22.5.5.5h6c.28 0 .5-.22.5-.5s-.22-.5-.5-.5h-6c-.28 0-.5.22-.5.5z"/>
              </svg>
              {t('download.playStore')}
            </a>
          </div>
        </section>

        {/* Features Section */}
        <section className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="text-center p-6">
            <div className="text-4xl mb-4">📝</div>
            <h3 className="text-xl font-semibold mb-3">{t('features.quickCapture.title')}</h3>
            <p className="text-gray-600 dark:text-gray-400">
              {t('features.quickCapture.description')}
            </p>
          </div>
          <div className="text-center p-6">
            <div className="text-4xl mb-4">💫</div>
            <h3 className="text-xl font-semibold mb-3">{t('features.collections.title')}</h3>
            <p className="text-gray-600 dark:text-gray-400">
              {t('features.collections.description')}
            </p>
          </div>
          <div className="text-center p-6">
            <div className="text-4xl mb-4">🎁</div>
            <h3 className="text-xl font-semibold mb-3">{t('features.share.title')}</h3>
            <p className="text-gray-600 dark:text-gray-400">
              {t('features.share.description')}
            </p>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center mb-20">
          <h2 className="text-3xl font-bold mb-6">
            {t('cta.title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            {t('cta.description')}
          </p>
          <button className="bg-purple-600 text-white px-8 py-3 rounded-xl hover:bg-purple-700 transition">
            {t('cta.button')}
          </button>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-20 text-center text-gray-600 dark:text-gray-400">
        <p>{t('footer.copyright')}</p>
      </footer>
    </div>
  );
}