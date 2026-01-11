import { Router } from 'express';
import { TransactionController } from '../controllers/transaction.controller';

const router = Router();

const controller = new TransactionController();

router.post('/create', controller.createTransaction);

router.get('/all-transactions', controller.getAllTransactions);

router.get('/transactionByUserId', controller.getTransactionsByUserId);

router.get('/recent', controller.getRecentTransactions);

router.get('/category/:category', controller.getTransactionsByCategory);

export default router;
