import { Request, Response } from 'express';
import { Readable } from 'node:stream';

import { DatasetService } from '../../application/services/dataset.service';
import { createReadStream } from 'node:fs';

export class DatasetController {

    constructor(
        private readonly datasetService: DatasetService
    ) { }

    public async uploadDataset(
        req: Request,
        res: Response
    ): Promise<void> {

        if (!req.file) {
            res.status(400).json({ message: 'Arquivo não enviado.' });
            return;
        }

        const nomeArquivo = req.file.originalname;


        const stream = createReadStream(req.file.path);

        const response = await this.datasetService.processarDataset(
            stream,
            nomeArquivo
        );

        res.status(200).json(response);


    }
}