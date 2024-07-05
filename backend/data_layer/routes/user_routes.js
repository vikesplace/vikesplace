import express from "express";
import { createUser, loginUser, getUserData, resetPassword } from '../controllers/user_controller.js';

const router = express.Router();

//Create a user
router.post('/', createUser);

// //Login a user
// router.post('/login', (req, res) => {
//   res.json({ message: 'login a user' });
// });
router.post('/login', loginUser);

router.post('/resetPassword', resetPassword);

//Get all users
router.get('/', (req, res) => {
  res.json({ message: 'Get All Users' });
});

//Get a user
router.get('/:userId', getUserData);

//Update a user
router.patch('/:userId', (req, res) => {
  res.json({ message: 'Update User' });
});

//Delete a user
router.delete('/:userId', (req, res) => {
  res.json({ message: 'Delete User' });
});

export default router;
