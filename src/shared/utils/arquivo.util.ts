import { writeFile, mkdir } from 'fs/promises';
import multer from 'multer';
import path from 'path';

const pastaTemporaria = path.resolve(process.cwd(), 'temp');

export const UploadArquivo = multer({
    storage: multer.diskStorage({
        destination: async (_req, _file, callback) => {
            try {
                await mkdir(pastaTemporaria, { recursive: true });
                callback(null, pastaTemporaria);
            } catch (error) {
                callback(error as Error, pastaTemporaria);
            }
        },
        filename: (_req, file, callback) => {
            callback(null, `${Date.now()}-${file.originalname}`);
        }
    })
});

export async function SalvarJson(nomeArquivo: string, dados: unknown): Promise<void> {
    const pastaOutput = path.resolve(process.cwd(), 'src', 'output');

    await mkdir(pastaOutput, { recursive: true });
    const nomeSaida = nomeArquivo.replace(/^dataset(\d+)\..*$/i, 'respostas$1.json');

    const caminhoArquivo = path.join(pastaOutput, nomeSaida);

    await writeFile(
        caminhoArquivo,
        JSON.stringify(dados, null, 4),
        'utf-8'
    );
}