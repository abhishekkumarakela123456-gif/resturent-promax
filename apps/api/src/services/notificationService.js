import nodemailer from 'nodemailer';
import { env } from '../config/env.js';
import { Notification } from '../models/Notification.js';

const transporter = nodemailer.createTransport({
  host: env.smtp.host,
  port: env.smtp.port,
  secure: false,
  auth: env.smtp.user ? { user: env.smtp.user, pass: env.smtp.pass } : undefined
});

export const sendOrderNotifications = async ({ restaurantId, email, whatsappPhone, order }) => {
  const events = [];

  if (email) {
    try {
      await transporter.sendMail({
        from: env.smtp.from,
        to: email,
        subject: `New order ${order.orderNumber}`,
        text: `A new order was placed. Total: ${order.total}`
      });
      events.push({ type: 'email', recipient: email, status: 'sent' });
    } catch (error) {
      events.push({ type: 'email', recipient: email, status: 'failed', error: error.message });
    }
  }

  if (whatsappPhone) {
    events.push({ type: 'whatsapp', recipient: whatsappPhone, status: 'queued' });
  }

  await Notification.insertMany(events.map((e) => ({ restaurantId, ...e, payload: { orderNumber: order.orderNumber } })));
};
