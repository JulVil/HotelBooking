import './bookRooms.scss';
import CancelIcon from '@mui/icons-material/Cancel';
import useFetch from '../../hooks/useFetch';
import { useContext, useState, useEffect } from 'react';
import { SearchContext } from '../../context/searchContext';
import axios from 'axios';

const BookRooms = ({ setOpenRooms, hotelId }) => {
  const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`);
  const { dates } = useContext(SearchContext);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const userInfo = JSON.parse(localStorage.getItem('user'));
  const userId = userInfo._id;

  console.log(userId);
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
    localStorage.setItem('dateRange', JSON.stringify(dateRange));
  }, [dateRange]);

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
          const res = axios.put(`/rooms/availability/${roomId}`, {
            dates: dateRange,
          });
          return res.data;
        })
      );

      await axios.put(`/users/reserved/${userId}`, {
        roomNumber: selectedRooms,
      });

      const updatedUser = await axios.get(`/users/${userId}`);
      localStorage.setItem('user', JSON.stringify(updatedUser.data));

      setOpenRooms(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {loading ? (
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
          </div>
        </div>
      )}
    </div>
  );
};

export default BookRooms;
