import React from "react";
import { useState, useEffect } from "react";
import fetchJsonp from "fetch-jsonp";
import axios from "axios";
import { Link, Route, Switch } from "react-router-dom";
// import Details from "./Details";
import "../scss/components/_images.scss";
import "../scss/layout/_navbar.scss";

export default function Gallery() {
  const [searchTerm, setSearchTerm] = useState("");
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm) {
        handleSearch();
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=70675c94a2668276bd13b85bbe796412&format=json&nojsoncallback=1&text=${searchTerm}`
      );

      const photos = response.data.photos.photo;
      const flickrImages = photos.map((photo) => {
        const imgUrl = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
        const pageUrl = `https://www.flickr.com/photos/${photo.owner}/${photo.id}`;
        const author = photo.ownername;
        const tags = photo.tags;

        return {
          id: photo.id,
          imgUrl,
          pageUrl,
          author,
          tags,
        };
      });

      setImages(flickrImages);
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleClosePopup = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      <nav>
        <div className="logo">
          <img src="../src/assets/Flickrlogo.png" alt="" />
        </div>

        <div>
          <input
            type="text"
            placeholder="Search images..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </nav>

      <div className="image-grid">
        {images.map((image, index) => (
          <div className="image-container" key={index}>
            <img src={image.imgUrl}  onClick={() => handleImageClick(image)} />
            <div className="overlay">
              <p className="author">{image.author}</p>
              <p className="tags">{image.tags}</p>
            </div>
          </div>
        ))}
      </div>

      {/* <Switch> */}
        {/* <div className="imgCtn">
          {images.map((image, index) => (
            <Link to={`/details/${image.id}`} key={index}>
              <div className="image-container">
                <img src={image.imgUrl}  className="images" />
              </div>
            </Link>
          ))}
        </div> */}

        {selectedImage && (
        <div className="popup">
          <div className="popup-content">
            <img src={selectedImage.imgUrl}  className="popup-image" />
            <div className="popup-overlay">
              <p className="author">{selectedImage.author}</p>
              <p className="tags">{selectedImage.tags}</p>
            </div>
            <button className="close-btn" onClick={handleClosePopup}>
              Close
            </button>
          </div>
        </div>
      )}

{/* 
        {images.map((image, index) => (
          <Route key={index} path={`/details/${image.id}`}>
            <Details image={image} />
          </Route>
        ))} */}
      {/* </Switch> */}
    </div>
  );
}
