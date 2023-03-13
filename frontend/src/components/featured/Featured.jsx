import './featured.scss';

const Featured = () => {
  return (
    <div className='featured'>
      <div className='featuredItem'>
        <img
          src='https://images.unsplash.com/photo-1549918864-48ac978761a4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
          alt='location'
          className='featuredImg'
        />
        <div className='featuredTitles'>
          <h1>Dublin</h1>
          <h2>168 Properties</h2>
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
          <h2>207 Properties</h2>
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
          <h2>348 Properties</h2>
        </div>
      </div>
    </div>
  );
};

export default Featured;
