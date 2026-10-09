import type { FetchError } from 'ofetch';

import type { NuxtError } from '#app';

type ApiErrorBody = {
    statusCode: number;
    statusMessage: string;
    message?: string;
    data?: {
        name: string;
        message: string;
    }[];
};

export function getApiError(error: NuxtError<unknown> | FetchError<unknown>) {
    return (error.data as ApiErrorBody)?.statusMessage || error.statusText || $t('error.generic');
}
