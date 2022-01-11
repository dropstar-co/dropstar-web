import React from "react";

import AsideComponent from "../../components/aside-component/AsideComponent";

import "./DiscoverPage.css";

const DiscoverPage = () => {
  return (
    <>
      <h4 className="page-title">Discover</h4>
      <div className="discover-page">
        <AsideComponent title="Discover" />
        <div className="right-container ms-md-3">
          <div className="background-image-container">
            <div className="text-wrapper">
              <h5 className="nft-title">Remix Album</h5>
              <span className="nft-author ms-lg-2 ms-md-2 ms-0">
                by Christian Loeffler
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DiscoverPage;
