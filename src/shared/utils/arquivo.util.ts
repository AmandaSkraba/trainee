import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function SalvarJson(nomeArquivo: string, dados: unknown): Promise<void> {
    const pastaOutput = path.resolve(process.cwd(), 'src', 'output');

    await mkdir(pastaOutput, { recursive: true });
    const nomeSaida = nomeArquivo.replace(/^dataset(\d+)\..*$/i, 'respostas$1.json');

    const caminhoArquivo = path.join(pastaOutput, nomeArquivo);

    await writeFile(
        caminhoArquivo,
        JSON.stringify(dados, null, 4),
        'utf-8'
    );
}