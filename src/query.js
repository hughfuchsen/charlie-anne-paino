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


export const ILLUSTRATIONS_QUERY = `*[_type == "illustrations"] 
| order(coalesce(lineUpOrder, 9999) asc, coalesce(order, 9999) asc, date desc) {
  _id,
  subject, 
  location,
  date,
  order,
  lineUpOrder,
  image{
    asset->{ url },
    alt
  }
}`

export const DRAWINGS_QUERY = `*[_type == "drawings"] 
| order(coalesce(lineUpOrder, 9999) asc, coalesce(order, 9999) asc, date desc) {
  _id,
  subject,
  location,
  date,
  order,
  lineUpOrder,
  image{
    asset->{ url },
    alt
  }
}`


// export const DRAWINGS_QUERY = `*[_type == "drawings"] 
// | order(coalesce(order, 9999) asc) {
//   _id,
//   title,
//   caption,
//   order,
//   image{
//     asset->{ url },
//     alt
//   }
// }`;

export const ABOUT_ME_QUERY = `*[_type == "aboutMe"][0] {
  _id,
  title,
  body
}`;

