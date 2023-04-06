import axios from 'axios';
import { useEffect, useState } from 'react';
// import useFetch from '../../hooks/useFetch';
import './profile.scss';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const roomIds = user.roomNumber;
  const [roomTypeData, setRoomTypeData] = useState([]);
  const joinedDate = user?.createdAt?.substring(0, 10);
  const [dataFetched, setDataFetched] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    //check if the user has rooms reserved and if the data as already been fetched
    if (roomIds.length && !dataFetched) {
      const getRoomTypes = async () => {
        try {
          //uses the roomNumber id to fetch the parent room id
          const roomTypeId = await Promise.all(
            roomIds.map((roomId) => axios.get(`/rooms/roomType/${roomId}`))
          );

          //maps throught the response to have a new array with only the ids as strings
          const mainRoomIds = roomTypeId.map(
            (mainRoomId) => mainRoomId.data._id
          );

          //create an empty array to store the ids without duplicate
          const uniqueRoomIds = [];

          //loop throught the id array of strings, check if the id is included in the new array
          //if it's not, push it to the uniqueRoomId, if it already exists, don't add it 
          mainRoomIds.forEach((roomId) => {
            const isNewId = !uniqueRoomIds.includes(roomId);

            if (isNewId) {
              uniqueRoomIds.push(roomId);
            }
          });

          //with the new array of ids, get the room info and set it in state to use it in the card later
          const roomTypes = await Promise.all(
            uniqueRoomIds.map((response) => axios.get(`/rooms/${response}`))
          );
          setRoomTypeData(roomTypes.map((response) => response.data));
          setDataFetched(true);
        } catch (error) {
          console.log(error);
        }
      };

      getRoomTypes();
    }
  }, [roomIds, dataFetched]);

  const handleNavigate = () => {
    navigate(-1);
  };

  return (
    <div className='profile'>
      <div className='profileContainer'>
        <div className='profileCard'>
          <h1 className='userInfo'>Your account information</h1>
          <span className='username'>
            <u>Username:</u> {user.username}
          </span>
          <span className='email'>
            <u>Email:</u> {user.email}
          </span>
          <span className='created'>
            <u>Joined:</u> {joinedDate}
          </span>
          <span className='country'>
            <u>Country:</u>{' '}
          </span>
          <span className='city'>
            <u>City:</u>{' '}
          </span>
          <span className='phone'>
            <u>Phone:</u>{' '}
          </span>
        </div>
        <button className='backButton' onClick={handleNavigate}>
          Back
        </button>
        {roomTypeData.length ? (
          <div className='roomsCard'>
            <h1 className='reservedRooms'>Your reserved rooms</h1>
            {roomTypeData.map((roomType) => (
              <div className='roomInfo' key={roomType._id}>
                <span className='roomTitle'>
                  <u>Room type:</u> {roomType.title}
                </span>
                <span className='roomDescription'>
                  <u>Room description:</u> {roomType.description}
                </span>
                <span className='roomMaxPeople'>
                  <u>Max People:</u> {roomType.maxPeople}
                </span>
                <span className='roomPrice'>
                  <u>Price:</u> {roomType.price}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div>{`You don't have any rooms reserved!`}</div>
        )}
      </div>
    </div>
  );
};

export default Profile;
