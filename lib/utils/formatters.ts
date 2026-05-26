import { KILOBYTE } from './constants';

export function formatFileSize(bytes: number) {
    if (bytes < KILOBYTE) {
        return `${bytes} B`;
    }

    if (bytes < KILOBYTE * KILOBYTE) {
        return `${(bytes / KILOBYTE).toFixed(1)} KB`;
    }

    return `${(bytes / (KILOBYTE * KILOBYTE)).toFixed(1)} MB`;
}
