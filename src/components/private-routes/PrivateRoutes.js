import { Redirect, Route } from "react-router-dom";
import { getUserAuthState, getUserProfile } from "../../store/selectors/user";
import { useDispatch, useSelector } from "react-redux";

// ../../store/selectors/user
const PrivateRoutes = ({ component: Component, ...rest }) => {
  console.log(localStorage.getItem("dstoken"))
  const isUserAuthenticated = useSelector(getUserAuthState);
  console.log(isUserAuthenticated,"here")
  return (
    <Route
      {...rest}
      render={(props) =>
        isUserAuthenticated === true ? (
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
