"use client";

import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { submitOrder } from "../actions";

export default function Cart() {
    const { items, removeFromCart, total, clearCart } = useCart();
    const { t } = useLanguage();
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        phone: '',
        notes: ''
    });

    const handleCheckout = async (e: React.FormEvent) => {
        e.preventDefault();

        // Format message for WhatsApp (Customer convenience)
        let message = `*New Order from CanVax Website*%0A`;
        message += `---------------------------%0A`;
        message += `*Customer:* ${formData.name}%0A`;
        message += `*Phone:* ${formData.phone}%0A`;
        message += `*Address:* ${formData.address}%0A`;
        if (formData.notes) message += `*Notes:* ${formData.notes}%0A`;
        message += `---------------------------%0A`;
        message += `*Items:*%0A`;

        items.forEach(item => {
            message += `- ${item.title} (x${item.quantity}) - ${(item.price * item.quantity).toLocaleString()} EGP%0A`;
        });

        message += `---------------------------%0A`;
        message += `*Total Amount:* ${total.toLocaleString()} EGP%0A`;
        message += `---------------------------%0A`;
        message += `Payment Method: Cash on Delivery%0A`;

        // 1. Sync to Google Sheets (Secure Server Action)
        const orderData = {
            name: formData.name,
            phone: formData.phone,
            address: formData.address,
            items: items.map(i => `${i.title} (x${i.quantity})`).join(', '),
            total: total,
            notes: formData.notes
        };

        // 1. Sync to Google Sheets (Secure Server Action)
        const result = await submitOrder(orderData);
        if (!result.success) {
            alert(`خطأ في إرسال الطلب لجوجل شيت: ${result.error}`);
        }

        // Short delay for visual feedback
        await new Promise(resolve => setTimeout(resolve, 300));

        // 2. Open WhatsApp for Customer
        const phoneNumber = "201226550225";
        const url = `https://wa.me/${phoneNumber}?text=${message}`;

        window.open(url, '_blank');
        clearCart();
    };

    if (items.length === 0) {
        return (
            <main style={{ padding: '8rem 2rem 4rem', maxWidth: '1200px', margin: '0 auto', minHeight: '80vh', textAlign: 'center' }}>
                <h1 style={{ fontFamily: 'var(--font-playfair)', fontSize: '3rem', marginBottom: '2rem', color: 'var(--color-primary)' }}>{t.cart.title}</h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--color-text)', opacity: 0.7, marginBottom: '2rem' }}>{t.cart.empty}</p>
                <Link href="/shop" style={{
                    padding: '1rem 2rem',
                    backgroundColor: 'var(--color-primary)',
                    color: 'var(--color-background)',
                    borderRadius: '0.5rem',
                    textDecoration: 'none'
                }}>
                    {t.cart.continue}
                </Link>
            </main>
        );
    }

    return (
        <main style={{ padding: '8rem 2rem 4rem', maxWidth: '1200px', margin: '0 auto', minHeight: '80vh' }}>
            <h1 style={{ fontFamily: 'var(--font-playfair)', fontSize: '3rem', marginBottom: '3rem', textAlign: 'center' }}>{t.cart.title}</h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
                {/* Cart Items */}
                <div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        {items.map(item => (
                            <div key={item.id} style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', borderBottom: '1px solid var(--color-border)', paddingBottom: '1.5rem' }}>
                                <div style={{ position: 'relative', width: '80px', height: '80px', borderRadius: '0.5rem', overflow: 'hidden', flexShrink: 0 }}>
                                    <Image src={item.imageUrl} alt={item.title} fill style={{ objectFit: 'cover' }} />
                                </div>
                                <div style={{ flexGrow: 1 }}>
                                    <h3 style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.2rem', marginBottom: '0.25rem', color: 'var(--color-primary)' }}>{item.title}</h3>
                                    <p style={{ color: 'var(--color-text)', opacity: 0.8 }}>{item.price.toLocaleString()} {t.common.price_currency} x {item.quantity}</p>
                                </div>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}
                                >
                                    {t.cart.remove}
                                </button>
                            </div>
                        ))}
                    </div>
                    <div style={{ marginTop: '2rem', textAlign: 'right', fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-primary)' }}>
                        {t.cart.total}: {total.toLocaleString()} {t.common.price_currency}
                    </div>
                </div>

                {/* Checkout Form */}
                <div style={{ backgroundColor: 'var(--color-white)', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-md)', transition: 'all 0.3s' }}>
                    <h2 style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--color-primary)' }}>{t.cart.checkout_details}</h2>
                    <form onSubmit={handleCheckout} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <input
                            type="text"
                            placeholder={t.cart.name}
                            required
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-input-bg)', color: 'var(--color-text)' }}
                        />
                        <input
                            type="tel"
                            placeholder={t.cart.phone}
                            required
                            value={formData.phone}
                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                            style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-input-bg)', color: 'var(--color-text)' }}
                        />
                        <textarea
                            placeholder={t.cart.address}
                            required
                            rows={3}
                            value={formData.address}
                            onChange={e => setFormData({ ...formData, address: e.target.value })}
                            style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-input-bg)', color: 'var(--color-text)', fontFamily: 'inherit' }}
                        ></textarea>
                        <textarea
                            placeholder={t.cart.notes}
                            rows={2}
                            value={formData.notes}
                            onChange={e => setFormData({ ...formData, notes: e.target.value })}
                            style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-input-bg)', color: 'var(--color-text)', fontFamily: 'inherit' }}
                        ></textarea>

                        <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: 'var(--color-background)', borderRadius: '0.5rem', border: '1px solid var(--color-border)' }}>
                            <p style={{ fontWeight: 600, marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text)', opacity: 0.8 }}>{t.cart.payment_method}</p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-primary)', fontWeight: 600 }}>
                                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--color-secondary)', border: '2px solid var(--color-primary)' }}></div>
                                {t.cart.cod}
                            </div>
                        </div>

                        <button
                            type="submit"
                            style={{
                                marginTop: '1rem',
                                padding: '1rem',
                                backgroundColor: 'var(--color-secondary)',
                                color: '#0B1B32',
                                border: 'none',
                                borderRadius: '0.5rem',
                                fontWeight: 600,
                                fontSize: '1.1rem',
                                cursor: 'pointer',
                                transition: 'all 0.3s'
                            }}
                        >
                            {t.cart.complete_order}
                        </button>
                        <p style={{ fontSize: '0.8rem', color: 'var(--color-text)', opacity: 0.6, textAlign: 'center' }}>
                            {t.cart.cod_note}
                        </p>
                    </form>
                </div>
            </div>
        </main>
    );
}
