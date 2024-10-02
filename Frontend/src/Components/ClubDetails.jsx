import React from 'react';
import { useParams } from 'react-router-dom';

function ClubDetails() {
  const { id } = useParams();
  const club = clubsData.find((item) => item.id === parseInt(id));

  if (!club) {
    return <p>Club not found!</p>;
  }

  return (
    <div>
      <h1>{club.name}</h1>
      <img src={club.image} alt={club.name} />
      <p>{club.description}</p>
      {/* Additional details about the club */}
    </div>
  );
}

export default ClubDetails;
