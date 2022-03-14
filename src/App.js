import { setUserAuthState, setUserProfile } from './store/actions/user';
import { useEffect, useState } from 'react';

import Header from './components/header/Header';
import Loader from './pages/Spinner';
import MainFooter from './pages/desktop-footer/MainFooter';
import NavigationBar from './components/navigation-bar/NavigationBar';
import Routes from './Routes';
import { Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import venlyHelpers from './helpers/venly';

const App = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const gets = async () => {
      const isAuth = await venlyHelpers.checkAuth();
      dispatch(setUserAuthState(isAuth?.isAuthenticated));
      dispatch(
        setUserProfile({
          email: isAuth?.auth?.idTokenParsed?.email,
          userId: isAuth?.auth?.idTokenParsed?.sub,
        }),
      );
      isAuth && localStorage.setItem('dstoken', isAuth?.isAuthenticated);
    };
    gets();
    setLoading(false);
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <div>
      <Header />
      <NavigationBar />
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
