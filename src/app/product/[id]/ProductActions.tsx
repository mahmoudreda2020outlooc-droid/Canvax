"use client";

import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";

interface ProductActionsProps {
    product: {
        id: string;
        title: string;
        price: number;
        imageUrl: string;
    };
    whatsappUrl: string;
}

export default function ProductActions({ product, whatsappUrl }: ProductActionsProps) {
    const { addToCart } = useCart();
    const { t } = useLanguage();

    return (
        <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
            <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    display: 'block',
                    width: '100%',
                    padding: '1rem',
                    backgroundColor: '#25D366', // WhatsApp Green
                    color: 'white',
                    textAlign: 'center',
                    borderRadius: '0.5rem',
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    transition: 'filter 0.3s',
                    textDecoration: 'none'
                }}
            >
                {t.cart.complete_order}
            </a>

            <button
                onClick={() => {
                    addToCart(product);
                    alert('Added to cart!');
                }}
                style={{
                    width: '100%',
                    padding: '1rem',
                    backgroundColor: 'var(--color-primary)',
                    color: 'var(--color-background)',
                    border: 'none',
                    borderRadius: '0.5rem',
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    cursor: 'pointer'
                }}
            >
                {t.common.add_to_cart}
            </button>

            <p style={{ fontSize: '0.875rem', color: 'var(--color-text)', opacity: 0.6, textAlign: 'center', marginTop: '0.5rem' }}>
                * {t.cart.cod_note}
            </p>
        </div>
    );
}
