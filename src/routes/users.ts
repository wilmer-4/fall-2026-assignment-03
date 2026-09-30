import { Router } from 'express';
import { createUser, getAllUsers, getUserById } from '../dal/users.js';
import authMiddleware from '../middleware/auth.js';

const router = Router();

// TODO: Student implementation - Part 1: User Routes
// GET /users
router.get('/', async function (req, res) {
    const users = await getAllUsers();
    return res.json(users);



})
// GET /users/:id //get params
router.get('/:id', async function (req, res) {
    const { id } = req.params;
    const idNum = +id;
    const user = await getUserById(idNum);
    if (!user) {
        return res.status(404).json({error: 'Not Found'})
    } else {
        return res.json(user)
    }



})
// POST /users
router.post('/', authMiddleware, async function(req, res) {
    const { name, email } = req.body;
    const user = await createUser({name, email});
    return res.status(201).json(user);
    
});

export default router;
