import React, { useEffect, useState } from 'react';
import { client } from './sanityClient';
import { POSTS_QUERY } from './query';
import NavMenu from './NavMenu';
import { PortableText } from '@portabletext/react';

export default function Writings() {
  const [writings, setWritings] = useState([]);
  const [selectedId, setSelectedId] = useState(null); // ID of the story being viewed

  useEffect(() => {
    client.fetch(POSTS_QUERY).then(setWritings).catch(console.error);
  }, []);
  

  const portableComponents = {
    block: {
      normal: ({ children }) => <p style={{ marginBottom: '1em', lineHeight: '1.6' }}>{children}</p>,
      h1: ({ children }) => <h1 style={{ fontSize: '2rem', margin: '1.5em 0 0.5em 0' }}>{children}</h1>,
      h2: ({ children }) => <h2 style={{ fontSize: '1.5rem', margin: '1.5em 0 0.5em 0' }}>{children}</h2>,
    },
    types: {
      image: ({ value }) => (
        <img src={value.asset.url} alt={value.alt || 'Sanity image'} style={{ maxWidth: '100%', margin: '1em 0' }} />
      ),
    },
  };

  // Currently selected story
  const selectedStory = writings.find((w) => w._id === selectedId);

  return (
    <div className="bg-white min-h-screen">
      <NavMenu
        onShuffle={() => setShuffledImages(shuffleArray(images))}
        onResetStory={() => setSelectedId(null)} // reset selected story
        currentStoryTitle={selectedStory ? selectedStory.title : null}
      />     



      {selectedStory ? <div className="p-8 text-3xl md:text-8xl">{selectedStory.title}</div> 
      : (<div className="p-8 text-3xl md:text-6xl">Writings</div>)}

      {selectedStory && (<div className="p-8 pt-0 text-xl md:text-3xl">{selectedStory.publishedAt
        ? new Date(selectedStory.publishedAt).toLocaleDateString('en-AU', {
            month: 'numeric',
            day: 'numeric',
            year: 'numeric',
          })
        : ''}
        </div>)}

      <div className="p-8">
        {/* Back button if a story is open */}
        {selectedStory && (
          <button
            onClick={() => setSelectedId(null)}
            className="mb-4"
          >
            ← Back
          </button>
        )}

        {/* If a story is selected, show it */}
        {selectedStory ? (
          <article>
            {/* <p className="text-left text-xl md:text-2xl mb-8">{selectedStory.title}</p> */}
            {selectedStory.image && (
              <img
                src={selectedStory.image.asset.url}
                alt={selectedStory.title}
                className="max-w-[100%] md:max-w-[40%] mb-4"
                />
            )}
            <div className="text-lg md:text-xl leading-loose">
            <PortableText value={selectedStory.body} components={portableComponents} />
          </div>
          </article>
        ) : (
          // Otherwise, show list of titles
          <ul>
          {writings.map((writing) => (
            <li key={writing._id} className="mb-3">
              <button
                onClick={() => setSelectedId(writing._id)}
                className="w-full flex justify-between items-center text-sm md:text-xl px-2 py-1 border-b border-black"
              >
                <span className="text-left">{writing.title}</span>
                <span className="text-right uppercase text-xl md:text-3xl">
                  {writing.publishedAt
                    ? new Date(writing.publishedAt).toLocaleDateString('en-AU', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })
                    : 'NO DATE'}
                </span>
              </button>
            </li>
          ))}
        </ul>
        )}
        {selectedStory && (
          <button
            onClick={() => setSelectedId(null)}
            className="mt-8"
          >
            ← Back
          </button>
        )}      </div>
    </div>
  );
}
