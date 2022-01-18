import { Route, Switch } from "react-router-dom";
import  { useEffect } from 'react'
import DiscoverPage from "./pages/discover/DiscoverPage";
import Header from "./components/header/Header";
import MainFooter from "./pages/desktop-footer/MainFooter";
import NFTDetailsPage from "./pages/nft-details/NFTDetailsPage";
import NavigationBar from "./components/navigation-bar/NavigationBar";
import Profile from "./pages/profile/Profile";
import venlyHelpers from "./helpers/venly";
import Routes from "./Routes";


const App = () => {
  // on the private route
  useEffect(() => {
    const gets = async () => {
      const isAuth = await venlyHelpers.checkAuth()
      console.log(isAuth.isAuthenticated)
      localStorage.setItem('dstoken',isAuth.isAuthenticated)
    }
    gets()
    
  }, [])
  return (
    <div>
      <Header />
      <NavigationBar />
      <Switch>
        <Routes />
        {/* <Route exact path="/discover" component={DiscoverPage} />
        <Route exact path="/details" component={NFTDetailsPage} />
        <Route exact path="/profile" component={Profile} /> */}
      </Switch>
      <div className="app-footer">
        <MainFooter />
      </div>
    </div>
  );
};

export default App;
