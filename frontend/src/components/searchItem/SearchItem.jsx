import { Link } from 'react-router-dom';
import './searchItem.scss';

const SearchItem = ({ item }) => {
  return (
    <div className='searchResultItem'>
      <img src={item.photos[0]} alt='Property' className='searchResultImg' />
      <div className='searchResultDescription'>
        <h1 className='searchResultTitle'>{item.name}</h1>
        <span className='searchResultDistance'>
          {item.distance}m from center
        </span>
        <span className='searchResultTaxi'>Free airport taxi</span>
        <span className='searchResultFeatures'>{item.description.substring(0, item.description.indexOf('.') + 1)}..</span>
        <span className='searchResultCancel'>Free cancellation </span>
        <span className='searchResultCancelSubtitle'>
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className='searchResultDetails'>
        {item.rating && (
          <div className='searchResultRating'>
            <span>Excellent</span>
            <div>{item.rating.$numberDecimal}</div>
          </div>
        )}
        <div className='searchResultDetailTexts'>
          <span className='searchResultPrice'>${item.cheapestPrice}</span>
          <span className='searchResultTax'>Includes taxes and fees</span>
          <Link to={`/hotels/${item._id}`}>
            <button className='searchResultCheckButton'>
              See availability
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
