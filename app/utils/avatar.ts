import type { AvatarProps } from '@nuxt/ui';

import { toSvg } from 'jdenticon';

export function getAvatar(value: string, size: number = 32): AvatarProps {
    const svg = toSvg(value, size);

    return {
        src: `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`,
        alt: value,
        loading: 'lazy',
    };
}
