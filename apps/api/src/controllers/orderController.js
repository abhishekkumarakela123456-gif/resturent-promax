import { Order } from '../models/Order.js';
import { Setting } from '../models/Setting.js';
import { calculateOrderTotals, orderNumber } from '../utils/order.js';
import { sendOrderNotifications } from '../services/notificationService.js';
import { generateInvoiceHtml } from '../services/invoiceService.js';

export const placeOrder = async (req, res) => {
  const setting = await Setting.findOne({ restaurantId: req.tenantRestaurantId });
  const taxPercent = setting?.payment?.taxPercent || 5;
  const totals = calculateOrderTotals(req.body.items, taxPercent);

  const order = await Order.create({
    ...req.body,
    restaurantId: req.tenantRestaurantId,
    ...totals,
    orderNumber: orderNumber()
  });

  await sendOrderNotifications({
    restaurantId: req.tenantRestaurantId,
    email: req.body.notifyEmail,
    whatsappPhone: req.body.notifyPhone,
    order
  });

  const invoiceHtml = generateInvoiceHtml(order, setting);
  res.status(201).json({ order, invoiceHtml });
};

export const listOrders = async (req, res) => {
  const orders = await Order.find({ restaurantId: req.tenantRestaurantId }).sort({ createdAt: -1 });
  res.json(orders);
};

export const updateOrderStatus = async (req, res) => {
  const order = await Order.findOneAndUpdate(
    { _id: req.params.id, restaurantId: req.tenantRestaurantId },
    { status: req.body.status },
    { new: true }
  );
  res.json(order);
};
