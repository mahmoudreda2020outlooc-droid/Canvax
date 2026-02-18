"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import styles from './Navbar.module.css';

export default function Navbar() {
    const { items } = useCart();
    const { t, language, toggleLanguage } = useLanguage();
    const { theme, toggleTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const [isLangOpen, setIsLangOpen] = useState(false);

    const handleLanguageSelect = () => {
        toggleLanguage();
        setIsLangOpen(false);
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };


    const [isLogoZoomed, setIsLogoZoomed] = useState(false);

    const handleLogoClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsLogoZoomed(true);
    };

    return (
        <>
            <nav className={`${styles.navbar} ${isOpen ? styles.menuOpen : ''}`}>
                <div className={styles.logoContainer}>
                    <Link href="/" onClick={handleLogoClick}>
                        <Image
                            src="/logo.png"
                            alt="CanVax Logo"
                            width={150}
                            height={50}
                            className={styles.logoImage}
                            priority
                        />
                    </Link>
                </div>

                <button className={styles.mobileMenuBtn} onClick={toggleMenu} aria-label="Toggle Menu">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {isOpen ? (
                            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        ) : (
                            <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        )}
                    </svg>
                </button>

                {/* Mobile Menu (Animated) */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.ul
                            className={styles.mobileMenu}
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        >
                            <motion.li
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                            >
                                <Link href="/" className={styles.navLink} onClick={() => setIsOpen(false)}>{t.nav.home}</Link>
                            </motion.li>
                            <motion.li
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <Link href="/shop" className={styles.navLink} onClick={() => setIsOpen(false)}>{t.nav.shop}</Link>
                            </motion.li>
                            <motion.li
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <Link href="/about" className={styles.navLink} onClick={() => setIsOpen(false)}>{t.nav.about}</Link>
                            </motion.li>
                            <motion.li
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                <Link href="/contact" className={styles.navLink} onClick={() => setIsOpen(false)}>{t.nav.contact}</Link>
                            </motion.li>
                            <motion.li
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                <Link href="/cart" className={styles.navLink} onClick={() => setIsOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    {t.nav.cart}
                                    {items.length > 0 && (
                                        <span style={{
                                            backgroundColor: 'var(--color-secondary)',
                                            color: 'var(--color-primary)',
                                            borderRadius: '50%',
                                            width: '20px',
                                            height: '20px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '0.75rem',
                                            fontWeight: 'bold'
                                        }}>
                                            {items.length}
                                        </span>
                                    )}
                                </Link>
                            </motion.li>
                            <motion.li
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.6 }}
                            >
                                <button
                                    onClick={toggleTheme}
                                    style={{
                                        background: 'transparent',
                                        border: '1px solid var(--color-secondary)',
                                        color: '#fff',
                                        padding: '0.8rem',
                                        borderRadius: '50%',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'all 0.3s'
                                    }}
                                    aria-label="Toggle Theme"
                                >
                                    {theme === 'light' ? (
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                                        </svg>
                                    ) : (
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="12" cy="12" r="5"></circle>
                                            <line x1="12" y1="1" x2="12" y2="3"></line>
                                            <line x1="12" y1="21" x2="12" y2="23"></line>
                                        </svg>
                                    )}
                                </button>
                            </motion.li>
                            <motion.li
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.7 }}
                            >
                                <button
                                    onClick={() => toggleLanguage()}
                                    style={{
                                        background: 'transparent',
                                        border: '1px solid var(--color-secondary)',
                                        color: '#fff',
                                        padding: '0.6rem 2rem',
                                        borderRadius: '2rem',
                                        cursor: 'pointer',
                                        fontFamily: 'var(--font-playfair)',
                                        fontSize: '1.3rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        transition: 'all 0.3s'
                                    }}
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <line x1="2" y1="12" x2="22" y2="12"></line>
                                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                                    </svg>
                                    {language === 'en' ? 'Arabic' : 'English'}
                                </button>
                            </motion.li>
                        </motion.ul>
                    )}
                </AnimatePresence>

                {/* Desktop Menu */}
                <ul className={styles.navLinks}>
                    <li><Link href="/" className={styles.navLink}>{t.nav.home}</Link></li>
                    <li><Link href="/shop" className={styles.navLink}>{t.nav.shop}</Link></li>
                    <li><Link href="/about" className={styles.navLink}>{t.nav.about}</Link></li>
                    <li><Link href="/contact" className={styles.navLink}>{t.nav.contact}</Link></li>
                    <li>
                        <Link href="/cart" className={styles.navLink} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="9" cy="21" r="1"></circle>
                                <circle cx="20" cy="21" r="1"></circle>
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                            </svg>
                            {items.length > 0 && <span className={styles.cartCount}>{items.length}</span>}
                        </Link>
                    </li>
                    <li style={{ marginLeft: '1rem' }}>
                        <div style={{ position: 'relative' }}>
                            <button
                                onClick={() => setIsLangOpen(!isLangOpen)}
                                className={styles.langBtn}
                                style={{
                                    background: 'transparent',
                                    border: '1px solid var(--color-secondary)',
                                    color: 'var(--color-nav-text)',
                                    padding: '0.5rem 1rem',
                                    borderRadius: '2rem',
                                    cursor: 'pointer',
                                    fontFamily: 'inherit',
                                    fontSize: '0.9rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <line x1="2" y1="12" x2="22" y2="12"></line>
                                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                                </svg>
                                {language === 'en' ? 'Language' : 'اللغة'}
                            </button>
                            {isLangOpen && (
                                <div style={{
                                    position: 'absolute',
                                    top: '120%',
                                    right: '0',
                                    backgroundColor: 'var(--color-nav-bg)',
                                    border: '1px solid var(--color-secondary)',
                                    borderRadius: '0.5rem',
                                    overflow: 'hidden',
                                    zIndex: 100
                                }}>
                                    <button onClick={handleLanguageSelect} style={{ display: 'block', width: '100%', padding: '0.5rem 1rem', background: 'transparent', border: 'none', color: 'var(--color-nav-text)', cursor: 'pointer' }}>
                                        {language === 'en' ? 'Arabic' : 'English'}
                                    </button>
                                </div>
                            )}
                        </div>
                    </li>
                    <li>
                        <button
                            onClick={toggleTheme}
                            className={styles.themeBtn}
                            style={{
                                background: 'transparent',
                                border: '1px solid var(--color-secondary)',
                                color: 'var(--color-nav-text)',
                                borderRadius: '50%',
                                width: '40px',
                                height: '40px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.3s'
                            }}
                            title={theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                        >
                            {theme === 'light' ? (
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                                </svg>
                            ) : (
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="5"></circle>
                                    <line x1="12" y1="1" x2="12" y2="3"></line>
                                    <line x1="12" y1="21" x2="12" y2="23"></line>
                                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                                    <line x1="1" y1="12" x2="3" y2="12"></line>
                                    <line x1="21" y1="12" x2="23" y2="12"></line>
                                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                                </svg>
                            )}
                        </button>
                    </li>
                </ul>
            </nav>

            {/* Logo Modal Overlay */}
            {isLogoZoomed && (
                <div
                    onClick={() => setIsLogoZoomed(false)}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.85)',
                        backdropFilter: 'blur(5px)',
                        zIndex: 1000,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'zoom-out',
                        animation: 'fadeIn 0.3s ease'
                    }}
                >
                    <div style={{ position: 'relative', width: '80vw', height: '80vh' }}>
                        <Image
                            src="/logo.png"
                            alt="CanVax Logo Large"
                            fill
                            style={{ objectFit: 'contain' }}
                            priority
                        />
                    </div>
                </div>
            )}
        </>
    );
}
