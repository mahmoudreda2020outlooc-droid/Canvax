"use client";

import { products } from "@/data/products";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductActions from "./ProductActions";
import { useLanguage } from "@/context/LanguageContext";
import { useState } from "react";
import Lightbox from "@/components/Lightbox/Lightbox";

export default function ProductPage({ params }: { params: { id: string } }) {
    const { t } = useLanguage();
    const product = products.find((p) => p.id === params.id);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);

    if (!product) {
        notFound();
    }

    // WhatsApp numbers provided by user
    const phoneNumbers = ["201004897420", "201226550225"];
    const message = encodeURIComponent(`Hi, I'm interested in buying your artwork: ${product.title} (ID: ${product.id})`);
    const whatsappUrl = `https://wa.me/${phoneNumbers[0]}?text=${message}`;

    return (
        <main style={{ padding: '8rem 2rem 4rem', maxWidth: '1200px', margin: '0 auto', minHeight: '80vh' }}>
            <Link href="/shop" style={{ display: 'inline-block', marginBottom: '2rem', color: 'var(--color-text)', opacity: 0.7, textDecoration: 'none' }}>
                &larr; {t.shop.all}
            </Link>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'start' }}>
                {/* Image Section */}
                <div
                    style={{
                        position: 'relative',
                        aspectRatio: '1/1',
                        backgroundColor: 'var(--color-card-bg)',
                        borderRadius: '1rem',
                        overflow: 'hidden',
                        boxShadow: 'var(--shadow-lg)',
                        border: '1px solid var(--color-border)',
                        cursor: 'zoom-in'
                    }}
                    onClick={() => setIsLightboxOpen(true)}
                >
                    <Image
                        src={product.imageUrl}
                        alt={product.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        priority
                    />
                    <div style={{
                        position: 'absolute',
                        bottom: '1rem',
                        right: '1rem',
                        backgroundColor: 'var(--color-card-bg)',
                        padding: '0.5rem',
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: 'var(--shadow-md)',
                        fontSize: '1.2rem'
                    }}>
                        🔍
                    </div>
                </div>

                {/* Details Section */}
                <div>
                    <span style={{
                        textTransform: 'uppercase',
                        letterSpacing: '2px',
                        fontSize: '0.875rem',
                        color: 'var(--color-secondary)',
                        fontWeight: 600,
                        display: 'block',
                        marginBottom: '1rem'
                    }}>
                        {product.category} {t.shop.collection}
                    </span>

                    <h1 style={{
                        fontFamily: 'var(--font-playfair)',
                        fontSize: '3rem',
                        color: 'var(--color-primary)',
                        marginBottom: '1rem',
                        lineHeight: 1.1
                    }}>
                        {product.title}
                    </h1>

                    <p style={{
                        fontSize: '1.5rem',
                        color: 'var(--color-secondary)',
                        fontWeight: 600,
                        marginBottom: '2rem'
                    }}>
                        {product.price.toLocaleString()} {t.common.price_currency}
                    </p>

                    <div style={{ marginBottom: '3rem', lineHeight: 1.8, color: 'var(--color-text)', opacity: 0.9 }}>
                        <p>{product.description}</p>
                        <p style={{ marginTop: '1rem' }}>
                            <strong>Dimensions:</strong> 60x90cm (Standard Frame)<br />
                            <strong>Material:</strong> Premium Canvas<br />
                            <strong>Frame:</strong> Gold/Black/White options available upon request.
                        </p>
                    </div>

                    <ProductActions product={product} whatsappUrl={whatsappUrl} />
                </div>
            </div>

            {isLightboxOpen && (
                <Lightbox
                    imageUrl={product.imageUrl}
                    title={product.title}
                    onClose={() => setIsLightboxOpen(false)}
                />
            )}
        </main>
    );
}
