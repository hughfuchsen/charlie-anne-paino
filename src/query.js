export const POSTS_QUERY = `*[_type == "writings"] | order(publishedAt desc)[0...12] {
  _id,
  title,
  publishedAt,
  image{
    asset->{ url },
    alt
  },
  body
}`;


// query.js
export const ILLUSTRATIONS_QUERY = `*[_type == "illustrations"] | order(date desc) {
  _id,
  subject,
  location,
  date,
  image{
    asset->{ url },
    alt
  }
}`;

