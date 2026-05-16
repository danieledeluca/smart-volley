import { GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import env from '../env';
import { r2 } from './client';
import { optimizeAndConvertToPdf } from './optimizer';

export async function uploadFile(key: string, file: File) {
    const pdfBuffer = await optimizeAndConvertToPdf(file);

    await r2.send(new PutObjectCommand({
        Bucket: env.R2_BUCKET_NAME,
        Key: key,
        Body: pdfBuffer,
        ContentType: 'application/pdf',
    }));

    return key;
}

export async function getSignedFileUrl(key: string, expiresIn = 60 * 10) {
    return await getSignedUrl(
        r2,
        new GetObjectCommand({
            Bucket: env.R2_BUCKET_NAME,
            Key: key,
        }),
        { expiresIn },
    );
}
