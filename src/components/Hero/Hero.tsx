"use client";

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import styles from './Hero.module.css';

import { motion } from 'framer-motion';

export default function Hero() {
    const { t } = useLanguage();

    const containerVariants: any = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants: any = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" },
        },
    };

    const floatingVariants = (delay: number): any => ({
        animate: {
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
            transition: {
                duration: 6,
                repeat: Infinity,
                delay,
                ease: "easeInOut",
            },
        },
    });

    return (
        <section className={styles.hero}>
            <div className={styles.overlay}></div>
            <motion.div
                className={`${styles.floatingShape} ${styles.shape1}`}
                variants={floatingVariants(0)}
                animate="animate"
            ></motion.div>
            <motion.div
                className={`${styles.floatingShape} ${styles.shape2}`}
                variants={floatingVariants(2)}
                animate="animate"
            ></motion.div>

            <motion.div
                className={styles.content}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.h1
                    className={styles.title}
                    style={{ whiteSpace: 'pre-line' }}
                    variants={itemVariants}
                >
                    {t.hero.title}
                </motion.h1>
                <motion.p className={styles.subtitle} variants={itemVariants}>
                    {t.hero.subtitle}
                </motion.p>
                <motion.div variants={itemVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link href="/shop" className={styles.ctaButton}>
                        {t.hero.cta}
                    </Link>
                </motion.div>
            </motion.div>
        </section>
    );
}
