import './bookRooms.scss';
import CancelIcon from '@mui/icons-material/Cancel';
import useFetch from '../../hooks/useFetch';
import { useContext, useState, useEffect } from 'react';
import { SearchContext } from '../../context/searchContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookRooms = ({ setOpenRooms, hotelId }) => {
  const { data, loading, error } = useFetch(
    `https://notbooking.onrender.com/hotels/room/${hotelId}`
  );
  const { dates } = useContext(SearchContext);
  const navigate = useNavigate();
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const userInfo = JSON.parse(localStorage.getItem('user'));
  const userId = userInfo ? userInfo._id : null;

  //uses the room id when a box is checked in seleceted rooms to know which ones will be unavailable
  const handleSelected = (event) => {
    const available = event.target.checked;
    const value = event.target.value;
    setSelectedRooms(
      available
        ? [...selectedRooms, value]
        : selectedRooms.filter((room) => room !== value)
    );
  };

  const RangeOfDates = (startDate, endDate) => {
    if (
      !startDate ||
      !endDate ||
      !(startDate instanceof Date) ||
      !(endDate instanceof Date)
    ) {
      const storedDates = localStorage.getItem('dateRange');
      return storedDates ? JSON.parse(storedDates) : null;
    }
    //Create a new start date to get the timestamp(miliseconds) instead of the object format
    const newStartDate = new Date(startDate.getTime());
    const dateList = [];

    while (newStartDate <= endDate) {
      // Push the timestamp(miliseconds) of the current date into the dateList array
      dateList.push(new Date(newStartDate).getTime());
      // Adds a day to the date so the loop can reach the endDate
      newStartDate.setDate(newStartDate.getDate() + 1);
    }

    return dateList;
  };

  const dateRange = RangeOfDates(dates[0].startDate, dates[0].endDate);

  useEffect(() => {
    if (!userId) {
      // Redirect the user to the login page or display an error message
      navigate('/login');
    }
    localStorage.setItem('dateRange', JSON.stringify(dateRange));
  }, [dateRange, navigate, userId]);

  const roomAvailability = (roomNumber) => {
    const isReserved = roomNumber.unavailableDates.some((date) =>
      dateRange.includes(new Date(date).getTime())
    );

    return !isReserved;
  };

  const handleReserve = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(
            `https://notbooking.onrender.com/rooms/availability/${roomId}`,
            {
              dates: dateRange,
            }
          );
          return res.data;
        })
      );

      await axios.put(
        `https://notbooking.onrender.com/users/reserved/${userId}`,
        {
          roomNumber: selectedRooms,
        }
      );

      const updatedUser = await axios.get(
        `https://notbooking.onrender.com/users/${userId}`
      );
      localStorage.setItem('user', JSON.stringify(updatedUser.data));

      setShowMessage(true);
      setTimeout(() => setOpenRooms(false), 4000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {userId && loading ? (
        'Loading, please wait'
      ) : error ? (
        (console.log(error), `Can't get room info, please try again later`)
      ) : (
        <div className='bookRooms'>
          <div className='bookRoomsContainer'>
            <CancelIcon
              className='roomsClose'
              onClick={() => setOpenRooms(false)}
            />
            <span>Select your rooms:</span>
            {data.map((room) => (
              <div className='room' key={room._id}>
                <div className='roomInfo'>
                  <div className='roomTitle'>{room.title}</div>
                  <div className='roomDescription'>{room.description}</div>
                  <div className='roomMaxPeople'>
                    Max people: {room.maxPeople}
                  </div>
                  <div className='roomPrice'>$ {room.price}</div>
                </div>
                <div className='selectedRooms'>
                  {room.roomNumbers.map((roomNumber) => (
                    <div className='roomNumbers' key={roomNumber._id}>
                      <label>{roomNumber.number}</label>
                      <input
                        type='checkbox'
                        value={roomNumber._id}
                        onChange={handleSelected}
                        disabled={!roomAvailability(roomNumber)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <button className='reserveButton' onClick={handleReserve}>
              Reserve Now!
            </button>
            {showMessage && <div className='infoMessage'>Rooms reserved, thank you!<br/>Room info is in your profile</div>}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookRooms;
