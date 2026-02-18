"use client";

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import styles from './CategorySection.module.css';
import { motion } from 'framer-motion';

export default function CategorySection() {
    const { t } = useLanguage();

    const categories = [
        {
            id: 'classic',
            title: t.shop.classic,
            description: 'Timeless elegance and historical masterpieces.',
            bgClass: styles.classicBg,
            href: '/shop?category=classic'
        },
        {
            id: 'modern',
            title: t.shop.modern,
            description: 'Contemporary abstracts and minimalist designs.',
            bgClass: styles.modernBg,
            href: '/shop?category=modern'
        },
        {
            id: 'famous',
            title: t.shop.famous,
            description: 'Iconic works everyone recognizes and loves.',
            bgClass: styles.famousBg,
            href: '/shop?category=famous'
        }
    ];

    const containerVariants: any = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants: any = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return (
        <section className={styles.section}>
            <motion.h2
                className={styles.title}
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                {t.shop.collection}
            </motion.h2>
            <motion.div
                className={styles.grid}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                {categories.map((cat) => (
                    <motion.div key={cat.id} variants={itemVariants}>
                        <Link href={cat.href} className={styles.card}>
                            <motion.div
                                className={`${styles.cardBg} ${cat.bgClass}`}
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.6 }}
                            ></motion.div>
                            <div className={styles.cardContent}>
                                <h3 className={styles.cardTitle}>{cat.title}</h3>
                                <p className={styles.cardDescription}>
                                    <span className={styles.arrow}> &larr;</span>
                                </p>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}
