import type { AvatarProps } from '@nuxt/ui';

export function getAvatar(value: string, size: number = 40): AvatarProps {
    return {
        src: `https://dummyjson.com/icon/${value}/${size.toString()}`,
        alt: value,
        loading: 'lazy',
    };
}

export function toFormData<T extends Record<string, any>>(data: T) {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
        if (value) {
            formData.append(key, value as Blob);
        }
    });

    return formData;
}
