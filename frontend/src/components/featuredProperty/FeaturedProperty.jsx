import useFetch from '../../hooks/useFetch';
import './featuredProperty.scss';

const FeaturedProperty = () => {
  const { data, loading, error } = useFetch('https://notbooking.onrender.com/hotels?featured=true&limit=4');

  return (
    <div className='featuredProperty'>
      {loading ? (
        'Loading, please wait'
      ) : error ? (
        (console.log(error),
        `Can't get Rated Properties, please try again later`)
      ) : (
        <>
          {data.map((item) => (
            <div className='featuredPropertyItem' key={item._id}>
              <img
                src={item.photos[0]}
                alt='Property'
                className='featuredPropertyImg'
              />
              <span className='name'>{item.name}</span>
              <span className='city'>{item.city}</span>
              <span className='price'>Starting from ${item.cheapestPrice}</span>
              {item.rating && (
                <div className='featuredPropertyRating'>
                  <div>{item.rating.$numberDecimal}</div>
                  <span>Excellent</span>
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default FeaturedProperty;
