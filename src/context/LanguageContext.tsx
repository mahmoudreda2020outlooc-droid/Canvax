"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, Language } from '@/data/translations';

interface LanguageContextType {
    language: Language;
    toggleLanguage: () => void;
    t: typeof translations.en;
    isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>('en');

    // Load saved language from localStorage
    useEffect(() => {
        const savedLang = localStorage.getItem('canvax-lang') as Language;
        if (savedLang) {
            setLanguage(savedLang);
        }
    }, []);

    // Update HTML dir attribute and save to localStorage
    useEffect(() => {
        localStorage.setItem('canvax-lang', language);
        document.documentElement.lang = language;
        document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    }, [language]);

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'en' ? 'ar' : 'en');
    };

    const isRTL = language === 'ar';
    const t = translations[language];

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t, isRTL }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
