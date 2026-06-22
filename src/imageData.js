// imageData.js
import { client } from './sanityClient';
import { ILLUSTRATIONS_QUERY, DRAWINGS_QUERY } from './query';
// Fetch images from Sanity

export async function fetchImages() {
  const data = await client.fetch(ILLUSTRATIONS_QUERY);

  return data
  .filter(img => img.image?.asset?.url)
  .map(img => ({
    id: img._id,
    src: img.image.asset.url,
    alt: img.image.alt || '',
    name: img.subject || '',
    location: img.location || '',
    imageOrder: img.order ?? null,
    lineUpOrder: img.lineUpOrder ?? null,
    date: img.date || '',
  }));
}

export async function fetchDrawings() {
  const data = await client.fetch(DRAWINGS_QUERY);

  return data.map(img => ({
    id: img._id,
    src: img.image?.asset?.url,
    alt: img.image?.alt || '',        // fallback empty string
    name: img.subject || '',          // aligns with Illustrations 'subject'
    location: img.location || '',
    imageOrder: img.order ?? null,
    lineUpOrder: img.lineUpOrder ?? null,
    date: img.date || '',
  }));
}
