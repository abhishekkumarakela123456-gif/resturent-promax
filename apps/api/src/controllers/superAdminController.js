import { Restaurant } from '../models/Restaurant.js';
import { User } from '../models/User.js';
import { Order } from '../models/Order.js';

export const createRestaurant = async (req, res) => {
  const { name, slug, subdomain, adminName, adminEmail, adminPassword } = req.body;

  const restaurant = await Restaurant.create({ name, slug, subdomain });
  const admin = await User.create({
    restaurantId: restaurant._id,
    name: adminName,
    email: adminEmail,
    password: adminPassword,
    role: 'restaurant_admin'
  });

  res.status(201).json({ restaurant, adminId: admin._id });
};

export const updateRestaurantStatus = async (req, res) => {
  const restaurant = await Restaurant.findByIdAndUpdate(req.params.id, { isActive: req.body.isActive }, { new: true });
  res.json(restaurant);
};

export const superDashboard = async (_req, res) => {
  const [restaurants, revenueResult] = await Promise.all([
    Restaurant.countDocuments(),
    Order.aggregate([{ $group: { _id: null, totalRevenue: { $sum: '$total' } } }])
  ]);

  res.json({
    restaurants,
    totalRevenue: revenueResult[0]?.totalRevenue || 0
  });
};
