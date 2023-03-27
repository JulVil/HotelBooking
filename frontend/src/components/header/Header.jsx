import './header.scss';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import BedOutlinedIcon from '@mui/icons-material/BedOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { format } from 'date-fns';
import { DateRange } from 'react-date-range';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../../context/searchContext';

const Header = () => {
  const [destination, setDestination] = useState('');
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);
  const [openGuestOptions, setOpenGuestOptions] = useState(false);
  const [guestOptions, setGuestOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const { dispatch } = useContext(SearchContext);

  const navigate = useNavigate();

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

  const handleInputChange = (event) => {
    setDestination(event.target.value);
  };

  const handleSearch = () => {
    const startDate = dates[0].startDate;
    const endDate = dates[0].endDate;
    const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;

    if (startDate === endDate) {
      alert('Please select two different dates.');
    } else if (Math.abs(endDate - startDate) < MILLISECONDS_PER_DAY) {
      alert('Please select a range of at least two days.');
    } else {
      dispatch({
        type: 'NEW_SEARCH',
        payload: { destination, dates, options: guestOptions },
      });
      navigate('/hotels', { state: { destination, dates, guestOptions } });
    }
  };

  return (
    <div className='header'>
      <div className='headerContainer'>
        <div className='titleContainer'>
          <h1 className='headerTitle'>Find your next stay</h1>
          <p className='headerDescription'>
            Search low prices on hotels, homes and much more...
          </p>
        </div>
        <div className='searchBarContainer'>
          <div className='headerSearch'>
            <div className='headerSearchItem'>
              <BedOutlinedIcon className='headerIcon' />
              <input
                required
                type='text'
                placeholder='Where are you going?'
                onChange={handleInputChange}
              />
            </div>
            <div className='headerSearchItem'>
              <CalendarMonthOutlinedIcon className='headerIcon' />
              <span
                onClick={() => setOpenDate(!openDate)}
                className='headerSearchText'>
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
            <div className='headerSearchItem'>
              <PersonOutlineOutlinedIcon className='headerIcon' />
              <span
                className='headerSearchText'
                onClick={() => setOpenGuestOptions(!openGuestOptions)}>
                {`${guestOptions.adult} adult · 
                ${guestOptions.children} children · 
                ${guestOptions.room} room`}
              </span>
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
            <div className='headerSearchItemButton'>
              <button className='headerSearchButton' onClick={handleSearch}>
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
