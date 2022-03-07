import "./Profile.css";

import { Button } from "react-bootstrap";
import ProfileAvatar from "../../assets/svg/profileImage.svg";
import React from "react";
import { getUserBids, fetchLoggedInUser } from "../../store/actions/user";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getUserAuthState,
  getUserProfile,
  getBEUser,
  getUserBidSelector,
} from "../../store/selectors/user";
import moment from "moment";
const Profile = () => {
  const userProfile = useSelector(getUserProfile);
  const user = useSelector(getBEUser);
  const userBidsList = useSelector(getUserBidSelector);
  const dispatch = useDispatch();
  const getNewUser = async () => {
    const newUse = await dispatch(
      fetchLoggedInUser({
        Email: userProfile?.email,
        VenlyUID: userProfile?.userId,
      })
    );
  };
  useEffect(() => {
    console.log(userProfile?.email, userProfile?.userId);
    const newUser = getNewUser();
    console.log("my new user is", user && user);
    // console.log(userProfile && user);
    user && dispatch(user && getUserBids(user && user.id));
    // user && console.log("fetching the profile");
  }, []);
  const handleVenly = () => {
    return window.open(
      "https://login.arkane.network/auth/realms/Arkane/protocol/openid-connect/auth?client_id=Arkane&state=b6b2c690-3a93-42e6-837d-962c45698d50&redirect_uri=https%3A%2F%2Fwallet.venly.io%2F%3Fauth_callback%3D1&scope=openid&response_type=code"
    );
  };
  return (
    <div className="profile-page">
      <div className="me-4 profile-page-avatar-container">
        <img
          src={ProfileAvatar}
          alt="user"
          className="profile-page-profile-avatar"
        />
        <div className="mt-4 text-center">
          <span>{userProfile?.email}</span>
        </div>
      </div>
      <div className="profile-page-right-side">
        <div className="profile-page-balance-container">
          {/* <h3 className="profile-page-title">Your Balance</h3>
          <hr className="profile-page-custom-hr" />
          <div className="profile-page-balance-amount mb-2">0.00 MATIC</div> */}
          <div className="profile-page-description mb-4 mt-2">
            To claim your NFT please deposit funds into balance! You can find
            instructions <span className="profile-page-link">here</span>.
          </div>
          <div>
            <Button variant="dark" onClick={handleVenly}>
              Access my Venly Wallet
            </Button>
          </div>
        </div>
        <div className="profile-page-lower-section">
          <div>
            <h3 className="profile-page-title">Bids</h3>
            <hr className="profile-page-custom-hr" />
          </div>
          <div className="profile-page-lower-section-wrapper">
            {userBidsList?.map((bid) => (
              <div
                style={{
                  marginBottom: "15px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div
                    className="profile-page-title-2"
                    style={{ marginBottom: "-8px" }}
                  >
                    Bid placed on ENTRET PLANET
                  </div>
                  <span className="profile-page-date-time">
                    {moment(bid.DateBid).format(
                      "dddd, MMMM Do YYYY, h:mm:ss a"
                    )}{" "}
                  </span>
                </div>
                {bid.isWinner && (
                  <div className="profile-page-claim-nft">
                    <div className="profile-page-title profile-page-nft-bal">
                      0.05 ETH
                    </div>
                    <Button variant="secondary" onClick={handleVenly}>
                      Claim NFT
                    </Button>
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
