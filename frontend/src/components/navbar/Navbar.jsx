import './navbar.scss';
import { Link, useNavigate } from 'react-router-dom';
import HotelIcon from '@mui/icons-material/Hotel';
import FlightIcon from '@mui/icons-material/Flight';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AttractionsIcon from '@mui/icons-material/Attractions';
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/authContext';

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const [username, setUsername] = useState('');

  useEffect(() => {
    if (user) {
      const updatedUser = JSON.parse(localStorage.getItem('user'));
      if (updatedUser) setUsername(updatedUser.username);
    }
  }, [user]);

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  const handleProfile = () => {
    navigate('/profile');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.reload();
  };

  return (
    <div className='navbar'>
      <div className='navContainer'>
        <div className='navTop'>
          <div className='navbarOptions'>
            <Link to={'/'} style={{ color: 'inherit', textDecoration: 'none' }}>
              <span className='logo'>NOTBOOKING</span>
            </Link>
            {username ? (
              <div className='user'>
                <span>{username}</span>
                <button className='userButton' onClick={handleProfile}>
                  Profile
                </button>
                <button className='userButton' onClick={handleLogout}>
                  Logout
                </button>
              </div>
            ) : (
              <div className='navItems'>
                <button className='navButton' onClick={handleRegister}>
                  Register
                </button>
                <button className='navButton' onClick={handleLogin}>
                  Sign in
                </button>
              </div>
            )}
          </div>
        </div>
        <div className='navBottom'>
          <ul className='navbarList'>
            <li className='navbarListItem active'>
              <HotelIcon />
              <span>Stays</span>
            </li>
            <li className='navbarListItem'>
              <FlightIcon />
              <span>Flights</span>
            </li>
            <li className='navbarListItem'>
              <DirectionsCarIcon />
              <span>Car rentals</span>
            </li>
            <li className='navbarListItem'>
              <AttractionsIcon />
              <span>Attractions</span>
            </li>
            <li className='navbarListItem'>
              <LocalTaxiIcon />
              <span>Airport taxis</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
