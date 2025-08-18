export const POSTS_QUERY = `*[
  _type == "post" && defined(slug.current)
] | order(publishedAt desc)[0...12] {
  _id,
  title,
  slug,
  publishedAt,
  image{
    asset->{ url },
    alt
  },
    body
}`;

// query.js
export const ILLUSTRATIONS_QUERY = `*[_type == "illustration"] | order(date desc) {
  _id,
  subject,
  location,
  date,
  image{
    asset->{ url },
    alt
  }
}`;

