import "./NFTDetailsPage.css";

import { Button, Form } from "react-bootstrap";

import { CarouselData } from "../../utils/dummyData";
import ClockIcon from "../../assets/svg/clock.svg";
import NFTPageCarousel from '../../components/carosel/NFTPageCarousel';
import TopHeading from "./TopHeading";
import { TopHeadingData } from "../../utils/dummyData";
import { useState } from "react";

const NFTDetailsPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { title, address, artist } = TopHeadingData;
  return (
    <div className="nft-page">
      <div className="nft-page-left-section">
        <TopHeading title={title} artist={artist} address={address} />
        <iframe
          className="video-frame"
          width="560"
          height="282"
          src="https://www.youtube.com/embed/fYd-esC2Iw4?controls=0"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <NFTPageCarousel data={CarouselData} />
        <div className="bid-wrapper  mt-3">
          <div className="me-sm-5">
            <div className="mb-1">Current Bid</div>
            <div className="bold-text">0.05 MATIC</div>
          </div>
          <div>
            <div className="mb-1">
              Action ending:{" "}
              <span className="nft-date">(January 10, 2022 at 9:22pm CET)</span>
            </div>
            <div className="bold-text d-flex">
              <img src={ClockIcon} alt="clock" />
              <span className="ms-3 bold-text">1d 10h 33m</span>
            </div>
          </div>
        </div>
        {isLoggedIn === false && (
          <div className="ms-lg-5 ms-md-5 mt-4 auth-bid-btn-wrapper">
            <Button variant="dark">Authenticate to Bid</Button>
          </div>
        )}
        {isLoggedIn && (
          <>
            <div className="form-wrapper mt-4">
              <Form style={{ width: "130px" }}>
                <Form.Group>
                  <Form.Control
                    type="number"
                    placeholder="0.05"
                    className="py-2"
                  />
                </Form.Group>
              </Form>
              <Button className="ms-4 py-2 pe-md-5" variant="dark">
                Place Bid
              </Button>
            </div>
            <div className="text-muted mt-2" style={{ fontSize: "10px" }}>
              Minimum bid is 0.05 MATIC (170.78 EUR)
            </div>
          </>
        )}
      </div>
      <div className="description-container">
        <div>
          <h6 className="nft-about-title">About</h6>
          <hr className="nft-details-custom-hr" />
          <p className="nft-about">
            At vero eos et accusamus et iusto odio dignissimos ducimus qui
            blanditiis praesentium voluptatum deleniti atque corrupti provident,
            similique sunt in culpa qui officia deserunt mollitia animi, id est
            laborum et dolorum fuga. At vero eos et accusamus et iusto odio
            dignissimos ducimus qui blanditiis praesentium voluptatum deleniti
            atque corrupti provident, similique sunt in culpa qui officia
            deserunt mollitia animi, id est laborum et dolorum fuga. At vero eos
            et accusamus et iusto odio dignissimos ducimus qui blanditiis
            praesentium voluptatum deleniti atque corrupti provident, similique
            sunt in culpa qui officia deserunt mollitia animi, id est laborum et
            dolorum fuga. At vero eos et accusamus et iusto odio dignissimos
            ducimus qui blanditiis praesentium voluptatum deleniti atque
            corrupti provident, similique sunt in culpa qui officia deserunt
            mollitia animi, id est laborum et dolorum fuga.
          </p>
        </div>
        <div className="bid-desc-wrapper">
          <h6 className="nft-bid-title">Bids</h6>
          <hr className="nft-details-custom-hr" />
          <div className="nft-bid">
            <p>
              Bid for <strong>0.049 ETH</strong> placed by @xyz, August 25, 2021
              at 2:45 pm
            </p>
            <p>
              Bid for <strong>0.048 ETH</strong> placed by @xyz, August 25, 2021
              at 2:42 pm
            </p>
            <p>
              Minimum bid set at <strong>0.045 ETH</strong> by @xyz, August 25,
              2021 at 2:32 pm
            </p>

            <p>Minted by @xyz, August 20, 2021 at 6:05 pm</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTDetailsPage;
