import { Route, BrowserRouter as Router } from "react-router-dom";
import DiscoverPage from "./pages/discover/DiscoverPage";
import NFTDetailsPage from "./pages/nft-details/NFTDetailsPage";
import Profile from "./pages/profile/Profile";
import PrivateRoutes from "./components/private-routes";

const publicRoutes = (
  <>
    <Route exact path="/discover" component={DiscoverPage} />
  </>
);
const privateRoutes = (
  <>
    <PrivateRoutes path="/profile" component={Profile} />
    <PrivateRoutes path="/details/:ndfId" component={NFTDetailsPage} />
  </>
);

// const App = () => {
//   return (
//     <>
//       {privateRoutes}
//       {publicRoutes}
//     </>
//   );
// };

const Routes = () => {
  return (
    <>
    {privateRoutes}
    {publicRoutes}
    </>
  );
};

export default Routes;
