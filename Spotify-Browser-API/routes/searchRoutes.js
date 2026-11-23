import express from 'express';
import { searchBySongName } from '../controllers/searchController.js';

const router = express.Router();

router.get('/', searchBySongName);

export default router;
