import React from 'react'
import LiveMusicIllustrations from './LiveMusicIllustrations'
import Writings from './Writings'

function Home() {
  return (
    <>
      <div className="p-8" 
      style={{ backgroundColor: "white" }}
      >
        <p className="flex justify-start items-start text-3xl underline" style={{ fontWeight: "bold", fontStyle: "italic" }}>
        picapsso’s diary 1997</p>
        <br />
        <details className="text-1xl">
          <summary className="cursor-pointer">open my cupboards</summary>
          <ul className="ml-6 mt-2 space-y-1 list-disc">
            <li>
              <p className="underline hover:no-underline">
                Live Music Illustrations
              </p>
            </li>
            <li>
              <p className="underline hover:no-underline">
                Writings
              </p>
            </li>
          </ul>
        </details>

      </div>

      <LiveMusicIllustrations/>

      <Writings/>
    </>
  );
}

export default Home;
