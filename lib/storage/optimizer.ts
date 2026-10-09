import { Buffer } from 'node:buffer';
import { PageSizes, PDFDocument } from 'pdf-lib';
import sharp from 'sharp';

const A4_WIDTH = 1240;
const A4_HEIGHT = 1754;
const PDF_SIGNATURE = '%PDF-';

function isPdf(buffer: Buffer) {
    return buffer.subarray(0, PDF_SIGNATURE.length).toString('latin1') === PDF_SIGNATURE;
}

export async function optimizeAndConvertToPdf(file: File) {
    const input = Buffer.from(await file.arrayBuffer());

    if (isPdf(input)) {
        await PDFDocument.load(input);

        return input;
    }

    const rotated = await sharp(input).rotate().toBuffer({
        resolveWithObject: true,
    });
    const isLandscape = rotated.info.width > rotated.info.height;

    const [pageWidth, pageHeight] = isLandscape ? [PageSizes.A4[1], PageSizes.A4[0]] : PageSizes.A4;
    const [maxWidth, maxHeight] = isLandscape ? [A4_HEIGHT, A4_WIDTH] : [A4_WIDTH, A4_HEIGHT];

    const { data, info } = await sharp(rotated.data)
        .flatten({
            background: '#FFFFFF',
        })
        .resize(maxWidth, maxHeight, {
            fit: 'inside',
            withoutEnlargement: true,
        })
        .jpeg({
            quality: 75,
            progressive: true,
            mozjpeg: true,
        })
        .toBuffer({
            resolveWithObject: true,
        });

    const pdfDoc = await PDFDocument.create();
    const image = await pdfDoc.embedJpg(data);
    const page = pdfDoc.addPage([pageWidth, pageHeight]);

    const scale = Math.min(pageWidth / info.width, pageHeight / info.height);
    const width = info.width * scale;
    const height = info.height * scale;

    page.drawImage(image, {
        x: (pageWidth - width) / 2,
        y: (pageHeight - height) / 2,
        width,
        height,
    });

    return Buffer.from(await pdfDoc.save());
}
