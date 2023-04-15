import Hotel from '../models/Hotel.js';
import Room from '../models/Room.js';

export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);

  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (error) {
    next(error);
  }
};

export const updateHotel = async (req, res, next) => {
  try {
    const updateHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateHotel);
  } catch (error) {
    next(error);
  }
};

export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json('Hotel has been deleted');
  } catch (error) {
    next(error);
  }
};

export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (error) {
    next(error);
  }
};

export const getHotels = async (req, res, next) => {
  const { min, max, featured, city } = req.query;
  const limit = parseInt(req.query.limit);
  const query = {};

  if (featured) query.featured = featured;
  if (min || max) query.cheapestPrice = { $gte: min || 1, $lte: max || 999 };
  if (city) query.city = city;

  try {
    const hotels = await Hotel.find(query).limit(limit);
    res.status(200).json(hotels);
  } catch (error) {
    next(error);
  }
};

export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(',');
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};

export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: 'hotel' });
    const apartmentCount = await Hotel.countDocuments({ type: 'apartment' });
    const resortCount = await Hotel.countDocuments({ type: 'resort' });
    const villaCount = await Hotel.countDocuments({ type: 'villa' });
    const cabinCount = await Hotel.countDocuments({ type: 'cabin' });

    res.status(200).json([
      { type: 'hotels', count: hotelCount },
      { type: 'apartments', count: apartmentCount },
      { type: 'resorts', count: resortCount },
      { type: 'villas', count: villaCount },
      { type: 'cabins', count: cabinCount },
    ]);
  } catch (error) {
    next(error);
  }
};

export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const roomsList = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(roomsList);
  } catch (error) {
    next(error);
  }
};
