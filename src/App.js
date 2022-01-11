import NavigationBar from './components/navigation-bar/NavigationBar';
import Header from './components/header/Header';
import DiscoverPage from './pages/discover/DiscoverPage';
import MainFooter from './pages/desktop-footer/MainFooter';

const App = () => {
  return (
    <div>
      <Header />
      <NavigationBar />
      <br />
      <DiscoverPage />
      <div className='app-footer'>
        <MainFooter />
      </div>
    </div>
  );
}

export default App;
