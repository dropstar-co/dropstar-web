import './NFTPageCarousel.css';

import React, { useState } from 'react';

import Carousel from 'react-bootstrap/Carousel';
import moment from 'moment';
const NFTPageCarousel = ({ data , details}) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  return (
    <div className="q">
      <div className="mb-5 mt-3 nft-page-caro media" style={{ display: 'flex' }}>
        <p>Minted ,{' '}
                {moment(details.MintedDate).format('dddd, MMMM Do YYYY, h:mm:ss a')}</p>
        <Carousel
          activeIndex={index}
          onSelect={handleSelect}
          variant="dark"
          controls={false}
          interval={90000}>
          {data.map(datum => (
            <Carousel.Item key={datum.id}>
              <h3 className="caro-title">
                Bid for <strong>{datum.AmountETH} MATIC</strong> placed at{' '}
                {moment(datum.DateBid).format('dddd, MMMM Do YYYY, h:mm:ss a')}
              </h3>
              <hr className="carousel-custom-hr" />
              {/* <p className="caro-text">{datum.text}</p> */}
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default NFTPageCarousel;
