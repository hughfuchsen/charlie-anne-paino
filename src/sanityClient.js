import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: '722844tt',
  dataset: 'production',
  apiVersion: '2025-08-15',
  useCdn: true,
});
