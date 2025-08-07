import React from 'react'
import images from './imageData.js'; 
import ImageCard from './components/ImageCard';


function Home() {
  return (
    <>
      <div className="p-8 min-h-screen " style={{ backgroundColor: "#f6ec81" }}>
        <p className="flex justify-start items-start text-3xl underline" style={{ fontWeight: "bold", fontStyle: "italic" }}>
        picapsso’s diary 1997</p>
        <br />
        <details className="p-2">
          <summary className="cursor-pointer">open my cupboards</summary>
          <ul className="ml-6 mt-2 space-y-1 list-disc">
            <li>
              <a href="/live-music-illustrations" className="underline hover:no-underline">
                live music illustrations
              </a>
            </li>
            <li>
              <a href="/writings" className="underline hover:no-underline">
                writings
              </a>
            </li>
          </ul>
        </details>

      </div>

      {/* <div className="grid grid-cols-5 gap-4">
        {images.map(({ id, src, alt }) => (
          <ImageCard key={id} src={src} alt={alt} />
        ))}
      </div> */}
    </>
  );
}

export default Home;
