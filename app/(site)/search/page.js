import React from 'react';
import dbConnect from '@/lib/db';
import SiteCache from '@/models/SiteCache';
import CategoryPageClientUI from '@/components/CategoryPageClientUI';
import { connection } from 'next/server';

export const metadata = {
  title: 'Search Results - SarkariResultCorner',
  description: 'Search results for government jobs, admit cards, and results on SarkariResultCorner.com.',
  robots: { index: false, follow: true }
};

export default async function SearchPage({ searchParams }) {
  await connection();
  const query = (await searchParams).q || '';
  let results = [];

  if (query) {
    try {
      await dbConnect();
      // Search in all cached pages
      const allCache = await SiteCache.find({});
      
      allCache.forEach(entry => {
        if (entry.data && entry.data.items) {
          const filtered = entry.data.items.filter(item => 
            item.title.toLowerCase().includes(query.toLowerCase())
          );
          results = [...results, ...filtered];
        }
      });

      // Remove duplicates by link
      results = Array.from(new Map(results.map(item => [item.link, item])).values());
    } catch (err) {
      console.error('Search error:', err);
    }
  }

  return (
    <div style={{ padding: '2rem 0' }}>
      <CategoryPageClientUI 
        pageTitle={`Search Results for: "${query}"`} 
        subtitle={results.length > 0 ? `Found ${results.length} matches across all categories.` : 'No matches found. Try a different keyword.'}
        items={results} 
      />
    </div>
  );
}
