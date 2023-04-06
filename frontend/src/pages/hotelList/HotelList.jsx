import './hotelList.scss';
import Navbar from '../../components/navbar/Navbar';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { format } from 'date-fns';
import { DateRange } from 'react-date-range';
import SearchItem from '../../components/searchItem/SearchItem';
import useFetch from '../../hooks/useFetch';

const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [guestOptions, setGuestOptions] = useState(location.state.guestOptions);
  const [openGuestOptions, setOpenGuestOptions] = useState(false);
  const [openDate, setOpenDate] = useState(false);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  const { data, loading, error, reFetch } = useFetch(
    `/hotels?city=${destination}&min=${min || 0}&max=${max || 999}`
  );

  const handleOptionCounter = (name, operation) => {
    setGuestOptions((previous) => {
      return {
        ...previous,
        [name]:
          operation === 'plus'
            ? guestOptions[name] + 1
            : guestOptions[name] - 1,
      };
    });
  };

  const handleListSearch = () => {
    reFetch();
  };

  return (
    <div>
      <Navbar />
      <div className='listContainer'>
        <div className='listWrapper'>
          <div className='listSearch'>
            <h1 className='searchTitle'>Search</h1>
            <div className='searchItem'>
              <label htmlFor='searchInput'>Destination</label>
              <input
                id='searchInput'
                type='text'
                placeholder={destination}
                onChange={(event) => setDestination(event.target.value)}
              />
            </div>
            <div className='searchItem'>
              <label htmlFor='searchDate'>Check-in Date</label>
              <span id='searchDate' onClick={() => setOpenDate(!openDate)}>
                {`${format(dates[0].startDate, 'dd/MM/yyyy')} to ${format(
                  dates[0].endDate,
                  'dd/MM/yyyy'
                )}`}
              </span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDates([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={dates}
                  minDate={new Date()}
                  className='calendar'
                />
              )}
            </div>
            <div className='searchItem'>
              <div className='searchOptionBackground'>
                <span
                  className='searchOptionText'
                  onClick={() => setOpenGuestOptions(!openGuestOptions)}>
                  {`${guestOptions.adult} adult · 
                      ${guestOptions.children} children · 
                      ${guestOptions.room} room`}
                </span>
              </div>
              {openGuestOptions && (
                <div className='guestOptionsMenu'>
                  <div className='guestOptionItem'>
                    <span className='guestOptionText'>Adult</span>
                    <div className='counterContainer'>
                      <button
                        disabled={guestOptions.adult <= 1}
                        className='counterButton'
                        onClick={() => handleOptionCounter('adult', 'minus')}>
                        -
                      </button>
                      <span className='guestOptionCounter'>
                        {guestOptions.adult}
                      </span>
                      <button
                        className='counterButton'
                        onClick={() => handleOptionCounter('adult', 'plus')}>
                        +
                      </button>
                    </div>
                  </div>
                  <div className='guestOptionItem'>
                    <span className='guestOptionText'>Children</span>
                    <div className='counterContainer'>
                      <button
                        disabled={guestOptions.children <= 0}
                        className='counterButton'
                        onClick={() =>
                          handleOptionCounter('children', 'minus')
                        }>
                        -
                      </button>
                      <span className='guestOptionCounter'>
                        {guestOptions.children}
                      </span>
                      <button
                        className='counterButton'
                        onClick={() => handleOptionCounter('children', 'plus')}>
                        +
                      </button>
                    </div>
                  </div>
                  <div className='guestOptionItem'>
                    <span className='guestOptionText'>Room</span>
                    <div className='counterContainer'>
                      <button
                        disabled={guestOptions.room <= 1}
                        className='counterButton'
                        onClick={() => handleOptionCounter('room', 'minus')}>
                        -
                      </button>
                      <span className='guestOptionCounter'>
                        {guestOptions.room}
                      </span>
                      <button
                        className='counterButton'
                        onClick={() => handleOptionCounter('room', 'plus')}>
                        +
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className='searchItem'>
              <label>Options</label>
              <div className='searchOptions'>
                <div className='searchOptionItem'>
                  <span className='searchOptionText'>
                    Min price <small>{'(per night)'}</small>
                  </span>
                  <input
                    onChange={(event) => setMin(event.target.value)}
                    type='number'
                    min={0}
                    placeholder='0'
                    className='searchOptionInput'
                  />
                </div>
                <div className='searchOptionItem'>
                  <span className='searchOptionText'>
                    Max price <small>{'(per night)'}</small>
                  </span>
                  <input
                    onChange={(event) => setMax(event.target.value)}
                    type='number'
                    min={0}
                    placeholder='0'
                    className='searchOptionInput'
                  />
                </div>
              </div>
            </div>
            <button onClick={handleListSearch} className='listSearchButton'>
              Search
            </button>
          </div>
          <div className='listResult'>
            {loading ? (
              'Loading, please wait'
            ) : error ? (
              (console.log(error),
              `Can't get search results, please try again later`)
            ) : (
              <>
                {data.map((item) => {
                  return <SearchItem item={item} key={item._id} />;
                })}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
