import "./DiscoverPage.css";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import AsideComponent from "../../components/aside-component/AsideComponent";
import { fetchArtists } from "../../store/actions/discover";
import { useHistory} from 'react-router-dom';
import {
  getLoadingStatus,
  getArtists,
  getCurrentArtist,
} from "../../store/selectors/discover";
import Loader from "../Spinner";

const DiscoverPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const loading = useSelector(getLoadingStatus);
  const artists = useSelector(getArtists);
  const currentArtist = useSelector(getCurrentArtist);

  useEffect(() => {
    dispatch(fetchArtists());
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <h4 className="page-title">Discover</h4>
      <div className="discover-page">
        <AsideComponent title="Discover" data={artists} />
        <div className="right-container ms-md-3">
          <div
            className="background-image-container"
            onClick={() => history.push(`/nfts/${currentArtist?.id}`)}
            style={{backgroundImage: `url(${currentArtist?.Artist?.ImageLink})`}}
          >
            <div className="text-wrapper">
              <h5 className="nft-title">{currentArtist?.name}</h5>
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
