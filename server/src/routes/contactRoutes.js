import {Router} from 'express';
import { sendContactMessage } from '../controllers/contactController.js';

const router = Router();

router.route('/')
    .post(sendContactMessage)

export default router;