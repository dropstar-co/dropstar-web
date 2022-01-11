import React from "react";
import { Accordion } from "react-bootstrap";
import "./AsideComponent.css";
import { dummyDataOne } from "../../utils/dummyData";

const AsideComponent = ({ title }) => {
  return (
    <div className="aside-page">
      <h4 className="title">{title}</h4>
      <Accordion flush>
        {dummyDataOne.map((data) => (
          <Accordion.Item eventKey={data.id} key={data.id}>
            <Accordion.Header className="accord-header">
              {data.title}
            </Accordion.Header>
            <Accordion.Body>
              <div className="content">{data.description}</div>
              <div className="show-detail-text">Show Details</div>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
};

export default AsideComponent;
