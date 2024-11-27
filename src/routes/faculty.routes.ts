import { Router } from 'express';
import { FacultyController } from '../controllers/faculty.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';

const router = Router();
const facultyController = new FacultyController();

router.post(
  '/',
  authenticate,
  facultyController.create
);

router.get('/', authenticate, facultyController.getAll);

export default router;