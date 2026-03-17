import QRCode from 'qrcode';
import { Reservation } from '../models/Reservation.js';
import { Offer } from '../models/Offer.js';
import { Setting } from '../models/Setting.js';
import { Order } from '../models/Order.js';

export const reservation = {
  list: async (req, res) => res.json(await Reservation.find({ restaurantId: req.tenantRestaurantId })),
  create: async (req, res) => res.status(201).json(await Reservation.create({ ...req.body, restaurantId: req.tenantRestaurantId })),
  update: async (req, res) =>
    res.json(
      await Reservation.findOneAndUpdate(
        { _id: req.params.id, restaurantId: req.tenantRestaurantId },
        req.body,
        { new: true }
      )
    )
};

export const offer = {
  list: async (req, res) => res.json(await Offer.find({ restaurantId: req.tenantRestaurantId })),
  upsert: async (req, res) => {
    const payload = { ...req.body, restaurantId: req.tenantRestaurantId };
    const data = req.params.id
      ? await Offer.findOneAndUpdate({ _id: req.params.id, restaurantId: req.tenantRestaurantId }, payload, { new: true })
      : await Offer.create(payload);
    res.status(req.params.id ? 200 : 201).json(data);
  }
};

export const setting = {
  get: async (req, res) => res.json(await Setting.findOne({ restaurantId: req.tenantRestaurantId })),
  update: async (req, res) =>
    res.json(
      await Setting.findOneAndUpdate(
        { restaurantId: req.tenantRestaurantId },
        req.body,
        { upsert: true, new: true }
      )
    )
};

export const analytics = async (req, res) => {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const [todayOrders, revenue, bestSellers] = await Promise.all([
    Order.countDocuments({ restaurantId: req.tenantRestaurantId, createdAt: { $gte: todayStart } }),
    Order.aggregate([
      { $match: { restaurantId: req.tenantRestaurantId } },
      { $group: { _id: null, total: { $sum: '$total' } } }
    ]),
    Order.aggregate([
      { $match: { restaurantId: req.tenantRestaurantId } },
      { $unwind: '$items' },
      { $group: { _id: '$items.name', qty: { $sum: '$items.quantity' } } },
      { $sort: { qty: -1 } },
      { $limit: 5 }
    ])
  ]);

  res.json({
    todayOrders,
    totalRevenue: revenue[0]?.total || 0,
    bestSellers
  });
};

export const qrCodeForTable = async (req, res) => {
  const menuUrl = `${req.protocol}://${req.get('host')}/api/public/restaurant/${req.params.subdomain}?table=${req.query.table || ''}`;
  const dataUrl = await QRCode.toDataURL(menuUrl);
  res.json({ dataUrl, menuUrl });
};
