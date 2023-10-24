import express from 'express'
import { getCoordinates, isValidInput } from './src/services/inputService'

const router = express.Router()

router.get('/:input', (req, res) => {
  const robotInput = req.params.input
  if (robotInput.length === 0) {
    res.status(400)
    res.json({ error: 'The input must be at least 1 character long' })
    return
  }
  if (!isValidInput(robotInput)) {
    res.status(400)
    res.json({ error: 'The input must only contain "L/l", "R/r" and "M/m" characters' })
    return
  }
  const coordinates = getCoordinates(robotInput)
  res.send(`Robot's final coordinates: ${coordinates}`)
})

export default router
