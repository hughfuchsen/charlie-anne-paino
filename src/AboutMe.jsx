import React, { useEffect, useState } from 'react';
import { client } from './sanityClient';
import { ABOUT_ME_QUERY } from './query';
import NavMenu from './NavMenu';
import { PortableText } from '@portabletext/react';

export default function AboutMe() {
  const [about, setAbout] = useState(null);

  useEffect(() => {
    client.fetch(ABOUT_ME_QUERY).then(setAbout).catch(console.error);
  }, []);

  const portableComponents = {
    block: {
      normal: ({ children }) => (
        <p style={{ marginBottom: '1em', lineHeight: '1.6' }}>
          {children}
        </p>
      ),
      h1: ({ children }) => (
        <h1 style={{ fontSize: '2rem', margin: '1.5em 0 0.5em 0' }}>
          {children}
        </h1>
      ),
      h2: ({ children }) => (
        <h2 style={{ fontSize: '1.5rem', margin: '1.5em 0 0.5em 0' }}>
          {children}
        </h2>
      ),
    },
    types: {
      image: ({ value }) => (
        <img
          src={value.asset.url}
          alt={value.alt || 'Sanity image'}
          style={{ maxWidth: '100%', margin: '1em 0' }}
        />
      ),
    },
  };

  if (!about) return null; // or loading state

  return (
    <div className="bg-white min-h-screen">
      <NavMenu />

      <div className="p-8 pt-0 text-3xl md:text-5xl">
        {about.title || 'about me'}
      </div>

      <div className="p-8 pt-0 text-lg md:text-xl leading-loose lowercase">
        <PortableText value={about.body} components={portableComponents} />
      </div>
    </div>
  );
}