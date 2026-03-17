import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema(
  {
    restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true, index: true },
    customerName: String,
    email: String,
    phone: String,
    guests: Number,
    reservedAt: Date,
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' }
  },
  { timestamps: true }
);

export const Reservation = mongoose.model('Reservation', reservationSchema);
