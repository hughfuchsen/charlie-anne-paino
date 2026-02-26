// imageData.js
import { client } from './sanityClient';
import { ILLUSTRATIONS_QUERY, DRAWINGS_QUERY } from './query';
// Fetch images from Sanity

export async function fetchImages() {
  const data = await client.fetch(ILLUSTRATIONS_QUERY);

  return data.map(img => ({
    id: img._id,                  // maps to image.id in the component
    src: img.image.asset.url,      // maps to image.src
    alt: img.image.alt || '',      // maps to image.alt
    name: img.subject || '',       // used in UI filters and group headers
    location: img.location || '',
    imageOrder: img.order ?? null,
    lineUpOrder: img.lineUpOrder ?? null,
    date: img.date || '',          // keep as ISO string for filtering/sorting
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
