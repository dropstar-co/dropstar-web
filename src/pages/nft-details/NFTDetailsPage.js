import './NFTDetailsPage.css';

import { Button, Form } from 'react-bootstrap';
import { fetchNfts, fetchNftsBids } from '../../store/actions/nfts';
import { getNfts, getNtftsBids } from '../../store/selectors/nfts';
import {
  setUserAuthState,
  setUserProfile,
  fetchLoggedInUser,
  updateUser,
} from '../../store/actions/user';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Countdown from 'react-countdown';
import axios from 'axios';
import ClockIcon from '../../assets/svg/clock.svg';
import ConfirmBid from '../confirm-bid/ConfirmBid';
import Loader from '../Spinner';
import NFTPageCarousel from '../../components/carosel/NFTPageCarousel';
import TopHeading from './TopHeading';
import { getAppLoadingState } from '../../store/selectors/loader';
import { getBEUser, getUserAuthState } from '../../store/selectors/user';
import venlyHelpers from '../../helpers/venly';
import moment from 'moment';

import Polygon from '../../assets/svg/polygon-matic-logo.svg';
import { useHistory } from 'react-router-dom';
const NFTDetailsPage = ({ match }) => {
  const history = useHistory();
  const [amount, setAmount] = useState(0);
  const [modalShow, setModalShow] = useState(false);
  const [maticPrice, setMaticPrice] = useState(0);
  const [maticEUR, setMaticEUR] = useState(0);
  let nftsId = match.params.nftsId;
  const dispatch = useDispatch();
  const loading = useSelector(getAppLoadingState);
  const nftsDetails = useSelector(getNfts);
  const nftsBids = useSelector(getNtftsBids);
  const isUserAuthenticated = useSelector(getUserAuthState);
  const user = useSelector(getBEUser);

  const handleLogin = async () => {
    const ve = await venlyHelpers.login();

    if (ve === undefined) {
      alert('Login failed: check browser configuration');
      history.push('/login-issue');
      return;
    }

    const wallets = await venlyHelpers.getWallets();

    const newVE = Object.assign(ve, { walletAddress: wallets[0].address });
    await updateUser(newVE);

    if (ve?.userId && ve?.email) {
      dispatch(fetchLoggedInUser({ Email: ve?.email, VenlyUID: ve?.userId }));
      dispatch(setUserAuthState(true));
      dispatch(
        setUserProfile({
          userId: ve?.userId,
          email: ve?.email,
          firstName: ve?.firstName,
          lastName: ve?.lastName,
          hasMasterPin: ve?.hasMasterPin,
        }),
      );
    }
  };

  const getCurrentBid = () => {
    return nftsBids.reduce((acc, shot) => (acc = acc > shot.AmountETH ? acc : shot.AmountETH), 0);
  };
  // minimumBidETH

  const getMinimumBid = () => {
    return nftsBids.reduce(
      (acc, shot) => (acc = acc > shot.AmountETH ? acc : shot.AmountETH),
      nftsDetails?.minimumBidETH,
    );
  };

  const getCurrentMaticToEuro = async () => {
    try {
      const res = await axios.get(
        'https://min-api.cryptocompare.com/data/price?fsym=MATIC&tsyms=EUR',
        {
          'content-type': 'application/json',
        },
      );
      const { EUR } = res.data;
      const current = getMinimumBid();
      const data = Math.round(current * EUR * 100) / 100;
      setMaticPrice(data);
      setMaticEUR(EUR);

      //console.log({ current, data, EUR });

      return setMaticPrice(data);
    } catch (err) {
      console.log(err);
    }
  };

  //console.log({ maticEUR, maticPrice, minBid: nftsDetails.minimumBidETH, user });

  useEffect(() => {
    getCurrentMaticToEuro();
  }, [user, nftsDetails.id]);

  useEffect(() => {
    dispatch(fetchNfts(nftsId));
    dispatch(fetchNftsBids(nftsId));
  }, [dispatch, nftsId]);

  const getPlaceBid = (nftsDetails, amount) => {
    if (moment(nftsDetails.EndDate) > moment()) {
      if (amount > getCurrentBid()) {
        if (amount > 0) {
          if (amount >= nftsDetails.minimumBidETH && amount > 0.01) {
            console.log(`amount=${amount} minimumBidMatic=${nftsDetails.minimumBidETH}`);
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
          <NFTPageCarousel data={nftsBids} details={nftsDetails} />
          <div className="bid-wrapper  mt-3">
            <div className="me-sm-5">
              {nftsBids && nftsBids.length !== 0 ? (
                <div>
                  {nftsBids[0].userID === user.id ? (
                    <div className="mb-1">You are the current bid Winner</div>
                  ) : (
                    <div className="mb-1">Current Bid</div>
                  )}

                  <div className="bold-text">{nftsBids && getCurrentBid()} MATIC</div>
                  <div>
                    {nftsBids && maticPrice > 0
                      ? maticPrice
                      : Math.round(nftsDetails.minimumBidETH * maticEUR * 100) / 100}{' '}
                    EURO
                  </div>
                </div>
              ) : (
                <div>
                  <div className="mb-1">Be the first!</div>
                  <div className="bold-text">{nftsDetails.minimumBidETH} MATIC</div>
                  <div>
                    {nftsBids && maticPrice > 0
                      ? maticPrice
                      : Math.round(nftsDetails.minimumBidETH * maticEUR * 100) / 100}{' '}
                    EURO
                  </div>
                </div>
              )}
            </div>
            <div className="text22">
              <div className="mb-1">
                Auction ending:{' '}
                <span className="nft-date">
                  {nftsDetails.EndDate &&
                    moment(nftsDetails.EndDate).format('dddd, MMMM Do YYYY, h:mm:ss a')}
                  {/* <Countdown date={Date.now() + 10000} />, */}
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
                        placeholder={nftsDetails.minimumBidETH}
                        className="py-2"
                        onChange={e => setAmount(e.target.value)}
                      />
                    </Form.Group>
                  </Form>
                  {getValidDate(nftsDetails) && (
                    <img src={Polygon} width="100px" height="40px" alt="clock" />
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
                  Minimum bid is {nftsBids && getMinimumBid()} MATIC ({maticPrice} EURO)
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
            <div
              className="nft-about"
              dangerouslySetInnerHTML={{ __html: nftsDetails?.NftDetails }}
            />
          </div>
          <div className="bid-desc-wrapper">
            <h6 className="nft-bid-title">Bids</h6>
            <hr className="nft-details-custom-hr" />
            <div className="nft-bid">
              {nftsBids?.map(bid => (
                <p key={bid.id}>
                  {user.id === bid.userID ? `You (${user.Email}) bid ` : 'Someone else bid '}
                  for <strong>{bid.AmountETH} MATIC</strong> (
                  {Math.round(bid.AmountETH * maticEUR * 100) / 100} EUR) placed on{' '}
                  {moment(bid.DateBid).format('dddd, MMMM Do YYYY, h:mm:ss a')}
                </p>
              ))}
              <p>
                Minted , {moment(nftsDetails.MintedDate).format('dddd, MMMM Do YYYY, h:mm:ss a')}
              </p>
            </div>
          </div>
        </div>
      </div>
      <ConfirmBid
        image={nftsDetails?.ImageLink}
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
};

export default NFTDetailsPage;
