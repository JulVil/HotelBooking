import './featuredProperty.scss';

const FeaturedProperty = () => {
  return (
    <div className='featuredProperty'>
      <div className='featuredPropertyItem'>
        <img
          src='https://cf.bstatic.com/xdata/images/hotel/square600/13125860.webp?k=e148feeb802ac3d28d1391dad9e4cf1e12d9231f897d0b53ca067bde8a9d3355&o=&s=1'
          alt='Property'
          className='featuredPropertyImg'
        />
        <span className='name'>Aparthotel Stare Miasto</span>
        <span className='city'>Madrid</span>
        <span className='price'>Starting from $120</span>
        <div className='featuredPropertyRating'>
          <div>8.9</div>
          <span>Excellent</span>
        </div>
      </div>
      <div className='featuredPropertyItem'>
        <img
          src='https://cf.bstatic.com/xdata/images/hotel/max1280x900/215955381.jpg?k=ff739d1d9e0c8e233f78ee3ced82743ef0355e925df8db7135d83b55a00ca07a&o=&hp=1'
          alt='Property'
          className='featuredPropertyImg'
        />
        <span className='name'>Comfort Suites Airport</span>
        <span className='city'>Austin</span>
        <span className='price'>Starting from $140</span>
        <div className='featuredPropertyRating'>
          <div>9.3</div>
          <span>Exceptional</span>
        </div>
      </div>
      <div className='featuredPropertyItem'>
        <img
          src='https://cf.bstatic.com/xdata/images/hotel/max1024x768/29466559.jpg?k=b3095a515f3708329790eabd5b1655ba893df25c382ad5000811c648936d185a&o=&hp=1    '
          alt='Property'
          className='featuredPropertyImg'
        />
        <span className='name'>Four Seasons Hotel</span>
        <span className='city'>Lisbon</span>
        <span className='price'>Starting from $99</span>
        <div className='featuredPropertyRating'>
          <div>8.8</div>
          <span>Excellent</span>
        </div>
      </div>
      <div className='featuredPropertyItem'>
        <img
          src='https://cf.bstatic.com/xdata/images/hotel/max1280x900/322658536.jpg?k=3fffe63a365fd0ccdc59210188e55188cdb7448b9ec1ddb71b0843172138ec07&o=&hp=1'
          alt='Property'
          className='featuredPropertyImg'
        />
        <span className='name'>Hilton Graden Inn</span>
        <span className='city'>Berlin</span>
        <span className='price'>Starting from $105</span>
        <div className='featuredPropertyRating'>
          <div>8.3</div>
          <span>Very Good</span>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProperty;
