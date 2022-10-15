import mongoose from 'mongoose'
const url = process.env.MONGODB_URI

console.log(url)

const connectDB = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('Connected MongooDB Successfully')
  } catch (error) {
    console.error(error)
  }
}

export default connectDB
