import express from 'express';
import {
  createHotel,
  deleteHotel,
  getHotel,
  getHotels,
  updateHotel,
  countByCity,
  countByType,
  getHotelRooms,
} from '../controllers/hotelControl.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

//CREATE HOTEL
router.post('/', verifyAdmin, createHotel);

//UPDATE HOTEL
router.put('/:id', verifyAdmin, updateHotel);

//DELETE HOTEL
router.delete('/:id', verifyAdmin, deleteHotel);

//GET HOTEL
router.get('/find/:id', getHotel);

//GET ALL
router.get('/', getHotels);

//CITY LIST HOTEL
router.get('/countByCity', countByCity);

//TYPE LIST HOTEL
router.get('/countByType', countByType);

//GET HOTEL ROOMS BY HOTEL ID
router.get('/room/:id', getHotelRooms);

export default router;
