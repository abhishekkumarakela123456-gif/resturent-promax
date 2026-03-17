import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema(
  {
    restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true, index: true },
    name: { type: String, required: true },
    description: String,
    category: { type: String, required: true },
    tags: [String],
    imageUrl: String,
    isVeg: { type: Boolean, default: false },
    price: { type: Number, required: true },
    isFeatured: { type: Boolean, default: false },
    isAvailable: { type: Boolean, default: true },
    popularityScore: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export const MenuItem = mongoose.model('MenuItem', menuItemSchema);
