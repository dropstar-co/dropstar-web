import "./NFTDetailsPage.css";

import { Button, Form } from "react-bootstrap";

import { CarouselData } from "../../utils/dummyData";
import ClockIcon from "../../assets/svg/clock.svg";
import NFTPageCarousel from "../../components/carosel/NFTPageCarousel";
import TopHeading from "./TopHeading";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNfts } from "../../store/actions/nfts";
import { getNftsLoadingStatus, getNfts } from "../../store/selectors/nfts";
import Loader from "../Spinner";
import venlyHelpers from "../../helpers/venly";
import ConfirmBid from "../confirm-bid/ConfirmBid";

const NFTDetailsPage = ({ match }) => {
  const [modalShow, setModalShow] = useState(false);
  let nftsId = match.params.nftsId;
  const dispatch = useDispatch();
  const loading = useSelector(getNftsLoadingStatus);
  const nftsDetails = useSelector(getNfts);
  const isUserAuthenticated = localStorage.getItem("dstoken");

  const handleLogin = async () => {
    const ve = await venlyHelpers.login();
    console.log(ve);
  };

  useEffect(() => {
    dispatch(fetchNfts(nftsId));
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <div className="nft-page">
        <div className="nft-page-left-section">
          <TopHeading
            title={nftsDetails?.name}
            socialLink={nftsDetails?.Artist?.SocialLink}
            socialLabel={nftsDetails?.Artist?.SocialLabel}
            address={nftsDetails?.PolygonAddress}
          />
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
                <span className="nft-date">
                  (January 10, 2022 at 9:22pm CET)
                </span>
              </div>
              <div className="bold-text d-flex">
                <img src={ClockIcon} alt="clock" />
                <span className="ms-3 bold-text">1d 10h 33m</span>
              </div>
            </div>
          </div>
          {!isUserAuthenticated && (
            <div className="ms-lg-5 ms-md-5 mt-4 auth-bid-btn-wrapper">
              <Button variant="dark" onClick={handleLogin}>
                Authenticate to Bid
              </Button>
            </div>
          )}
          {isUserAuthenticated && (
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
                <Button className="ms-4 py-2 pe-md-5" variant="dark" onClick={() => setModalShow(true)}>
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
            <p className="nft-about">{nftsDetails?.NftAbout}</p>
          </div>
          <div className="bid-desc-wrapper">
            <h6 className="nft-bid-title">Bids</h6>
            <hr className="nft-details-custom-hr" />
            <div className="nft-bid">
              <p>
                Bid for <strong>0.049 ETH</strong> placed by @xyz, August 25,
                2021 at 2:45 pm
              </p>
              <p>
                Bid for <strong>0.048 ETH</strong> placed by @xyz, August 25,
                2021 at 2:42 pm
              </p>
              <p>
                Minimum bid set at <strong>0.045 ETH</strong> by @xyz, August
                25, 2021 at 2:32 pm
              </p>

              <p>Minted by @xyz, August 20, 2021 at 6:05 pm</p>
            </div>
          </div>
        </div>
      </div>
      <ConfirmBid
        title={nftsDetails?.name}
        socialLink={nftsDetails?.Artist?.SocialLink}
        socialLabel={nftsDetails?.Artist?.SocialLabel}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};

export default NFTDetailsPage;
