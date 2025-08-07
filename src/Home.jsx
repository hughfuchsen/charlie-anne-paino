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
        <details>
          <summary>open my cupboards</summary>
          <ul>
            <li>live music illustrations</li>
            <li>writings</li>
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
