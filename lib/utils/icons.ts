import { icons } from '@iconify-json/lucide';

import { ACTIVITY_ICON_PREFIX } from './constants';

export function normalizeActivityIcon(value: string) {
    const iconName = value.trim().toLowerCase();

    return iconName.startsWith(ACTIVITY_ICON_PREFIX) ? iconName : `${ACTIVITY_ICON_PREFIX}${iconName}`;
}

export function isValidActivityIcon(value?: string) {
    if (!value) {
        return false;
    }

    const iconName = normalizeActivityIcon(value).slice(ACTIVITY_ICON_PREFIX.length);

    return Object.hasOwn(icons.icons, iconName) || Object.hasOwn(icons.aliases ?? {}, iconName);
}
