import { Request, Response } from 'express';
import { Readable } from 'node:stream';

import { DatasetService } from '../../application/services/dataset.service';

export class DatasetController {

    constructor(
        private readonly datasetService: DatasetService
    ) { }

    public async uploadDataset(
        req: Request,
        res: Response
    ): Promise<void> {

        const nomeArquivo = req.file?.originalname ?? 'dataset';

        const stream = Readable.from([req.file!.buffer]);

        const response = await this.datasetService.processarDataset(stream, nomeArquivo);

        res.status(200).json(response);
    }
}