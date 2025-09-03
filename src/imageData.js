// imageData.js
import { client } from './sanityClient';
import { ILLUSTRATIONS_QUERY } from './query';

// Fetch images from Sanity
// export async function fetchImages() {
//   const data = await client.fetch(ILLUSTRATIONS_QUERY);

//   // Map to your grid-friendly format
//   return data.map(img => ({
//     id: img._id,
//     src: img.image.asset.url,
//     alt: img.image.alt || '',
//     name: img.subject || '',
//     location: img.location || '',
//     date: img.date || null,
//   }));
// }


export async function fetchImages() {
  const data = await client.fetch(ILLUSTRATIONS_QUERY);

  return data.map(img => ({
    id: img._id,
    src: img.image.asset.url,
    alt: img.image.alt || '',
    name: img.subject || '',
    location: img.location || '',
    order: img.order ?? null,
    date: img.date
      ? new Date(img.date).toLocaleDateString('en-AU', { month: 'long', year: 'numeric' })
      : '',
  }));
}