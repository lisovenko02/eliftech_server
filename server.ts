import mongoose from 'mongoose'
import app from './app'

const { DB_HOST } = process.env

if (!DB_HOST) {
  console.log('DB not found')
  process.exit(1)
}

mongoose.set('strictQuery', true)

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(5000)
    console.log('Database successfully connection')
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB', err.message)
  })
