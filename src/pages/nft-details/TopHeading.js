import './TopHeading.css';

import ShareIcon from '../../assets/svg/shareIcon.svg';

const TopHeading = ({ title, artist, address }) => {
  return (
    <div className="top-heading">
      <div className="top-heading-title-wrapper mb-2">
        <h1 className='top-heading-title'>{title}</h1>
        <div className='top-heading-img-wrapper'>
          <img src={ShareIcon} alt="Share icon" />
          <span className='ms-1 share-text'>Share</span>
        </div>
      </div>
      <div className="top-heading-author-wrapper mb-3">
        <div>
          <span>@{artist} | </span>
          {title}
        </div>
        <div>
          <span className='me-2'>Contact address</span> {address}
        </div>
      </div>
    </div>
  );
}

export default TopHeading;
