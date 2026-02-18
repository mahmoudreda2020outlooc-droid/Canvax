"use client";

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import styles from './Footer.module.css';

export default function Footer() {
    const { t } = useLanguage();

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.column}>
                    <h3>CanVax</h3>
                    <p className={styles.text}>
                        {t.common.footer_text}
                    </p>
                </div>

                <div className={styles.column}>
                    <h3>{t.common.quick_links}</h3>
                    <ul className={styles.links}>
                        <li><Link href="/" className={styles.link}>{t.nav.home}</Link></li>
                        <li><Link href="/shop" className={styles.link}>{t.nav.shop}</Link></li>
                        <li><Link href="/about" className={styles.link}>{t.nav.about}</Link></li>
                        <li><Link href="/contact" className={styles.link}>{t.nav.contact}</Link></li>
                    </ul>
                </div>

                <div className={styles.column}>
                    <h3>{t.common.contact_info}</h3>
                    <ul className={styles.links}>
                        <li>
                            <a href="https://wa.me/201004897420" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                                {t.about_section?.contact_section?.phone1}
                            </a>
                        </li>
                        <li>
                            <a href="https://wa.me/201226550225" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                                {t.about_section?.contact_section?.phone2}
                            </a>
                        </li>
                        <li>{t.about_section?.contact_section?.email_value}</li>
                    </ul>
                </div>
            </div>

            <div className={styles.copyright}>
                <p>&copy; {new Date().getFullYear()} CanVax. {t.common.rights}</p>
                <p style={{ marginTop: '0.5rem', opacity: 0.8, fontSize: '0.8rem' }}>
                    {t.common.dev_by}
                    <a
                        href="https://wa.me/201004897420"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: 'var(--color-secondary)', fontWeight: '600', textDecoration: 'none' }}
                    >
                        {t.common.dev_name}
                    </a>
                </p>
            </div>
        </footer>
    );
}
