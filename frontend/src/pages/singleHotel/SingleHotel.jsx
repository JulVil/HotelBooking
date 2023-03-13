import './singleHotel.scss';
import Navbar from '../../components/navbar/Navbar';
import Newsletter from '../../components/newsletter/Newsletter';
import Footer from '../../components/footer/Footer';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import CancelIcon from '@mui/icons-material/Cancel';
import { useState } from 'react';

const photos = [
  {
    src: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707778.jpg?k=56ba0babbcbbfeb3d3e911728831dcbc390ed2cb16c51d88159f82bf751d04c6&o=&hp=1',
  },
  {
    src: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707367.jpg?k=cbacfdeb8404af56a1a94812575d96f6b80f6740fd491d02c6fc3912a16d8757&o=&hp=1',
  },
  {
    src: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708745.jpg?k=1aae4678d645c63e0d90cdae8127b15f1e3232d4739bdf387a6578dc3b14bdfd&o=&hp=1',
  },
  {
    src: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707776.jpg?k=054bb3e27c9e58d3bb1110349eb5e6e24dacd53fbb0316b9e2519b2bf3c520ae&o=&hp=1',
  },
  {
    src: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708693.jpg?k=ea210b4fa329fe302eab55dd9818c0571afba2abd2225ca3a36457f9afa74e94&o=&hp=1',
  },
  {
    src: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707389.jpg?k=52156673f9eb6d5d99d3eed9386491a0465ce6f3b995f005ac71abc192dd5827&o=&hp=1',
  },
];

const HotelSingle = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [openSlider, setOpenSlider] = useState(false);

  const handleSliders = (index) => {
    setSlideIndex(index);
    setOpenSlider(true);
  };

  const handleSliderMove = (direction) => {
    let newSlideIndex;
    let lastSlide = photos.length - 1;

    if (direction === 'left') {
      newSlideIndex = slideIndex === 0 ? lastSlide : slideIndex - 1;
    } else {
      newSlideIndex = slideIndex === lastSlide ? 0 : slideIndex + 1;
    }

    setSlideIndex(newSlideIndex);
  };

  return (
    <div>
      <Navbar />
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
                src={photos[slideIndex].src}
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
          <button className='bookNowButton'>Reserve or Book Now!</button>
          <h1 className='singleHotelTitle'>Tower Street Apartments</h1>
          <div className='singleHotelAddress'>
            <LocationOnIcon />
            <span>Elton St 125 New York</span>
          </div>
          <span className='singleHotelDistance'>
            Excellent location - 500m from center
          </span>
          <span className='singleHotelPriceHighlight'>
            Book a stay over $114 at this property and get a free airport taxi
          </span>
          <div className='singleHotelImages'>
            {photos.map((photo, index) => (
              <div className='singleHotelImgWrapper' key={index}>
                <img
                  onClick={() => handleSliders(index)}
                  src={photo.src}
                  alt='Property'
                  className='singleHotelImg'
                />
              </div>
            ))}
          </div>
          <div className='singleHotelDetails'>
            <div className='singleHotelDetailsTexts'>
              <h1 className='singleHotelTitle'>Stay in the heart of City</h1>
              <p className='singleHotelDescription'>
                Located a 5-minute walk from St. Florian's Gate in Krakow, Tower
                Street Apartments has accommodations with air conditioning and
                free WiFi. The units come with hardwood floors and feature a
                fully equipped kitchenette with a microwave, a flat-screen TV,
                and a private bathroom with shower and a hairdryer. A fridge is
                also offered, as well as an electric tea pot and a coffee
                machine. Popular points of interest near the apartment include
                Cloth Hall, Main Market Square and Town Hall Tower. The nearest
                airport is John Paul II International Kraków-Balice, 16.1 km
                from Tower Street Apartments, and the property offers a paid
                airport shuttle service.
              </p>
            </div>
            <div className='singleHotelDetailsPrice'>
              <h1>Perfect for a 9-night stay!</h1>
              <span>
                located in the real heart of Krakow, this property has an
                excellent location socre of 9.8!
              </span>
              <h2>
                <b>$945</b> (9 nights)
              </h2>
              <button>Reserve of Book now!</button>
            </div>
          </div>
        </div>
        <Newsletter />
        <Footer />
      </div>
    </div>
  );
};

export default HotelSingle;
