import React from 'react';
import { CategorySkeleton } from '@/components/Skeleton';

export default function Loading() {
  return (
    <div className="loading-page-container" style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ height: '40px', width: '300px', background: 'var(--border-light)', borderRadius: '8px', marginBottom: '30px' }}></div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        <CategorySkeleton />
        <CategorySkeleton />
        <CategorySkeleton />
        <CategorySkeleton />
        <CategorySkeleton />
        <CategorySkeleton />
      </div>
    </div>
  );
}
