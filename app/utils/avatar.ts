import type { AvatarProps } from '@nuxt/ui';

export function getAvatar(value: string, size: number = 32): AvatarProps {
    return {
        src: `https://dummyjson.com/icon/${value.replace(/\s/g, '')}/${size.toString()}`,
        alt: value,
        loading: 'lazy',
    };
}
