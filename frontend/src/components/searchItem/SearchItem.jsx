import './searchItem.scss';

const SearchItem = () => {
  return (
    <div className='searchResultItem'>
      <img
        src='https://cf.bstatic.com/xdata/images/hotel/square600/261707778.webp?k=fa6b6128468ec15e81f7d076b6f2473fa3a80c255582f155cae35f9edbffdd78&o=&s=1'
        alt='Property'
        className='searchResultImg'
      />
      <div className='searchResultDescription'>
        <h1 className='searchResultTitle'>Tower Street Apartments</h1>
        <span className='searchResultDistance'>500m from center</span>
        <span className='searchResultTaxi'>Free airport taxi</span>
        <span className='searchResultSubtitle'>
          Studio Apartment with Air conditioning
        </span>
        <span className='searchResultFeatures'>
          Entire studio • 1 bathroom • 21m² 1 full bed
        </span>
        <span className='searchResultCancel'>Free cancellation </span>
        <span className='searchResultCancelSubtitle'>
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className='searchResultDetails'>
        <div className='searchResultRating'>
          <span>Excellent</span>
          <div>8.9</div>
        </div>
        <div className='searchResultDetailTexts'>
          <span className='searchResultPrice'>$112</span>
          <span className='searchResultTax'>Includes taxes and fees</span>
          <button className='searchResultCheckButton'>See availability</button>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
