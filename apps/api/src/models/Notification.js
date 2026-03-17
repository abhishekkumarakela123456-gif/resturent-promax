import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true, index: true },
    type: { type: String, enum: ['email', 'whatsapp'], required: true },
    recipient: String,
    payload: Object,
    status: { type: String, enum: ['queued', 'sent', 'failed'], default: 'queued' },
    error: String
  },
  { timestamps: true }
);

export const Notification = mongoose.model('Notification', notificationSchema);
