import { useNavigate, useParams } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import { supportedLngs } from "~/i18n";
import { useState, useRef, useEffect } from "react";

const languageInfo: Record<string, { name: string; flag: string }> = {
  en: { name: "English", flag: "🇺🇸" },
  zh: { name: "中文", flag: "🇨🇳" },
  es: { name: "Español", flag: "🇪🇸" },
  fr: { name: "Français", flag: "🇫🇷" },
  de: { name: "Deutsch", flag: "🇩🇪" },
  pt: { name: "Português", flag: "🇵🇹" },
  ja: { name: "日本語", flag: "🇯🇵" },
  ko: { name: "한국어", flag: "🇰🇷" }
};

export default function LanguageSwitcher() {
  const { lang = "en" } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLanguageChange = (newLang: string) => {
    // Update the URL and force a page refresh
    const newPath = newLang === "en" ? "/" : `/${newLang}`;
    window.location.href = newPath; // This will cause a full page refresh
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="fixed top-4 right-4 z-50" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-transparent hover:bg-white/10 dark:hover:bg-gray-800/30 rounded-lg px-2 py-1 text-sm cursor-pointer text-gray-600 dark:text-gray-300 border border-transparent hover:border-gray-200 dark:hover:border-gray-700 transition-colors flex items-center gap-1"
      >
        <span>{languageInfo[lang].flag}</span>
        <span>{languageInfo[lang].name}</span>
        <svg 
          className={`fill-current h-3 w-3 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 20 20"
        >
          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-1 py-1 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 max-h-[calc(100vh-6rem)] overflow-y-auto">
          {supportedLngs.map((lng) => (
            <button
              key={lng}
              onClick={() => {
                handleLanguageChange(lng);
                setIsOpen(false);
              }}
              className={`w-full px-3 py-1.5 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2
                ${lng === lang ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' : 'text-gray-700 dark:text-gray-300'}`}
            >
              <span>{languageInfo[lng].flag}</span>
              <span>{languageInfo[lng].name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
