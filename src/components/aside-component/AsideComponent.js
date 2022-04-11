import React from 'react';
import { Accordion } from 'react-bootstrap';
import './AsideComponent.css';
import { setCurrentArtist } from '../../store/actions/discover';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import humanizeDuration from 'humanize-duration';

const AsideComponent = ({ title, data }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  console.log({ hd: humanizeDuration(32846000) });
  return (
    <div className="aside-page">
      <h4 className="title">{title}</h4>
      <Accordion flush>
        {data?.map(datum => (
          <Accordion.Item
            eventKey={datum.id}
            key={datum.id}
            onClick={() => dispatch(setCurrentArtist(datum))}>
            <Accordion.Header className="accord-header">
              {Date.parse(datum.EndDate) < Date.now() ? (
                <div>
                  <div>{`${datum.name}  `}</div>
                  <div style={{ color: 'red' }}>Auction ended</div>
                </div>
              ) : (
                <div>
                  <div>{`${datum.name}  `}</div>
                  <div style={{ color: 'green' }}>
                    {humanizeDuration(Date.parse(datum.EndDate) - Date.now(), { largest: 2 })}
                  </div>
                </div>
              )}
            </Accordion.Header>
            <Accordion.Body>
              <div className="content">{datum.NftAbout}</div>
              <div className="show-detail-text" onClick={() => history.push(`/nfts/${datum.id}`)}>
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
