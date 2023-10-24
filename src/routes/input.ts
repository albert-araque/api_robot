import express from 'express'
import { isValidInput } from '../utils'

const router = express.Router()

router.get('/:input', (req, res) => {
  const robotInput = req.params.input
  if (robotInput.length === 0) {
    res.status(400)
    res.json({ error: 'The input must be at least 1 character long' })
  }
  if (!isValidInput(robotInput)) {
    res.status(400)
    res.json({ error: 'The input must only contain "L/l", "R/r" and "M/m" characters' })
  }
  res.send(`Sending input: ${robotInput}`)
})

export default router
