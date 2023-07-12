import React from 'react';
import { useParams } from 'react-router-dom';

function Details({ image }) {
  const { id } = useParams();

  return (
    <div>
      <h2>Image Details</h2>
      <div>
        <img src={image.imgUrl}  />
        <p>Click on the image to view it on Flickr:</p>
        <a href={image.pageUrl} target="_blank" rel="">
          {image.pageUrl}
        </a>
      </div>
      <p>ID: {id}</p>
    </div>
  );
}

export default Details;