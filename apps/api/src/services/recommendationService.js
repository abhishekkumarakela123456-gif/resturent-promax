import { MenuItem } from '../models/MenuItem.js';

export const getRecommendations = async (restaurantId) => {
  const hour = new Date().getHours();
  const mealTag = hour < 12 ? 'breakfast' : hour < 17 ? 'lunch' : 'dinner';

  return MenuItem.find({ restaurantId, isAvailable: true, tags: mealTag })
    .sort({ popularityScore: -1 })
    .limit(5);
};
