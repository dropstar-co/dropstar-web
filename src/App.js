import { Switch } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./components/header/Header";
import MainFooter from "./pages/desktop-footer/MainFooter";
import NavigationBar from "./components/navigation-bar/NavigationBar";
import venlyHelpers from "./helpers/venly";
import Routes from "./Routes";
import { useDispatch } from "react-redux";
import { setUserProfile } from "./store/actions/user";

const App = () => {
  const dispatch = useDispatch();
  const [userAuth, setUserAuth] = useState(false);

  useEffect(() => {
    const gets = async () => {
      console.log("HERE 111111");
      const isAuth = await venlyHelpers.checkAuth();
      console.log("HERE 222222");
      setUserAuth(isAuth?.isAuthenticated);
      console.log("YES IS AUTH", isAuth?.isAuthenticated);
      dispatch(setUserProfile({ email: isAuth?.auth?.idTokenParsed?.email }));
      // dispatch(setUserAuth(isAuth.isAuthenticated));
      // dispatch(setUserAuth(true));
      localStorage.setItem("dstoken", isAuth.isAuthenticated);
    };
    gets();
  }, []);

  return (
    <div>
      <Header userIsAuthenticated={userAuth} />
      <NavigationBar userIsAuthenticated={userAuth} />
      <Switch>
        <Routes />
      </Switch>
      <div className="app-footer">
        <MainFooter />
      </div>
    </div>
  );
};

export default App;
