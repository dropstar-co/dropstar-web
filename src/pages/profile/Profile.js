import "./Profile.css";

import { Button } from "react-bootstrap";
import ProfileAvatar from "../../assets/svg/profileImage.svg";
import React from "react";

const Profile = () => {
  return (
    <div className="profile-page">
      <div className="me-4 profile-page-avatar-container">
        <img
          src={ProfileAvatar}
          alt="user"
          className="profile-page-profile-avatar"
        />
        <div className="mt-4 text-center">
          <span>Myemail@email.com</span>
        </div>
      </div>
      <div className="profile-page-right-side">
        <div className="profile-page-balance-container">
          <h3 className="profile-page-title">Your Balance</h3>
          <hr className="profile-page-custom-hr" />
          <div className="profile-page-balance-amount mb-2">0.00 MATIC</div>
          <div className="profile-page-description mb-4 mt-2">
            To claim your NFT please deposit funds into balance! You can find
            instructions <span className="profile-page-link">here</span>.
          </div>
          <div>
            <Button variant="dark">Access my Venly Wallet</Button>
          </div>
        </div>
        <div className="profile-page-lower-section">
          <div>
            <h3 className="profile-page-title">Bids</h3>
            <hr className="profile-page-custom-hr" />
          </div>
          <div className="profile-page-lower-section-wrapper">
            <div>
              <div
                className="profile-page-title-2"
                style={{ marginBottom: "-8px" }}
              >
                Bid placed on ENTRET PLANET
              </div>
              <span className="profile-page-date-time">
                Dec. 20, 2021 at 12:01pm{" "}
              </span>
            </div>
            <div className="profile-page-claim-nft">
              <div className="profile-page-title profile-page-nft-bal">0.05 ETH</div>
              <Button variant="secondary">Claim NFT</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
