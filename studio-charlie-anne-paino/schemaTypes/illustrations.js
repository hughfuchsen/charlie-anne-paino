
// import { defineType, defineField } from 'sanity'

// export default defineType({
//   name: 'illustrations',
//   title: 'Illustrations',
//   type: 'document',
//   fields: [
//     defineField({
//       name: 'subject',
//       title: 'Subject',
//       type: 'string',
//     }),
//     defineField({
//       name: 'location',
//       title: 'Location',
//       type: 'string',
//     }),
//     defineField({
//       name: 'date',
//       title: 'Date',
//       type: 'datetime',
//     }),
//     defineField({
//       name: 'order',
//       title: 'Order (optional)',
//       type: 'number',
//       description: 'Use this to manually order photos within the same subject',
//     }),
//     defineField({
//       name: 'image',
//       title: 'Image',
//       type: 'image',
//       options: { hotspot: true },
//       fields: [
//         defineField({
//           name: 'alt',
//           title: 'Alt text',
//           type: 'string',
//         }),
//       ],
//     }),
//   ],
// })


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
      name: 'order',
      title: 'Order (optional)',
      type: 'number',
      description: 'Use this to order images within the same subject',
    }),
    defineField({
      name: 'lineUpOrder',
      title: 'Line-Up Order',
      type: 'number',
      description: 'Use this to order subjects/groups',
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


