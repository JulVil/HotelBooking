import './navbar.scss';
import HotelIcon from '@mui/icons-material/Hotel';
import FlightIcon from '@mui/icons-material/Flight';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AttractionsIcon from '@mui/icons-material/Attractions';
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='navContainer'>
        <div className='navTop'>
          <div className='navbarOptions'>
            <span className='logo'>NOTBOOKING</span>
            <div className='navItems'>
              <button className='navButton'>Register</button>
              <button className='navButton'>Sign in</button>
            </div>
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
