import { MenuItem } from '../models/MenuItem.js';

export const listMenu = async (req, res) => {
  const items = await MenuItem.find({ restaurantId: req.tenantRestaurantId, isAvailable: true }).sort({ category: 1 });
  res.json(items);
};

export const upsertMenuItem = async (req, res) => {
  const payload = { ...req.body, restaurantId: req.tenantRestaurantId };
  const item = req.params.id
    ? await MenuItem.findOneAndUpdate({ _id: req.params.id, restaurantId: req.tenantRestaurantId }, payload, { new: true })
    : await MenuItem.create(payload);

  res.status(req.params.id ? 200 : 201).json(item);
};

export const deleteMenuItem = async (req, res) => {
  await MenuItem.deleteOne({ _id: req.params.id, restaurantId: req.tenantRestaurantId });
  res.status(204).send();
};
