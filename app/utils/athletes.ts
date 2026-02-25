export function getCertificateDateStatus(date: string | null | undefined): CertificateDateStatus {
    if (!date) {
        return 'missing';
    }

    const dateTime = new Date(date).getTime();
    const currentTime = new Date().getTime();

    if (dateTime < currentTime) {
        return 'expired';
    }

    return 'valid';
}
