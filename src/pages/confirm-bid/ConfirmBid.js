import './ConfirmBid.css';

import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getNtftsStatus } from '../../store/selectors/nfts';
import { getUserProfile } from '../../store/selectors/user';
import { postBid } from '../../store/actions/nfts';
import { useState } from 'react';
import moment from 'moment';

const ConfirmBid = props => {
  const dispatch = useDispatch();
  const [agree, setAgree] = useState(false);
  const [showCongratMessage, setShowCongratMessage] = useState(false);
  const userProfile = useSelector(getUserProfile);
  const status = useSelector(getNtftsStatus);

  const handleChange = e => {
    setAgree(e.target.checked);
  };
  const userId = localStorage.getItem('userId');
  const handleBidConfirmation = async () => {
    const data = {
      userID: userId,
      nftID: props?.nftId,
      AmountETH: props.amount,
      isWinner: false,
      DateBid: moment(),
    };

    dispatch(postBid(data));
    if (status === 'completed') {
      setShowCongratMessage(true);
    }
  };

  const handleFinalClose = () => {
    props.onHide();
    setShowCongratMessage(false);
    setAgree(!agree);
    props.setAmount(0);
  };

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Confirm Bid</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h1 className="confirm-bid-title">{props?.title}</h1>
        <div className="confirm-bid-social">
          @{props?.socialLink}_{props?.socialLabel}
        </div>
        <div>
          <img
            src={process.env.REACT_APP_IMAGE_LINK + props.image}
            alt={props?.title}
            width="100%"
            height={200}
          />
        </div>
        {showCongratMessage && (
          <div className="message-container text-center mt-4">
            <h6 className="message message-title mb-3">Congratulations, your bid was placed!</h6>
            <p className="message message-text">
              The winner will be notified once the auction has closed.
            </p>
            <div className="close-button-wrapper">
              <div className="d-grid gap-2">
                <Button className="px-5" variant="dark" onClick={handleFinalClose}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}
        {!showCongratMessage && (
          <>
            <div className="confirm-bid-bid-container mt-3">
              <p className="confirm-bid-title-2">Your Bid:</p>
              <h6 className="confirm-bid-amount mb-2">{props.amount} MATIC</h6>
              <div className="checkbox-wrapper align-items-center">
                <input type="checkbox" checked={agree} className="me-1" onChange={handleChange} />
                <label className="confirm-bid-terms-and-conditions">
                  By checking this box, I agree with the{' '}
                  <a href="https://www.dropstar.org/terms" target="_blank" className="terms-link">
                    Terms of Service
                  </a>{' '}
                </label>
              </div>
            </div>
            <div className="text-center mt-4 mb-3">
              <Button
                className="px-5"
                disabled={!agree}
                variant="dark"
                onClick={handleBidConfirmation}>
                Confirm Bid
              </Button>
            </div>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ConfirmBid;
