import mongoose from 'mongoose';

const settingSchema = new mongoose.Schema(
  {
    restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true, unique: true },
    theme: {
      primary: { type: String, default: '#ef4444' },
      secondary: { type: String, default: '#111827' },
      font: { type: String, default: 'Inter' }
    },
    homepageSections: {
      hero: { type: Boolean, default: true },
      featuredDishes: { type: Boolean, default: true },
      reviews: { type: Boolean, default: true },
      offers: { type: Boolean, default: true }
    },
    payment: {
      codEnabled: { type: Boolean, default: true },
      onlineEnabled: { type: Boolean, default: false },
      stripePublicKey: String,
      razorpayKey: String,
      taxPercent: { type: Number, default: 5 }
    },
    notification: {
      smtpHost: String,
      smtpPort: Number,
      smtpUser: String,
      smtpPass: String,
      whatsappApiUrl: String,
      whatsappApiToken: String
    },
    invoice: {
      gstNumber: String,
      legalName: String,
      footerText: String
    },
    seo: {
      metaTitle: String,
      metaDescription: String
    }
  },
  { timestamps: true }
);

export const Setting = mongoose.model('Setting', settingSchema);
