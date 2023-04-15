import express from 'express';
import {
  createRoom,
  deleteRoom,
  getRoom,
  getRooms,
  getRoomType,
  updateRoom,
  updateRoomAvailability,
} from '../controllers/roomControl.js';
// import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

// render is on the public suffixes list, which means cross site cookies won't work.
// so verification with tokens is not possible at the moment

//CREATE ROOM
router.post('/:hotelid', /*verifyAdmin,*/ createRoom);

//UPDATE ROOM
router.put('/:id', /*verifyAdmin,*/ updateRoom);

//UPDATE AVAILABILITY
router.put('/availability/:id', updateRoomAvailability);

//GET PARENT ID
router.get('/roomType/:id', getRoomType);

//DELETE ROOM
router.delete('/:id/:hotelid', /*verifyAdmin,*/ deleteRoom);

//GET ROOM
router.get('/:id', getRoom);

//GET ALL
router.get('/', getRooms);

export default router;
