"use client";

import styles from './Skeleton.module.css';

interface SkeletonProps {
    width?: string;
    height?: string;
    borderRadius?: string;
}

export default function Skeleton({ width = '100%', height = '100%', borderRadius = '0.5rem' }: SkeletonProps) {
    return (
        <div
            className={styles.skeleton}
            style={{ width, height, borderRadius }}
        ></div>
    );
}
