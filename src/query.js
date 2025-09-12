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


// export const ILLUSTRATIONS_QUERY = `*[_type == "illustrations"] | order(date desc) {
//   _id,
//   subject,
//   location,
//   date,
//   order,
//   image{
//     asset->{ url },
//     alt
//   }
// }`;

export const ILLUSTRATIONS_QUERY = `*[_type == "illustrations"] 
  | order(subject asc, coalesce(order, 9999) asc, date desc) {
    _id,
    subject, 
    location,
    date,
    order,
    image{
      asset->{ url },
      alt
    }
  }`



