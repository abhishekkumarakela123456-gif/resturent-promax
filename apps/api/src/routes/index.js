import { Router } from 'express';
import { login } from '../controllers/authController.js';
import { createRestaurant, superDashboard, updateRestaurantStatus } from '../controllers/superAdminController.js';
import { getPublicRestaurant } from '../controllers/restaurantController.js';
import { deleteMenuItem, listMenu, upsertMenuItem } from '../controllers/menuController.js';
import { listOrders, placeOrder, updateOrderStatus } from '../controllers/orderController.js';
import { analytics, offer, qrCodeForTable, reservation, setting } from '../controllers/managementController.js';
import { auth, authorize } from '../middleware/auth.js';
import { tenantScope } from '../middleware/tenantScope.js';

const router = Router();

router.post('/auth/login', login);
router.get('/public/restaurant/:subdomain', getPublicRestaurant);
router.get('/public/qr/:subdomain', qrCodeForTable);

router.use(auth);

router.get('/super/dashboard', authorize('super_admin'), superDashboard);
router.post('/super/restaurants', authorize('super_admin'), createRestaurant);
router.patch('/super/restaurants/:id/status', authorize('super_admin'), updateRestaurantStatus);

router.use(tenantScope);

router.get('/menu', listMenu);
router.post('/menu', authorize('restaurant_admin', 'super_admin'), upsertMenuItem);
router.patch('/menu/:id', authorize('restaurant_admin', 'super_admin'), upsertMenuItem);
router.delete('/menu/:id', authorize('restaurant_admin', 'super_admin'), deleteMenuItem);

router.post('/orders', placeOrder);
router.get('/orders', authorize('restaurant_admin', 'super_admin'), listOrders);
router.patch('/orders/:id/status', authorize('restaurant_admin', 'super_admin'), updateOrderStatus);

router.get('/reservations', reservation.list);
router.post('/reservations', reservation.create);
router.patch('/reservations/:id', reservation.update);

router.get('/offers', offer.list);
router.post('/offers', offer.upsert);
router.patch('/offers/:id', offer.upsert);

router.get('/settings', setting.get);
router.put('/settings', setting.update);

router.get('/analytics', analytics);

export default router;
