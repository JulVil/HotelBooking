import useFetch from '../../hooks/useFetch';
import './featured.scss';

const Featured = () => {
  const { data, loading, error } = useFetch(
    'https://notbooking.onrender.com/api/hotels/countByCity?cities=dublin,helsinki,ibiza'
  );

  return (
    <div className='featured'>
      {loading ? (
        'Loading, please wait'
      ) : error ? (
        (console.log(error),
        `Can't get featuerd cities, please try again later`)
      ) : (
        <>
          <div className='featuredItem'>
            <img
              src='https://images.unsplash.com/photo-1549918864-48ac978761a4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
              alt='location'
              className='featuredImg'
            />
            <div className='featuredTitles'>
              <h1>Dublin</h1>
              <h2>{data[0]} Properties</h2>
            </div>
          </div>
          <div className='featuredItem'>
            <img
              src='https://images.unsplash.com/photo-1548188500-ab08449b26d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1164&q=80'
              alt='location'
              className='featuredImg'
            />
            <div className='featuredTitles'>
              <h1>Helsinki</h1>
              <h2>{data[1]} Properties</h2>
            </div>
          </div>
          <div className='featuredItem'>
            <img
              src='https://images.unsplash.com/photo-1596377940590-9ac8e3d22b79?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80'
              alt='location'
              className='featuredImg'
            />
            <div className='featuredTitles'>
              <h1>Ibiza</h1>
              <h2>{data[2]} Properties</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;
