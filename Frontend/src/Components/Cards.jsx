import React from 'react';
import { Link } from 'react-router-dom';

function Cards({ item }) {
  return (
    <>
      <div className='mt-3 mb-2 p-3'>
        <div className="card bg-base-100 w-92 shadow-xl">
          <figure>
            <img
              src={item.image}
              alt={item.name}
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title font-bold">{item.name}</h2>
            <p>Curious about this club? Click to learn more about it.</p>
            <div className="card-actions justify-end">
              <Link to={`/clubs/${item.id}`}>
                <button className="btn btn-primary">Learn More</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cards;
