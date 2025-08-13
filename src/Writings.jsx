import React from 'react'
import NavMenu from './NavMenu';

function Writings() {
  return (
    <>
    <NavMenu onShuffle={() => setShuffledImages(shuffleArray(images))}/>

    <div className='bg-white'>
      <div className="p-8 text-3xl md:text-8xl">
      Writings
      </div>
    </div>
    </>
  );
}

export default Writings;