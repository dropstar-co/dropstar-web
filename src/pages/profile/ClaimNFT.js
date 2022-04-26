import { Button, Form } from 'react-bootstrap';
import { fetchNfts, fetchNftsBids } from '../../store/actions/nfts';
import { getNfts, getNtftsBids } from '../../store/selectors/nfts';
import { setUserAuthState, setUserProfile, fetchLoggedInUser } from '../../store/actions/user';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Countdown from 'react-countdown';

//import { CarouselData } from '../../utils/dummyData';
//import ClockIcon from '../../assets/svg/clock.svg';
//import ConfirmBid from '../confirm-bid/ConfirmBid';
import Loader from '../Spinner';
//import NFTPageCarousel from '../../components/carosel/NFTPageCarousel';
//import TopHeading from './TopHeading';
import { getAppLoadingState } from '../../store/selectors/loader';
import { getBEUser, getUserAuthState } from '../../store/selectors/user';
import venlyHelpers from '../../helpers/venly';
import moment from 'moment';
//import Polygon from '../../assets/images/ploygon.png';
const ClaimNFT = ({ bid, saleVoucher }) => {
  const match = {};
  const [amount, setAmount] = useState(0);
  const [modalShow, setModalShow] = useState(false);
  let nftsId = bid.nftID;
  const dispatch = useDispatch();
  const loading = useSelector(getAppLoadingState);
  const nftsDetails = useSelector(getNfts);
  const nftsBids = useSelector(getNtftsBids);
  const isUserAuthenticated = useSelector(getUserAuthState);
  const user = useSelector(getBEUser);

  const getCurrentBid = () => {
    return nftsBids.reduce((acc, shot) => (acc = acc > shot.AmountETH ? acc : shot.AmountETH), 0);
  };
  useEffect(() => {
    dispatch(fetchNfts(nftsId));
    dispatch(fetchNftsBids(nftsId));
  }, [dispatch, nftsId]);
  const getPlaceBid = (nftsDetails, amount) => {
    if (moment(nftsDetails.EndDate) > moment()) {
      if (amount > getCurrentBid()) {
        if (amount > 0) {
          if (amount >= nftsDetails.minimumBidETH && amount > 0.01) {
            return false;
          }
          return true;
        }
        return true;
      }
      return true;
    }
    return true;
  };

  const getValidDate = nftsDetails => {
    if (moment(nftsDetails.EndDate).diff(moment()) > 0) {
      return true;
    }
    return false;
  };
  if (loading) {
    return <Loader />;
  }

  const handleVenlyClaimNFT = async function () {
    console.log({ user });

    //console.log({ userProfile, user, userBidsList });
    await venlyHelpers.claimNFT(saleVoucher);

    return;

    /*
    const _id = bid.id;
    const _bidWinner = user.walletAddress;

    nfttokenId

    const chequeId
        const _tokenAddress,
        uint256 _tokenId,
        address _holder,
        uint256 _price,
        address _bidWinner,
        address payable _paymentRecipient,
        uint256 _startDate,
        uint256 _deadline,
        Signature[] calldata _signatures
    */
  };

  return (
    <Button variant="secondary" onClick={handleVenlyClaimNFT}>
      Claim NFT
    </Button>
  );

  /*
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
            allowFullScreen></iframe>
          <NFTPageCarousel data={nftsBids} />
          <div className="bid-wrapper  mt-3">
            <div className="me-sm-5">
              <div className="mb-1">Current Bid</div>
              <div className="bold-text">{nftsBids && getCurrentBid()} MATIC</div>
            </div>
            <div>
              <div className="mb-1">
                Action ending:{' '}
                <span className="nft-date">
                  {nftsDetails.EndDate &&
                    moment(nftsDetails.EndDate).format('dddd, MMMM Do YYYY, h:mm:ss a')}
                  {}
                </span>
              </div>
              <div className="bold-text d-flex">
                <img src={ClockIcon} alt="clock" />
                <span className="ms-3 bold-text">
                  {nftsDetails.EndDate && <Countdown date={nftsDetails.EndDate} />}
                </span>
              </div>
            </div>
          </div>
          {!isUserAuthenticated && (
            <div className="ms-lg-5 ms-md-5 mt-4 auth-bid-btn-wrapper">
              {getValidDate(nftsDetails) ? (
                <Button variant="dark" onClick={handleLogin}>
                  Authenticate to Bid
                </Button>
              ) : (
                <Button variant="secondary">Auction Ended</Button>
              )}
            </div>
          )}
          {isUserAuthenticated &&
            (getValidDate(nftsDetails) ? (
              <>
                <div className="form-wrapper mt-4">
                  <Form style={{ width: '130px' }}>
                    <Form.Group>
                      <Form.Control
                        type="number"
                        placeholder="0.05"
                        className="py-2"
                        onChange={e => setAmount(e.target.value)}
                      />
                    </Form.Group>
                  </Form>
                  {getValidDate(nftsDetails) && (
                    <img src={Polygon} width="100px" height="auto" alt="clock" />
                  )}

                  <Button
                    className="ms-4 py-2 pe-md-5"
                    variant="dark"
                    onClick={() => setModalShow(true)}
                    disabled={getPlaceBid(nftsDetails, amount)}>
                    Place Bid
                  </Button>
                </div>
                <div className="text-muted mt-2" style={{ fontSize: '10px' }}>
                  Minimum bid is {nftsDetails?.minimumBidETH} MATIC (170.78 EUR)
                </div>
              </>
            ) : (
              <div className="form-wrapper mt-4">
                <Button variant="secondary">Auction Ended</Button>
              </div>
            ))}
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
              {nftsBids?.map(bid => (
                <p key={bid.id}>
                  Bid for <strong>{bid.AmountETH}</strong> placed by @xyz,{' '}
                  {moment(bid.DateBid).format('dddd, MMMM Do YYYY, h:mm:ss a')}
                </p>
              ))}
              <p>
                Minted by @xyz,{' '}
                {moment(nftsDetails.MintedDate).format('dddd, MMMM Do YYYY, h:mm:ss a')}
              </p>
            </div>
          </div>
        </div>
      </div>
      <ConfirmBid
        image={nftsDetails?.Artist?.ImageLink}
        title={nftsDetails?.name}
        socialLink={nftsDetails?.Artist?.SocialLink}
        socialLabel={nftsDetails?.Artist?.SocialLabel}
        nftId={nftsId}
        userId={user?.id}
        show={modalShow}
        minBid={nftsDetails?.minimumBidETH}
        onHide={() => setModalShow(false)}
        amount={amount}
        setAmount={setAmount}
      />
    </>
  );
  */
};

export default ClaimNFT;
