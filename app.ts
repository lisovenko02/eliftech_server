import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'
import eventRouter from './routes/eventRouter'
import registerRouter from './routes/registerRouter'

dotenv.config()

const app = express()

app.use(morgan('tiny'))
app.use(cors())
app.use(express.json())

app.use('/events', eventRouter)
app.use('/register', registerRouter)

export default app
