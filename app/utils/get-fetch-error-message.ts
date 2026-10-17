import type { FetchError } from 'ofetch';

import type { NuxtError } from '#app';

export function getFetchErrorMessage(error: NuxtError | FetchError) {
    return error.data?.statusMessage || error.statusText || $t('error.generic');
}
