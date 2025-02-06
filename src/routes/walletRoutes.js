import { Router } from 'express';
import walletController from '../controllers/walletController.js';

const router = new Router();

router.get('/', walletController.getWallets);

export default router;
