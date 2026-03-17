import mongoose from 'mongoose';

const offerSchema = new mongoose.Schema(
  {
    restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true, index: true },
    title: String,
    bannerUrl: String,
    description: String,
    discountType: { type: String, enum: ['flat', 'percentage'], default: 'percentage' },
    discountValue: Number,
    isActive: { type: Boolean, default: true },
    startsAt: Date,
    endsAt: Date
  },
  { timestamps: true }
);

export const Offer = mongoose.model('Offer', offerSchema);
