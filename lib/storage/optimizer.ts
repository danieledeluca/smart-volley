import { Buffer } from 'node:buffer';
import { PageSizes, PDFDocument } from 'pdf-lib';
import sharp from 'sharp';

import { A4_HEIGHT, A4_WIDTH } from '../utils/constants';

export async function optimizeAndConvertToPdf(file: File) {
    const inputBuffer = await file.arrayBuffer();

    const optimized = await sharp(Buffer.from(inputBuffer))
        .resize(A4_WIDTH, A4_HEIGHT, {
            fit: 'contain',
            background: {
                r: 255,
                g: 255,
                b: 255,
                alpha: 1,
            },
            withoutEnlargement: true,
        })
        .jpeg({
            quality: 75,
            progressive: true,
            mozjpeg: true,
        })
        .toBuffer();

    const pdfDoc = await PDFDocument.create();
    const image = await pdfDoc.embedJpg(optimized);

    const page = pdfDoc.addPage(PageSizes.A4);

    page.drawImage(image, {
        x: 0,
        y: 0,
        width: PageSizes.A4[0],
        height: PageSizes.A4[1],
    });

    return Buffer.from(await pdfDoc.save());
}
