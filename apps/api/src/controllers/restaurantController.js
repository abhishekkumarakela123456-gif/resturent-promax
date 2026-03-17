import { Restaurant } from '../models/Restaurant.js';
import { MenuItem } from '../models/MenuItem.js';
import { Offer } from '../models/Offer.js';
import { Setting } from '../models/Setting.js';
import { getRecommendations } from '../services/recommendationService.js';

export const getPublicRestaurant = async (req, res) => {
  const restaurant = await Restaurant.findOne({ subdomain: req.params.subdomain, isActive: true });
  if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });

  const [featured, offers, settings, recommended] = await Promise.all([
    MenuItem.find({ restaurantId: restaurant._id, isFeatured: true, isAvailable: true }).limit(8),
    Offer.find({ restaurantId: restaurant._id, isActive: true }),
    Setting.findOne({ restaurantId: restaurant._id }),
    getRecommendations(restaurant._id)
  ]);

  res.json({ restaurant, featured, offers, settings, recommended });
};
