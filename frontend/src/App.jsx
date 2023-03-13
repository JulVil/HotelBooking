import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import HotelList from './pages/hotelList/HotelList';
import SingleHotel from './pages/singleHotel/SingleHotel';
import './App.scss';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/hotels' element={<HotelList />} />
        <Route path='/hotels/:id' element={<SingleHotel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
