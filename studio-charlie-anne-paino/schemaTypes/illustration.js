export default {
    name: 'illustration',
    title: 'Illustration',
    type: 'document',
    fields: [
      {
        name: 'subject',
        title: 'Subject',
        type: 'string',
      },
      {
        name: 'location',
        title: 'Location',
        type: 'string',
      },
      {
        name: 'date',
        title: 'Date',
        type: 'datetime',
      },
      {
        name: 'image',
        title: 'Image',
        type: 'image',
        options: { hotspot: true },
        fields: [
          {
            name: 'alt',
            type: 'string',
            title: 'Alt text',
          },
        ],
      },
    ],
  };