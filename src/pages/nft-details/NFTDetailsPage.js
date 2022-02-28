import "./NFTDetailsPage.css";

import { Button, Form } from "react-bootstrap";
import { fetchNfts, fetchNftsBids, postBid } from "../../store/actions/nfts";
import { getNfts, getNtftsBids } from "../../store/selectors/nfts";
import { setUserAuthState, setUserProfile } from "../../store/actions/user";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { CarouselData } from "../../utils/dummyData";
import ClockIcon from "../../assets/svg/clock.svg";
import ConfirmBid from "../confirm-bid/ConfirmBid";
import Loader from "../Spinner";
import NFTPageCarousel from "../../components/carosel/NFTPageCarousel";
import TopHeading from "./TopHeading";
import { getAppLoadingState } from "../../store/selectors/loader";
import { getUserAuthState } from "../../store/selectors/user";
import venlyHelpers from "../../helpers/venly";

const NFTDetailsPage = ({ match }) => {
  const [amount, setAmount] = useState(0);
  const [modalShow, setModalShow] = useState(false);
  let nftsId = match.params.nftsId;
  const dispatch = useDispatch();
  const loading = useSelector(getAppLoadingState);
  const nftsDetails = useSelector(getNfts);
  const nftsBids = useSelector(getNtftsBids);
  const isUserAuthenticated = useSelector(getUserAuthState);

  const handleLogin = async () => {
    const ve = await venlyHelpers.login();
    if (ve?.userId && ve?.email) {
      dispatch(setUserAuthState(true));
      dispatch(
        setUserProfile({
          userId: ve?.userId,
          email: ve?.email,
          firstName: ve?.firstName,
          lastName: ve?.lastName,
          hasMasterPin: ve?.hasMasterPin,
        })
      );
    }
  };

  // const handleSubmitBid = (id, userId) => {
  //   console.log()
  //   setModalShow(true);
  //   const data = {
  //     nftID:id,
  //     userId,
  //     amountETH: amount,
  //     isWinner: false,
  //     DateBid: "2022-01-23",
  //   };
  //   console.log('here');
  //   dispatch(postBid(data));
  //   console.log('here,jkj');

  // };
  useEffect(() => {
    dispatch(fetchNfts(nftsId));
    dispatch(fetchNftsBids(nftsId));
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
            src={nftsDetails?.SampleVideoLink}
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
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </Form.Group>
                </Form>
                <Button
                  className="ms-4 py-2 pe-md-5"
                  variant="dark"
                  onClick={() => setModalShow(true)}
                  disabled={amount < nftsDetails?.minimumBidETH}
                >
                  Place Bid
                </Button>
              </div>
              <div className="text-muted mt-2" style={{ fontSize: "10px" }}>
                Minimum bid is {nftsDetails?.minimumBidETH} MATIC (170.78 EUR)
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
              {nftsBids?.map((bid) => (
                <p>
                  Bid for <strong>0.049 ETH</strong> placed by @xyz, August 25,
                  2021 at 2:45 pm
                </p>
              ))}
              {/* <p>
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
              </p> */}

              <p>Minted by @xyz, August 20, 2021 at 6:05 pm</p>
            </div>
          </div>
        </div>
      </div>
      <ConfirmBid
        title={nftsDetails?.name}
        socialLink={nftsDetails?.Artist?.SocialLink}
        socialLabel={nftsDetails?.Artist?.SocialLabel}
        nftId={nftsId}
        show={modalShow}
        minBid={nftsDetails?.minimumBidETH}
        onHide={() => setModalShow(false)}
        amount={amount}
      />
    </>
  );
};

export default NFTDetailsPage;
