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


// export async function fetchImages() {
//   const data = await client.fetch(ILLUSTRATIONS_QUERY);

//   return data.map(img => ({
//     _id: img._id,
//     image: img.image || {},
//     subject: img.subject || '',
//     location: img.location || '',
//     date: img.date ? new Date(img.date) : null,
//     order: img.order ?? null,
//     lineUpOrder: img.lineUpOrder ?? null,
//   }));
// }


export async function fetchImages() {
  const data = await client.fetch(ILLUSTRATIONS_QUERY);

  return data.map(img => ({
    id: img._id,                  // maps to image.id in the component
    src: img.image.asset.url,      // maps to image.src
    alt: img.image.alt || '',      // maps to image.alt
    name: img.subject || '',       // used in UI filters and group headers
    location: img.location || '',
    imageOrder: img.imageOrder ?? null,
    lineUpOrder: img.lineUpOrder ?? null,
    date: img.date || '',          // keep as ISO string for filtering/sorting
  }));
}
