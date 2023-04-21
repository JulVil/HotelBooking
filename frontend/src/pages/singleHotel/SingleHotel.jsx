import './singleHotel.scss';
import Navbar from '../../components/navbar/Navbar';
import Newsletter from '../../components/newsletter/Newsletter';
import Footer from '../../components/footer/Footer';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import CancelIcon from '@mui/icons-material/Cancel';
import useFetch from '../../hooks/useFetch';
import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SearchContext } from '../../context/searchContext';
import { AuthContext } from '../../context/authContext';
import BookRooms from '../../components/bookRooms/BookRooms';

const HotelSingle = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [openSlider, setOpenSlider] = useState(false);
  const [openRooms, setOpenRooms] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { dates, options } = useContext(SearchContext);
  const { data, loading, error } = useFetch(
    `https://notbooking.onrender.com/hotels/find/${id}`
  );

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  const stayDays = dayDifference(dates[0]?.endDate, dates[0]?.startDate);

  function dayDifference(date1, date2) {
    if (
      !date1 ||
      !date2 ||
      !(date1 instanceof Date) ||
      !(date2 instanceof Date)
    ) {
      const storedDates = localStorage.getItem('dates');
      return storedDates ? JSON.parse(storedDates) : null;
    }
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  useEffect(() => {
    localStorage.setItem('dates', JSON.stringify(stayDays));
  }, [stayDays]);

  const handleSliders = (index) => {
    setSlideIndex(index);
    setOpenSlider(true);
  };

  const handleSliderMove = (direction) => {
    let newSlideIndex;
    let lastSlide = data.photos.length - 1;

    if (direction === 'left') {
      newSlideIndex = slideIndex === 0 ? lastSlide : slideIndex - 1;
    } else {
      newSlideIndex = slideIndex === lastSlide ? 0 : slideIndex + 1;
    }

    setSlideIndex(newSlideIndex);
  };

  const handleReserve = () => {
    if (user) {
      setOpenRooms(true);
    } else {
      navigate('/login');
    }
  };

  return (
    <div>
      <Navbar />
      {loading ? (
        'Loading, please wait'
      ) : error ? (
        (console.log(error), `Can't get hotel info, please try again later`)
      ) : (
        <div className='singleHotelContainer'>
          {openSlider && (
            <div className='imageSlider'>
              <CancelIcon
                className='sliderCloseButton'
                onClick={() => setOpenSlider(false)}
              />
              <ArrowCircleLeftIcon
                className='sliderArrow'
                onClick={() => handleSliderMove('left')}
              />
              <div className='imageSliderWrapper'>
                <img
                  src={data.photos[slideIndex]}
                  alt='Property'
                  className='sliderImage'
                />
              </div>
              <ArrowCircleRightIcon
                className='sliderArrow'
                onClick={() => handleSliderMove('right')}
              />
            </div>
          )}
          <div className='singleHotelWrapper'>
            <button className='bookNowButton' onClick={handleReserve}>
              Reserve or Book Now!
            </button>
            <h1 className='singleHotelTitle'>{data.name}</h1>
            <div className='singleHotelAddress'>
              <LocationOnIcon />
              <span>{data.address}</span>
            </div>
            <span className='singleHotelDistance'>
              Excellent location - {data.distance}m from center
            </span>
            <span className='singleHotelPriceHighlight'>
              Book a stay over ${data.cheapestPrice} at this property and get a
              free airport taxi
            </span>
            <div className='singleHotelImages'>
              {data.photos?.map((photo, index) => (
                <div className='singleHotelImgWrapper' key={index}>
                  <img
                    onClick={() => handleSliders(index)}
                    src={photo}
                    alt='Property'
                    className='singleHotelImg'
                  />
                </div>
              ))}
            </div>
            <div className='singleHotelDetails'>
              <div className='singleHotelDetailsTexts'>
                <h1 className='singleHotelTitle'>{data.title}</h1>
                {/* This regular expression uses negative lookbehind (?<!) and negative lookahead (?!) assertions 
                to match periods that are not part of an abbreviation.
                 Specifically, it matches a period that is not preceded by a word boundary and a capital letter 
                 followed by one or two lowercase letters 
                 (which should match most common abbreviations), and not followed by a space and a lowercase letter. */}
                {data?.description &&
                  data.description
                    .split(/(?<!\b[A-Z][a-z]{1,2})\.(?!\s[a-z])/)
                    .map((sentence, index) => (
                      <p key={index} className='singleHotelDescription'>
                        {sentence}.
                      </p>
                    ))}
              </div>
              <div className='singleHotelDetailsPrice'>
                <h1>Perfect for a {stayDays}-night stay!</h1>
                <span>
                  located in the real heart of {data.city}, this property has an
                  excellent location score of{' '}
                  <b>{data.rating?.$numberDecimal}</b>!
                </span>
                <h2>
                  <b>${stayDays * data.cheapestPrice * options.room}</b> (
                  {stayDays} nights, {options.room} rooms)
                </h2>
                <button onClick={handleReserve}>Reserve of Book now!</button>
              </div>
            </div>
          </div>
          <Newsletter />
          <Footer />
        </div>
      )}
      {openRooms && <BookRooms setOpenRooms={setOpenRooms} hotelId={id} />}
    </div>
  );
};

export default HotelSingle;
