import { Modal, Button, Form } from "react-bootstrap";
import "./ConfirmBid.css";
import Image from "../../assets/images/background.svg";
import { useState } from "react";

const ConfirmBid = (props) => {
  const [agree, setAgree] = useState(false);
  const [showCongratMessage, setShowCongratMessage] = useState(false);

  const handleChange = (e) => {
    setAgree(e.target.checked);
  };

  const handleShowCongratMessage = () => setShowCongratMessage(true);
  
  const handleFinalClose = () => {
    props.onHide();
    setShowCongratMessage(false);
    setAgree(!agree);
  }

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Confirm Bid
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h1 className="confirm-bid-title">{props?.title}</h1>
        <div className="confirm-bid-social">
          @{props?.socialLink}_{props?.socialLabel}
        </div>
        <div>
          <img src={Image} alt={props?.title} width="100%" />
        </div>
        {showCongratMessage && (
          <div className="message-container text-center mt-4">
            <h6 className="message message-title mb-3">
              Congratulations, your bid was placed!
            </h6>
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
              <h6 className="confirm-bid-amount mb-2">0.05 MATIC</h6>
              <div className="checkbox-wrapper align-items-center">
                <input
                  type="checkbox"
                  checked={agree}
                  className="me-1"
                  onChange={handleChange}
                />
                <label className="confirm-bid-terms-and-conditions">
                  By checking this box, I agree with the{" "}
                  <a href="!#" className="terms-link">
                    Terms of Service
                  </a>{" "}
                </label>
              </div>
            </div>
            <div className="text-center mt-4 mb-3">
              <Button
                className="px-5"
                disabled={!agree}
                variant="dark"
                onClick={handleShowCongratMessage}
              >
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
