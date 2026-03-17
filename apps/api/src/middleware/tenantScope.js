export const tenantScope = (req, res, next) => {
  const requestedRestaurantId = req.headers['x-restaurant-id'] || req.params.restaurantId || req.body.restaurantId;

  if (!requestedRestaurantId && req.user.role !== 'super_admin') {
    return res.status(400).json({ message: 'Restaurant scope required' });
  }

  if (req.user.role === 'restaurant_admin' && String(req.user.restaurantId) !== String(requestedRestaurantId)) {
    return res.status(403).json({ message: 'Cross-tenant access denied' });
  }

  req.tenantRestaurantId = requestedRestaurantId || req.user.restaurantId;
  next();
};
