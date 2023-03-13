import './hotelList.scss';
import Navbar from '../../components/navbar/Navbar';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { format } from 'date-fns';
import { DateRange } from 'react-date-range';
import SearchItem from '../../components/searchItem/SearchItem';

const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  const [guestOptions, setGuestOptions] = useState(location.state.guestOptions);
  const [openGuestOptions, setOpenGuestOptions] = useState(false);
  const [openDate, setOpenDate] = useState(false);

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
                {`${format(date[0].startDate, 'dd/MM/yyyy')} to ${format(
                  date[0].endDate,
                  'dd/MM/yyyy'
                )}`}
              </span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDate([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={date}
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
                    Max price <small>{'(per night)'}</small>
                  </span>
                  <input
                    type='number'
                    min={0}
                    placeholder='0'
                    className='searchOptionInput'
                  />
                </div>
                <div className='searchOptionItem'>
                  <span className='searchOptionText'>
                    Min price <small>{'(per night)'}</small>
                  </span>
                  <input
                    type='number'
                    min={0}
                    placeholder='0'
                    className='searchOptionInput'
                  />
                </div>
              </div>
            </div>
            <button className='listSearchButton'>Search</button>
          </div>
          <div className='listResult'>
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
