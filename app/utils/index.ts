import type { AvatarProps } from '@nuxt/ui';

export function getAvatar(value: string, size: number = 40): AvatarProps {
    return {
        src: `https://dummyjson.com/icon/${value}/${size.toString()}`,
        alt: value,
        loading: 'lazy',
    };
}
