import express from 'express';
import datasetRoutes from './presentation/routes/dataset.route';

import swaggerUi from 'swagger-ui-express';
import { swaggerDocument } from './docs/swagger';

const app = express();


app.use(express.raw({
    type: 'application/octet-stream',
    limit: '10mb'
}));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/datasets', datasetRoutes);
app.listen(3000, () => {
    console.log('Servidor iniciado:  http://localhost:3000/api-docs/');
});

