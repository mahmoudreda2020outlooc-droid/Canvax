"use client";

import { useLanguage } from "@/context/LanguageContext";
import { submitContact } from "../actions";

export default function Contact() {
    const { t, language } = useLanguage();

    return (
        <main style={{ padding: '8rem 2rem 4rem', maxWidth: '1000px', margin: '0 auto', minHeight: '80vh', direction: language === 'ar' ? 'rtl' : 'ltr' }}>
            <h1 style={{
                fontFamily: 'var(--font-playfair)',
                fontSize: '3.5rem',
                color: 'var(--color-primary)',
                marginBottom: '3rem',
                textAlign: 'center'
            }}>
                {t.nav.contact}
            </h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
                <div>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--color-primary)' }}>
                        {t.about_section?.contact_section?.get_in_touch || 'Get in Touch'}
                    </h2>
                    <p style={{ marginBottom: '2rem', color: 'var(--color-text)', opacity: 0.7, lineHeight: 1.6 }}>
                        {t.about_section?.contact_section?.description || 'Have a question about an order? Want a custom size? We\'re here to help!'}
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.8rem' }}>
                                {t.about_section?.contact_section?.phone_whatsapp || 'Phone / WhatsApp'}
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {[
                                    { number: '01004897420', link: 'https://wa.me/201004897420' },
                                    { number: '01226550225', link: 'https://wa.me/201226550225' }
                                ].map((item, idx) => (
                                    <a
                                        key={idx}
                                        href={item.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '0.75rem',
                                            backgroundColor: '#25D366',
                                            color: 'white',
                                            padding: '0.8rem 1.5rem',
                                            borderRadius: '50px',
                                            textDecoration: 'none',
                                            fontWeight: '600',
                                            fontSize: '1rem',
                                            boxShadow: '0 4px 12px rgba(37, 211, 102, 0.2)',
                                            transition: 'transform 0.2s, box-shadow 0.2s'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = 'translateY(-2px)';
                                            e.currentTarget.style.boxShadow = '0 6px 16px rgba(37, 211, 102, 0.3)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(37, 211, 102, 0.2)';
                                        }}
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                        </svg>
                                        WhatsApp: {item.number}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <form
                    onSubmit={async (e) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        const name = formData.get('name') as string;
                        const email = formData.get('email') as string;
                        const message = formData.get('message') as string;

                        // 1. Sync to Google Sheets (Secure Server Action)
                        await submitContact({ name, email, message });

                        // Short delay for visual feedback
                        await new Promise(resolve => setTimeout(resolve, 300));

                        // 2. Open WhatsApp for Customer (Frontend logic is fine here as it's for user convenience)
                        const text = encodeURIComponent(`الاسم: ${name}\nالبريد: ${email}\n\nالرسالة:\n${message}`);
                        window.open(`https://wa.me/201226550225?text=${text}`, '_blank');
                    }}
                    style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
                >
                    <input
                        name="name"
                        type="text"
                        required
                        placeholder={t.about_section?.contact_section?.form_name || 'Your Name'}
                        style={{ padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-input-bg)', color: 'var(--color-text)', fontFamily: 'inherit' }}
                    />
                    <input
                        name="email"
                        type="email"
                        required
                        placeholder={t.about_section?.contact_section?.form_email || 'Your Email'}
                        style={{ padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-input-bg)', color: 'var(--color-text)', fontFamily: 'inherit' }}
                    />
                    <textarea
                        name="message"
                        required
                        placeholder={t.about_section?.contact_section?.form_message || 'Message'}
                        rows={5}
                        style={{ padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-input-bg)', color: 'var(--color-text)', fontFamily: 'inherit' }}
                    ></textarea>
                    <button
                        type="submit"
                        style={{
                            padding: '1rem',
                            backgroundColor: 'var(--color-secondary)',
                            color: 'var(--color-primary)',
                            border: 'none',
                            borderRadius: '0.5rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'opacity 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                        onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                    >
                        {t.about_section?.contact_section?.form_submit || 'Send Message'}
                    </button>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-text)', opacity: 0.6, textAlign: 'center' }}>
                        {language === 'ar' ? '* سيتم تحويلك للواتساب لإرسال الرسالة' : '* You will be redirected to WhatsApp to send the message'}
                    </p>
                </form>
            </div>
        </main>
    );
}
