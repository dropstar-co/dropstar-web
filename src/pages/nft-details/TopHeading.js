import './TopHeading.css';

import ShareIcon from '../../assets/svg/shareIcon.svg';

const TopHeading = ({ title, socialLink, socialLabel, address }) => {
  return (
    <div className="top-heading">
      <div className="top-heading-title-wrapper mb-2">
        <h1 className="top-heading-title">{title}</h1>
        {/* <div className="top-heading-img-wrapper">
          <img src={ShareIcon} alt="Share icon" />
          <span className="ms-1 share-text">Share</span>
        </div> */}
      </div>
      <div className="top-heading-author-wrapper mb-3">
        <div>
          <span>
            @{socialLink}_{socialLabel}
          </span>
          <span className="mx-sm-3">|</span>
          <span>{title}</span>
        </div>
        <div>
          <a
            className="contract-address-link me-2"
            target="_blank"
            href={'http://polygonscan.com/address/' + address}>
            Contract address
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopHeading;
