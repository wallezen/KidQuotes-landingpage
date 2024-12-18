import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en";
import zh from "./locales/zh";
import es from "./locales/es";
import fr from "./locales/fr";
import de from "./locales/de";
import pt from "./locales/pt";
import ja from "./locales/ja";
import ko from "./locales/ko";

export const supportedLngs = ["en", "zh", "es", "fr", "de", "pt", "ja", "ko"] as const;

// Helper function to get the best matching language
export function getBestMatchingLanguage(acceptLanguage: string | null): string {
  if (!acceptLanguage) return "en";

  // Parse Accept-Language header and get language codes
  const userLanguages = acceptLanguage
    .split(",")
    .map(lang => {
      const [code, priority = "1.0"] = lang.trim().split(";q=");
      return {
        code: code.split("-")[0], // Get primary language code (e.g., 'en' from 'en-US')
        priority: parseFloat(priority)
      };
    })
    .sort((a, b) => b.priority - a.priority);

  // Find the first supported language that matches user preferences
  const matchedLang = userLanguages.find(lang => 
    supportedLngs.includes(lang.code)
  );

  return matchedLang ? matchedLang.code : "en";
}

// Initialize i18next instance
const i18n = i18next.createInstance();

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en,
      zh,
      es,
      fr,
      de,
      pt,
      ja,
      ko,
    },
    supportedLngs,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false // This is important for SSR
    },
    detection: {
      order: ['path', 'navigator']
    }
  });

export default i18n;
