import { Router } from 'express';
import { DocumentController } from '../controllers/document.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';
import { upload } from '../middlewares/upload.middleware';

const router = Router();
const documentController = new DocumentController();

router.post(
  '/',
  authenticate,
  upload.single('file'),
  documentController.create
);

router.get('/', authenticate, documentController.getAll);
router.get('/:id', authenticate, documentController.getById);

export default router;