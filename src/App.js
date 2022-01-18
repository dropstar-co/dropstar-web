import { Route, Switch } from "react-router-dom";

import DiscoverPage from "./pages/discover/DiscoverPage";
import Header from "./components/header/Header";
import MainFooter from "./pages/desktop-footer/MainFooter";
import NFTDetailsPage from "./pages/nft-details/NFTDetailsPage";
import NavigationBar from "./components/navigation-bar/NavigationBar";
import Profile from "./pages/profile/Profile";

const App = () => {
  return (
    <div>
      <Header />
      <NavigationBar />
      <Switch>
        <Route exact path="/discover" component={DiscoverPage} />
        <Route exact path="/details" component={NFTDetailsPage} />
        <Route exact path="/profile" component={Profile} />
      </Switch>
      <div className="app-footer">
        <MainFooter />
      </div>
    </div>
  );
};

export default App;
