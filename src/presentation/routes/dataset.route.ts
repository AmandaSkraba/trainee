import { Router } from 'express';
import { DatasetController } from '../controllers/dataset.controller';
import { DatasetService } from '../../application/services/dataset.service';
import { UploadArquivo } from '../../shared/utils/arquivo.util';

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
 *             required:
 *               - file
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Dataset processado
 */
datasetRoutes.post(
    '/upload',
    UploadArquivo.single('file'),
    datasetController.uploadDataset.bind(datasetController)
);

export default datasetRoutes;