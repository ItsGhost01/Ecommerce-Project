import express from 'express'

const router = express.Router()

router.get('/api/Products', (req, res) => {
  res.send("fetch");
})

router.post('/api/Products', (req, res) => {
  res.send("Postgres");
})

export default router;