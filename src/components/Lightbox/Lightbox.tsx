"use client";

import React, { useEffect } from 'react';
import Image from 'next/image';
import styles from './Lightbox.module.css';

interface LightboxProps {
    imageUrl: string;
    title: string;
    onClose: () => void;
}

export default function Lightbox({ imageUrl, title, onClose }: LightboxProps) {
    // Prevent scrolling when lightbox is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    // Close on escape key
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [onClose]);

    return (
        <div className={styles.overlay} onClick={onClose}>
            <button className={styles.closeButton} onClick={onClose} aria-label="Close">
                &times;
            </button>
            <div className={styles.content} onClick={(e) => e.stopPropagation()}>
                <div className={styles.imageWrapper}>
                    <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        className={styles.image}
                        sizes="90vw"
                        priority
                    />
                </div>
                {title && <h3 className={styles.title}>{title}</h3>}
            </div>
        </div>
    );
}
