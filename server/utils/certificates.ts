import type { H3Event } from 'h3';

import { serverSupabaseClient } from '#supabase/server';

export async function getCertificateSignedUrl(event: H3Event, folder: string, path: string, athleteName: string) {
    const client = await serverSupabaseClient(event);
    const { data, error } = await client.storage
        .from(CERTIFICATES_BUCKET)
        .createSignedUrl(`${folder}/${path}.jpg`, CERTIFICATE_URL_EXPIRE, {
            download: `certificato_${folder}_${athleteName.replace(/ /g, '-')}.jpg`,
        });

    if (error || !data) {
        return null;
    }

    return data.signedUrl;
}
