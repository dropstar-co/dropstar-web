import './Profile.css';

import { Button } from 'react-bootstrap';

import ProfileAvatar from '../../assets/images/profile_logo.png';
import React, { useState } from 'react';
import { getUserBids, fetchLoggedInUser } from '../../store/actions/user';
import { fetchBidSaleVoucher } from '../../store/actions/salevoucher';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUserProfile, getBEUser, getUserBidSelector } from '../../store/selectors/user';
import moment from 'moment';

import ClaimNFT from './ClaimNFT';
import { getWalletType } from '../../store/selectors/wallet';
const Profile = () => {
  const userProfile = useSelector(getUserProfile);
  const user = useSelector(getBEUser);
  const userBidsList = useSelector(getUserBidSelector);

  const [saleVouchers, setSaleVouchers] = useState([]);

  const walletType = useSelector(getWalletType);

  useEffect(async () => {
    let i;
    let newSaleVoucher = [];
    for (i = 0; i < userBidsList.length; i++) {
      const bid = userBidsList[i];
      const saleVoucher = await fetchBidSaleVoucher(bid.id);
      newSaleVoucher.push(saleVoucher);
    }

    setSaleVouchers(newSaleVoucher);
  }, [userBidsList]);

  const dispatch = useDispatch();
  const getNewUser = async () => {
    await dispatch(
      fetchLoggedInUser({
        Email: userProfile?.email,
        VenlyUID: userProfile?.userId,
        walletAddress: userProfile?.walletAddress,
      }),
    );
  };
  useEffect(() => {
    const loads = async () => {
      if (userProfile) {
        await getNewUser();
        const userId = localStorage.getItem('userId');
        dispatch(getUserBids(userId));
      }
    };
    if (user) {
      loads();
    }
  }, []);
  const handleVenly = () => {
    return window.open('https://wallet.venly.io');
  };
  return (
    <div className="profile-page">
      <div className="me-4 profile-page-avatar-container">
        <img src={ProfileAvatar} alt="user" className="profile-page-profile-avatar" />
        <div className="mt-4 text-center">
          <span>{userProfile?.email}</span>
        </div>
      </div>
      <div className="profile-page-right-side">
        {walletType === 'venly' ? (
          <div className="profile-page-balance-container">
            <div className="profile-page-description mb-4 mt-2">
              To claim your NFT please deposit funds into balance! You can find instructions{' '}
              <span className="profile-page-link">here</span>.
            </div>
            <div>
              <Button variant="dark" onClick={handleVenly}>
                Access my Venly Wallet
              </Button>
            </div>
          </div>
        ) : (
          <div className="profile-page-balance-container">
            <div className="profile-page-description mb-4 mt-2">
              To claim your NFT please deposit funds into balance!
            </div>
          </div>
        )}
        <div className="profile-page-lower-section">
          <div>
            <h3 className="profile-page-title">Bids</h3>
            <hr className="profile-page-custom-hr" />
          </div>
          <div className="profile-page-lower-section-wrapper">
            {userBidsList?.map((bid, index) => (
              <div
                style={{
                  marginBottom: '15px',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
                key={bid.id}>
                <div>
                  <div className="profile-page-title-2" style={{ marginBottom: '-8px' }}>
                    Bid placed on {bid?.Nft?.name}
                  </div>
                  <span className="profile-page-date-time">
                    {moment(bid.DateBid).format('dddd, MMMM Do YYYY, h:mm:ss a')}{' '}
                  </span>
                </div>
                {bid.isWinner && (
                  <div className="profile-page-claim-nft">
                    <div className="profile-page-title profile-page-nft-bal">
                      {userBidsList.AmountETH}
                    </div>
                    <ClaimNFT bid={bid} saleVoucher={saleVouchers[index]} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
