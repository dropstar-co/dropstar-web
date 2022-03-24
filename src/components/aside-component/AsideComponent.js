import React from "react";
import { Accordion } from "react-bootstrap";
import "./AsideComponent.css";
import { setCurrentArtist } from "../../store/actions/discover";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const AsideComponent = ({ title, data }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <div className="aside-page">
      <h4 className="title">{title}</h4>
      <Accordion flush>
        {data?.map((datum) => (
          <Accordion.Item
            eventKey={datum.id}
            key={datum.id}
            onClick={() => dispatch(setCurrentArtist(datum))}
          >
            <Accordion.Header className="accord-header">
              {datum.name}
            </Accordion.Header>
            <Accordion.Body>
              <div className="content">{datum.NftAbout}</div>
              <div
                className="show-detail-text"
                onClick={() => history.push(`/nfts/${datum.id}`)}
              >
                Show Details
              </div>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
};

export default AsideComponent;
