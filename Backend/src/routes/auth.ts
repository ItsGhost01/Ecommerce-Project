import express from 'express'
import { login, signup } from '../controllers/auth';

const router = express.Router()


router.post('/api/login', login)

router.post('/api/signup', signup)



// router.post('/api/login', (req, res) => {
//   res.send("login");
// })

// router.post('/api/signup', (req, res) => {
//   res.send("signup");
// })

export default router;