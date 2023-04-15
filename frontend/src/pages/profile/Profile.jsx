import axios from 'axios';
import { useEffect, useState } from 'react';
import './profile.scss';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const roomIds = user.roomNumber;
  const [roomTypeData, setRoomTypeData] = useState([]);
  const joinedDate = user?.createdAt?.substring(0, 10);

  const [dataFetched, setDataFetched] = useState(false);
  const [roomCard, setRoomCard] = useState(false);
  const [roomMessage, setRoomMessage] = useState(true);
  const [updateCard, setUpdateCard] = useState(false);
  const [deleteCard, setDeleteCard] = useState(false);

  const navigate = useNavigate();

  const [updateUsername, setUpdateUsername] = useState('');
  const [updateEmail, setUpdateEmail] = useState('');
  const [updateCountry, setUpdateCountry] = useState('');
  const [updateCity, setUpdateCity] = useState('');
  const [updatePhone, setUpdatePhone] = useState('');

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
          setRoomCard(true);
          setRoomMessage(false);
        } catch (error) {
          console.log(error);
        }
      };

      getRoomTypes();
    }
  }, [roomIds, dataFetched]);

  const handleUpdate = async () => {
    const updatedUser = {};

    // Check which fields the user wants to update
    if (updateUsername !== '') {
      updatedUser.username = updateUsername;
    }

    if (updateEmail !== '') {
      updatedUser.email = updateEmail;
    }

    if (updateCountry !== '') {
      updatedUser.country = updateCountry;
    }

    if (updateCity !== '') {
      updatedUser.city = updateCity;
    }

    if (updatePhone !== '') {
      updatedUser.phone = updatePhone;
    }

    try {
      const response = await axios.put(`/users/${user._id}`, updatedUser);
      setUser(response.data);

      setUpdateCard(false);

      if (dataFetched) {
        setRoomMessage(false);
        setRoomCard(true);
      } else setRoomMessage(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/users/${user._id}`);
    } catch (error) {
      console.log(error);
    }
    localStorage.removeItem('user');
    navigate('/');
  };

  const cancelUpdate = () => {
    setDeleteCard(false);
    setUpdateCard(false);
    if (dataFetched) {
      setRoomMessage(false);
      setRoomCard(true);
    } else setRoomMessage(true);
  };

  const cancelDelete = () => {
    setUpdateCard(false);
    setDeleteCard(false);
    if (dataFetched) {
      setRoomMessage(false);
      setRoomCard(true);
    } else setRoomMessage(true);
  };

  const handleKeyPress = (event) => {
    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);

    // Allow only numbers
    if (!/^\d+$/.test(keyValue)) {
      event.preventDefault();
    }
  };

  const handleNavigate = () => {
    localStorage.setItem('user', JSON.stringify(user));
    navigate(-1);
  };

  return (
    <div className='profile'>
      <div className='profileContainer'>
        <div className='optionButtons'>
          <button
            className='profileButton'
            onClick={() => {
              setUpdateCard(true);
              setDeleteCard(false);
              setRoomCard(false);
              setRoomMessage(false);
            }}>
            Update Info
          </button>
          <button
            className='profileButton'
            onClick={() => {
              setDeleteCard(true);
              setUpdateCard(false);
              setRoomMessage(false);
              setRoomCard(false);
            }}>
            Delete Profile
          </button>
          <button className='profileButton' onClick={handleNavigate}>
            Back
          </button>
        </div>
        {deleteCard ? (
          <div className='deleteCard'>
            <div className='deleteMessage'>
              <h1>
                Are you sure you want to delete your account?
                <br />
                All information will be lost.
              </h1>
            </div>
            <div className='deleteButtons'>
              <button onClick={handleDelete}>Delete</button>
              <button onClick={cancelDelete}>Cancel</button>
            </div>
          </div>
        ) : updateCard ? (
          <div className='updateCard'>
            <h1 className='userInfo'>
              Please fill in the missing <br /> information
            </h1>
            <div className='nameAndField'>
              <span>Username:</span>
              <input
                type='text'
                onChange={(event) => setUpdateUsername(event.target.value)}
                placeholder={user.username}
              />
            </div>
            <div className='nameAndField'>
              <span>Email:</span>
              <input
                type='email'
                onChange={(event) => setUpdateEmail(event.target.value)}
                placeholder={user.email}
              />
            </div>
            <div className='nameAndField'>
              <span>Country:</span>
              <input
                type='text'
                onChange={(event) => setUpdateCountry(event.target.value)}
                placeholder={user.country}
              />
            </div>
            <div className='nameAndField'>
              <span>City:</span>
              <input
                type='text'
                onChange={(event) => setUpdateCity(event.target.value)}
                placeholder={user.city}
              />
            </div>
            <div className='nameAndField'>
              <span>Phone:</span>
              <input
                type='tel'
                maxLength={9}
                onKeyDown={handleKeyPress}
                onChange={(event) => setUpdatePhone(event.target.value)}
                placeholder={user.phone}
              />
            </div>
            <div className='updateButtons'>
              <button onClick={handleUpdate}>Accept</button>
              <button onClick={cancelUpdate}>Cancel</button>
            </div>
          </div>
        ) : (
          <div className='profileCard'>
            <h1 className='userInfo'>Your account information</h1>
            <div className='nameAndField'>
              <span>Username:</span>
              <span>{user.username}</span>
            </div>
            <div className='nameAndField'>
              <span>Email:</span>
              <span>{user.email}</span>
            </div>
            <div className='nameAndField'>
              <span>Joined:</span>
              <span>{joinedDate}</span>
            </div>
            <div className='nameAndField'>
              <span>Country:</span>
              <span>{user.country}</span>
            </div>
            <div className='nameAndField'>
              <span>City:</span>
              <span>{user.city}</span>
            </div>
            <div className='nameAndField'>
              <span>Phone:</span>
              <span>{user.phone}</span>
            </div>
          </div>
        )}
        {roomCard ? (
          <div className='roomsCard'>
            <h1 className='reservedRooms'>Your reserved rooms</h1>
            {roomTypeData.map((roomType) => (
              <div className='roomInfo' key={roomType._id}>
                <div className='nameAndField'>
                  <span>Room type:</span>
                  <span>{roomType.title}</span>
                </div>
                <div className='nameAndField'>
                  <span>Room description:</span>
                  <span style={{ whiteSpace: 'pre-line' }}>
                    {roomType.description}
                  </span>
                </div>
                <div className='nameAndField'>
                  <span>Max People:</span>
                  <span>{roomType.maxPeople}</span>
                </div>
                <div className='nameAndField'>
                  <span>Price:</span>
                  <span>{roomType.price}</span>
                </div>
                <br />
                <br />
              </div>
            ))}
          </div>
        ) : roomMessage ? (
          <div className='roomMessage'>{`You don't have any rooms reserved!`}</div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Profile;
