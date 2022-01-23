import { Switch } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./components/header/Header";
import MainFooter from "./pages/desktop-footer/MainFooter";
import NavigationBar from "./components/navigation-bar/NavigationBar";
import venlyHelpers from "./helpers/venly";
import Routes from "./Routes";
import { useDispatch } from "react-redux";
import { setUserProfile } from "./store/actions/user";
import Loader from "./pages/Spinner";

const App = () => {
  const dispatch = useDispatch();
  const [userAuth, setUserAuth] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    const gets = async () => {
      console.log("HERE 111111");
      const isAuth = await venlyHelpers.checkAuth();
      console.log("HERE 222222");
      setUserAuth(isAuth?.isAuthenticated);

      console.log(await isAuth.auth && await venlyHelpers.loadProfile())
      // dispatch(setUserProfile({ email: isAuth?.auth?.idTokenParsed?.email }));

      isAuth && localStorage.setItem("dstoken", isAuth.isAuthenticated);
    };
    gets();
    setLoading(false)
    
  }, []);
  if(loading){
    return <Loader />
  }
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
