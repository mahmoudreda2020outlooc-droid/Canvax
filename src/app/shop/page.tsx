"use client";

import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard/ProductCard";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ShopContent() {
    const { t } = useLanguage();
    const searchParams = useSearchParams();
    const category = searchParams.get('category');

    const filteredProducts = category && category !== 'All'
        ? products.filter(p => p.category.toLowerCase() === category.toLowerCase())
        : products;

    const categories = [
        { id: 'All', label: t.shop.all },
        { id: 'Classic', label: t.shop.classic },
        { id: 'Modern', label: t.shop.modern },
        { id: 'Famous', label: t.shop.famous }
    ];

    return (
        <main style={{ padding: '8rem 2rem 4rem', maxWidth: '1200px', margin: '0 auto', minHeight: '80vh' }}>
            <h1 style={{
                fontFamily: 'var(--font-playfair)',
                fontSize: '3rem',
                color: 'var(--color-primary)',
                marginBottom: '2rem',
                textAlign: 'center'
            }}>
                {category && category !== 'All' ? `${category.charAt(0).toUpperCase() + category.slice(1)} ${t.shop.collection}` : `${t.shop.all} ${t.shop.collection}`}
            </h1>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
                {categories.map(cat => (
                    <Link
                        key={cat.id}
                        href={cat.id === 'All' ? '/shop' : `/shop?category=${cat.id.toLowerCase()}`}
                        style={{
                            padding: '0.5rem 1.5rem',
                            borderRadius: '50px',
                            border: '1px solid var(--color-secondary)',
                            backgroundColor: (cat.id === 'All' && !category) || (category?.toLowerCase() === cat.id.toLowerCase())
                                ? 'var(--color-secondary)'
                                : 'transparent',
                            color: (cat.id === 'All' && !category) || (category?.toLowerCase() === cat.id.toLowerCase())
                                ? 'var(--color-nav-bg)'
                                : 'var(--color-secondary)',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        {cat.label}
                    </Link>
                ))}
            </div>

            {filteredProducts.length > 0 ? (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: '2rem'
                }}>
                    {filteredProducts.map(product => (
                        <ProductCard key={product.id} {...product} />
                    ))}
                </div>
            ) : (
                <p style={{ textAlign: 'center', fontSize: '1.2rem', color: 'var(--color-text)', opacity: 0.7, marginTop: '4rem' }}>
                    {t.shop.no_products}
                </p>
            )}
        </main>
    );
}

export default function Shop() {
    return (
        <Suspense fallback={<div style={{ padding: '8rem 2rem', textAlign: 'center' }}>Loading...</div>}>
            <ShopContent />
        </Suspense>
    );
}
