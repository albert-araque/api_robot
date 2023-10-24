import express from 'express'
import inputRoutes from './routes/input'
import morgan from 'morgan'

const PORT = 3000
const app = express()

app.use(express.json())
app.use(morgan('dev'))

app.use('/api/input', inputRoutes)

app.listen(PORT, () => {
  console.log(`Sever running on port: 'http://localhost:${PORT}'`)
})

export default app
