import { Route } from "react-router-dom";
import DiscoverPage from "./pages/discover/DiscoverPage";
import NFTDetailsPage from "./pages/nft-details/NFTDetailsPage";
import Profile from "./pages/profile/Profile";
import PrivateRoutes from "./components/private-routes";

const publicRoutes = (
  <>
    <Route exact path="/discover" component={DiscoverPage} />
    <Route exact path="/nfts/:nftsId" component={NFTDetailsPage} />
  </>
);
const privateRoutes = (
  <>
    <PrivateRoutes exact path="/profile" component={Profile} />
  </>
);

const Routes = () => {
  return (
    <>
      {privateRoutes}
      {publicRoutes}
    </>
  );
};

export default Routes;
