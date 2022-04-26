import './DiscoverPage.css';

import React, { useEffect, useState } from 'react';
import { getArtists, getCurrentArtist } from '../../store/selectors/discover';
import { useDispatch, useSelector } from 'react-redux';

import AsideComponent from '../../components/aside-component/AsideComponent';
import Loader from '../Spinner';
import { fetchArtists } from '../../store/actions/discover';
import { getAppLoadingState } from '../../store/selectors/loader';
import { useHistory } from 'react-router-dom';

const DiscoverPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const loading = useSelector(getAppLoadingState);
  const artists = useSelector(getArtists);
  const currentArtist = useSelector(getCurrentArtist);
  const [imageToShow, setImageToShow] = useState(``);
  const [nameToShow, setNameToShow] = useState(``);
  const [idToShow, setIdToShow] = useState(``);

  const auctionStateStrings = {
    3: 'Sold',
    4: 'Sold',
    5: 'Sold',
    6: 'Sold',
    7: 'Auction ended',
    8: 'Auction ended',
  };

  useEffect(() => {
    dispatch(fetchArtists());

    const date = new Date(new Date().getTime() - 19 * 60 * 60 * 1000);
    const day = date.getDay();
    let url, name, clickID;

    switch (day) {
      case 1:
        name = 'Faded System';
        url = `url(${process.env.PUBLIC_URL}/images/GuttoSerta_Crickets.jpg)`;
        clickID = '3';
        break;
      case 2:
        name = 'Tyrd Eye';
        url = `url(${process.env.PUBLIC_URL}/images/GuttoSerta_thyrd_eye.jpg)`;
        clickID = '4';
        break;
      case 3:
        name = 'Crickets';
        url = `url(${process.env.PUBLIC_URL}/images/GuttoSerta_Crickets.jpg)`;
        clickID = '5';
        break;
      case 4:
        name = 'Plastik Bodies';
        url = `url(${process.env.PUBLIC_URL}/images/GuttoSerta_Crickets.jpg)`;
        clickID = '6';
        break;
      case 5:
        name = 'Plastik Bodies Masterpiece I';
        url = `url(${process.env.PUBLIC_URL}/images/master7.jpg)`;
        clickID = '7';
        break;
      case 6:
        name = 'Plastik Bodies Masterpiece II';
        url = `url(${process.env.PUBLIC_URL}/images/Master4-4.jpg)`;
        clickID = '8';
        break;
      default:
        name = 'Collection';
        url = `url(${process.env.PUBLIC_URL}/images/GuttoSerta_Crickets.jpg)`;
        clickID = '5';
    }

    setImageToShow(url);
    setNameToShow(name);
    setIdToShow(clickID);
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <h4 className="page-title">Discover</h4>
      <div className="discover-page">
        <AsideComponent title="Discover" data={artists} auctionStateStrings={auctionStateStrings} />
        <div className="right-container ms-md-3">
          <div
            className="background-image-container"
            onClick={() => history.push(`/nfts/${idToShow}`)}
            style={{ backgroundImage: imageToShow }}
            // {{backgroundImage:
          >
            {/* process.env.REACT_APP_PROD_LINK + `${currentArtist?.Artist?.ImageLink}` */}
            {/* { process.env.NODE_ENV !== "production" ?  `url( ${   currentArtist?.Artist?.ImageLink  })`  : process.env.PROD_LINK + `${currentArtist?.Artist?.ImageLink}`}}} */}
            <div className="text-wrapper">
              <h5 className="nft-title">{nameToShow}</h5>
              <span className="nft-author ms-lg-2 ms-md-2 ms-0">
                by {currentArtist?.Artist?.name}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DiscoverPage;
