import { Redirect, Route } from "react-router-dom";

const PrivateRoutes = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        
        localStorage.getItem("dstoken") === true ? (
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
