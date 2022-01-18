import "./NFTPageCarousel.css";

import React, { useState } from "react";

import Carousel from "react-bootstrap/Carousel";

const NFTPageCarousel = ({ data }) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  return (
    <div className="mb-5 mt-3 nft-page-caro">
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        variant="dark"
        controls={false}
        interval={90000}
      >
        {data.map((datum) => (
          <Carousel.Item key={datum.id}>
            <h3 className="caro-title">{datum.title}</h3>
            <hr className="carousel-custom-hr" />
            <p className="caro-text">{datum.text}</p>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default NFTPageCarousel;
