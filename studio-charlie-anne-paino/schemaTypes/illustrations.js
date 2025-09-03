// export default {
//     name: 'illustrations',
//     title: 'Illustrations',
//     type: 'document',
//     fields: [
//       {
//         name: 'subject',
//         title: 'Subject',
//         type: 'string',
//       },
//       {
//         name: 'location',
//         title: 'Location',
//         type: 'string',
//       },
//       {
//         name: 'date',
//         title: 'Date',
//         type: 'datetime',
//       },
//       {
//         name: 'image',
//         title: 'Image',
//         type: 'image',
//         options: { hotspot: true },
//         fields: [
//           {
//             name: 'alt',
//             type: 'string',
//             title: 'Alt text',
//           },
//         ],
//       },
//     ],
//   };

import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'illustrations',
  title: 'Illustrations',
  type: 'document',
  fields: [
    defineField({
      name: 'subject',
      title: 'Subject',
      type: 'string',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
        }),
      ],
    }),
  ],
})
