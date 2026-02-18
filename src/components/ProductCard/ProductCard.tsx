import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './ProductCard.module.css';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import Lightbox from '../Lightbox/Lightbox';
import { motion } from 'framer-motion';

interface ProductProps {
    id: string;
    title: string;
    category: string;
    price: number;
    imageUrl: string;
}

export default function ProductCard({ id, title, category, price, imageUrl }: ProductProps) {
    const { addToCart } = useCart();
    const { t } = useLanguage();
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);

    const handleAddToCart = () => {
        addToCart({ id, title, price, imageUrl });
        alert('Added to cart!');
    };

    return (
        <>
            <motion.div
                className={styles.card}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.5 }}
            >
                <div className={styles.imageContainer}>
                    <motion.div
                        className={styles.image}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <Image
                            src={imageUrl}
                            alt={title}
                            fill
                            style={{ objectFit: 'cover' }}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </motion.div>
                    <div className={styles.imageOverlay}>
                        <motion.button
                            className={styles.zoomButton}
                            onClick={() => setIsLightboxOpen(true)}
                            title="Zoom"
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            🔍
                        </motion.button>
                    </div>
                </div>
                <div className={styles.details}>
                    <span className={styles.category}>{category}</span>
                    <Link href={`/product/${id}`} className={styles.title}>
                        {title}
                    </Link>
                    <div className={styles.price}>{price.toLocaleString()} {t.common.price_currency}</div>
                    <div className={styles.actions}>
                        <motion.button
                            onClick={handleAddToCart}
                            className={`${styles.button} ${styles.primaryButton}`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {t.common.add_to_cart}
                        </motion.button>
                    </div>
                </div>
            </motion.div>

            {isLightboxOpen && (
                <Lightbox
                    imageUrl={imageUrl}
                    title={title}
                    onClose={() => setIsLightboxOpen(false)}
                />
            )}
        </>
    );
}
