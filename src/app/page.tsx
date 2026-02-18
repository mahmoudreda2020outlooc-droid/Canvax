"use client";

import Hero from "@/components/Hero/Hero";
import CategorySection from "@/components/CategorySection/CategorySection";
import AboutSection from "@/components/AboutSection/AboutSection";
import ProductCard from "@/components/ProductCard/ProductCard";
import { products } from "@/data/products";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const { t } = useLanguage();

  return (
    <main>
      <Hero />
      <CategorySection />

      <section style={{ padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{
          textAlign: 'center',
          fontSize: '2.5rem',
          marginBottom: '2rem',
          fontFamily: 'var(--font-playfair)',
          color: 'var(--color-primary)'
        }}>
          {t.common.featured}
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '2rem'
        }}>
          {products.slice(0, 4).map(product => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </section>

      <AboutSection />
    </main>
  );
}
