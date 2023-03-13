import Featured from '../../components/featured/Featured';
import FeaturedProperty from '../../components/featuredProperty/FeaturedProperty';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import Navbar from '../../components/navbar/Navbar';
import Newsletter from '../../components/newsletter/Newsletter';
import PropertyList from '../../components/propertyList/PropertyList';
import './home.scss';

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <div className='homeContainer'>
        <Featured />
        <div className='homeTitle'>
          <h2>Browse by property type</h2>
        </div>
        <PropertyList />
        <div className='homeTitle'>
          <h2>Homes guests love</h2>
        </div>
        <FeaturedProperty />
        <Newsletter />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
