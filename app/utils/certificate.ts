import type { CertificateStatusEnum } from '#imports';

export function getCertificateDateColumnSortingFn(dateA: string | null, dateB: string | null) {
    if (!dateA && !dateB) {
        return 0;
    }

    if (!dateA) {
        return 1;
    }

    if (!dateB) {
        return -1;
    }

    return new Date(dateA).getTime() - new Date(dateB).getTime();
}

export function getCertificateDateStatus(date: string | null): CertificateStatusEnum {
    if (!date) {
        return 'missing';
    }

    const dateTime = new Date(date).getTime();
    const currentTime = Date.now();

    if (dateTime < currentTime) {
        return 'expired';
    }

    return 'valid';
}
