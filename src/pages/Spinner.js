import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <div className="text-center" style={{marginTop: "10rem"}}>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      <div>Loading...</div>
    </div>
  );
};
export default Loader;
