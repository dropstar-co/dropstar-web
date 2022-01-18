import { Redirect, Route } from "react-router-dom";

const PrivateRoutes = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem("dstoken") ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/discover", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default PrivateRoutes;
