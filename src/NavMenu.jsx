import React from 'react';
import { Link } from 'react-router-dom';

function NavMenu({ onShuffle }) {
  return (
    <div className="p-8 bg-[white]">
      <Link
        to="/"
        className="pt-0 md:pt-4 flex justify-start items-start text-1xl md:text-3xl underline select-none"
        style={{ fontWeight: 'bold', fontStyle: 'italic', cursor: 'pointer' }}
        onClick={onShuffle}
      >
        charlie anne paino
      </Link>

      <br />
      <details className="text-1xl open">
        <summary className="cursor-pointer">
          open my cupboards
        </summary>
        <ul className="ml-6 mt-2 space-y-1 list-disc">
          <li>
            <Link to="/live" className="underline hover:no-underline">
              Live Music Illustrations
            </Link>
          </li>
          <li>
            <Link to="/writings" className="underline hover:no-underline">
              Writings
            </Link>
          </li>
        </ul>
      </details>
    </div>
  );
}

export default NavMenu;
