import { Redirect, Route } from "react-router-dom";

const PrivateRoutes = ({ component: Component, ...rest }) => {
  console.log("I am rendering")
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem("dstoken") ? (
          <Component {...props} />
        ) : (
          <Redirect
            to="/discover"
          />
        )
      }
    />
  );
};

export default PrivateRoutes;
