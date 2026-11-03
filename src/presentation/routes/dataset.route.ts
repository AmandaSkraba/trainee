import { Router } from 'express';
import { DatasetController } from '../controllers/dataset.controller';
import { DatasetService } from '../../application/services/dataset.service';
import multer from 'multer';

const datasetRoutes = Router();
const datasetService = new DatasetService();
const datasetController = new DatasetController(datasetService);

/**
 * @swagger
 * /api/datasets/upload:
 *   post:
 *     summary: Upload de dataset
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Dataset processado
 */
const upload = multer({ storage: multer.memoryStorage() });

datasetRoutes.post(
    '/upload',
    upload.single('file'),
    datasetController.uploadDataset.bind(datasetController)
);

export default datasetRoutes;