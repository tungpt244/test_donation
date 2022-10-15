import mongoose from 'mongoose'
const { Schema } = mongoose

const AccountModel = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: String,
    photo: String,
    role: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    collection: 'account',
  }
)

export default mongoose.model('account', AccountModel)
