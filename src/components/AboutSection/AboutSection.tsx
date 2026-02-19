"use client";

import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";

export default function AboutSection() {
    const { t, language } = useLanguage();
    const isRtl = language === 'ar';

    const fadeInVariant: any = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    const slideInVariant = (direction: 'left' | 'right'): any => ({
        hidden: { opacity: 0, x: direction === 'left' ? -50 : 50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    });

    return (
        <section style={{ padding: '4rem 2rem', backgroundColor: 'var(--color-background)', direction: isRtl ? 'rtl' : 'ltr', transition: 'background-color 0.3s', overflow: 'hidden' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <motion.div
                    style={{ textAlign: 'center', marginBottom: '3rem' }}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInVariant}
                >
                    <h2 style={{
                        fontFamily: 'var(--font-playfair)',
                        fontSize: '2.5rem',
                        color: 'var(--color-primary)',
                        marginBottom: '1rem'
                    }}>
                        {t.about_section?.title || 'About CanVax'}
                    </h2>
                    <p style={{ fontSize: '1.1rem', color: 'var(--color-text)', opacity: 0.8, maxWidth: '600px', margin: '0 auto' }}>
                        {t.about_section?.subtitle || 'Where passion for art meets premium craftsmanship.'}
                    </p>
                </motion.div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '3rem',
                    alignItems: 'center',
                    marginBottom: '4rem',
                    textAlign: 'center' // Centering the grid content
                }} className="responsive-grid">
                    <style jsx>{`
                        @media (max-width: 768px) {
                            .responsive-grid {
                                grid-template-columns: 1fr !important;
                                gap: 2rem !important;
                            }
                        }
                    `}</style>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={slideInVariant(isRtl ? 'right' : 'left')}
                    >
                        <h3 style={{
                            fontFamily: 'var(--font-playfair)',
                            color: 'var(--color-secondary)',
                            fontSize: '1.8rem',
                            marginBottom: '1rem',
                            textAlign: 'center'
                        }}>
                            {t.about_section?.story_title || 'Our Story'}
                        </h3>
                        <p style={{
                            lineHeight: 1.8,
                            color: 'var(--color-text)',
                            opacity: 0.9,
                            marginBottom: '1rem',
                            textAlign: 'center'
                        }}>
                            {t.about_section?.story_text || 'CanVax started with a simple vision...'}
                        </p>
                    </motion.div>
                    <motion.div
                        style={{
                            height: '550px',
                            backgroundColor: 'var(--color-card-bg)',
                            padding: '1.5rem',
                            borderRadius: '0.5rem',
                            boxShadow: 'var(--shadow-lg)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid var(--color-border)',
                            position: 'relative'
                        }}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={slideInVariant(isRtl ? 'left' : 'right')}
                    >
                        <div style={{
                            width: '100%',
                            height: '100%',
                            backgroundImage: 'url("/story-img.png")',
                            backgroundSize: '150%',
                            backgroundPosition: '50% 48%',
                            backgroundRepeat: 'no-repeat',
                            borderRadius: '0.25rem'
                        }}></div>
                        <div style={{
                            position: 'absolute',
                            inset: '1rem',
                            border: '1px solid rgba(197, 160, 89, 0.2)',
                            pointerEvents: 'none'
                        }}></div>
                    </motion.div>
                </div>

                <div style={{
                    marginTop: '6rem',
                    backgroundColor: 'var(--color-nav-bg)',
                    padding: '4rem 2rem',
                    borderRadius: '1.5rem',
                    color: 'var(--color-nav-text)',
                    textAlign: 'center',
                    border: '1px solid var(--color-border)'
                }}>
                    <motion.h2
                        style={{
                            fontFamily: 'var(--font-playfair)',
                            fontSize: '2.5rem',
                            color: 'var(--color-secondary)',
                            marginBottom: '3rem',
                            textAlign: 'center'
                        }}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        {t.about_section?.promise_title || 'Our Promise'}
                    </motion.h2>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '3rem',
                        maxWidth: '1200px',
                        margin: '0 auto'
                    }}>
                        {[
                            {
                                title: t.about_section?.quality_title || 'Premium Quality',
                                text: t.about_section?.quality_text || 'Museum-grade canvas and inks.',
                                icon: '⭐'
                            },
                            {
                                title: t.about_section?.craft_title || 'Local Craftsmanship',
                                text: t.about_section?.craft_text || 'Hand-stretched frames made in Egypt.',
                                icon: '🇪🇬'
                            },
                            {
                                title: t.about_section?.customer_title || 'Customer First',
                                text: t.about_section?.customer_text || 'Satisfaction guaranteed.',
                                icon: '🤝'
                            }
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                style={{
                                    padding: '1rem',
                                    textAlign: 'center',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                            >
                                <div style={{
                                    fontSize: '2.5rem',
                                    marginBottom: '1.5rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: 'rgba(255,255,255,0.05)',
                                    borderRadius: '50%',
                                    width: '80px',
                                    height: '80px',
                                    margin: '0 auto'
                                }}>
                                    {feature.icon}
                                </div>
                                <h3 style={{
                                    fontSize: '1.4rem',
                                    marginBottom: '1rem',
                                    color: 'var(--color-secondary)',
                                    fontWeight: '600',
                                    textAlign: 'center'
                                }}>
                                    {feature.title}
                                </h3>
                                <p style={{
                                    opacity: 0.9,
                                    lineHeight: 1.6,
                                    textAlign: 'center',
                                    maxWidth: '300px',
                                    margin: '0 auto'
                                }}>{feature.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
