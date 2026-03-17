import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    subdomain: { type: String, required: true, unique: true },
    tagline: String,
    logoUrl: String,
    isActive: { type: Boolean, default: true },
    subscription: {
      plan: { type: String, enum: ['starter', 'growth', 'enterprise'], default: 'starter' },
      status: { type: String, enum: ['active', 'paused', 'cancelled'], default: 'active' },
      expiresAt: Date
    }
  },
  { timestamps: true }
);

export const Restaurant = mongoose.model('Restaurant', restaurantSchema);
