import DiscoverPage from './pages/discover/DiscoverPage';
import NFTDetailsPage from './pages/nft-details/NFTDetailsPage';
import PrivateRoutes from './components/private-routes';
import LoginIssuePage from './pages/login-issue/LoginIssuePage';
import Profile from './pages/profile/Profile';
import { Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setVenlyParams } from './store/actions/venly';
import { useEffect } from 'react';

import venlyHelpers from './helpers/venly';

const publicRoutes = (
  <>
    <Route exact path="/discover" component={DiscoverPage} />
    <Route exact path="/nfts/:nftsId" component={NFTDetailsPage} />
    <Route exact path="/login-issue" component={LoginIssuePage} />
  </>
);
const privateRoutes = (
  <>
    <PrivateRoutes exact path="/profile" component={Profile} />
  </>
);

const Routes = props => {
  const dispatch = useDispatch();

  console.log('Routes re rendered');

  useEffect(() => {
    async function doIt() {
      const a = await venlyHelpers.checkAuth();
      console.log({ a });
    }
    doIt();
  }, []);

  const { venlyParams } = props;
  if (venlyParams === undefined || venlyParams.state === undefined) {
    const hash = props.location.hash;
    if (hash !== '') {
      const splitsRaw = hash.substring(1).split('&');
      let venlyParams = {};
      splitsRaw.map(element => {
        const [attribute, value] = element.split('=');
        venlyParams[attribute] = value;
      });

      console.log('Setting venly params ' + JSON.stringify(venlyParams));

      dispatch(setVenlyParams(venlyParams));
    }
  }

  return (
    <>
      {publicRoutes}
      {privateRoutes}
    </>
  );
};

export default Routes;
