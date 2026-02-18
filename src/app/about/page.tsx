"use client";

import { useLanguage } from "@/context/LanguageContext";
import AboutSection from "@/components/AboutSection/AboutSection";

export default function About() {
    const { language } = useLanguage();

    return (
        <main style={{ padding: '4rem 0', minHeight: '80vh', direction: language === 'ar' ? 'rtl' : 'ltr' }}>
            <div style={{ marginTop: '4rem' }}>
                <AboutSection />
            </div>
        </main>
    );
}
