import type { LocationQueryRaw } from 'vue-router';

export function getQueryValue(key: string) {
    const route = useRoute();

    return route.query[key]?.toString() || '';
}

export function setQueryValue(key: string, value?: string) {
    const router = useRouter();
    const route = useRoute();

    const query: LocationQueryRaw = { ...route.query };

    query[key] = value || undefined;

    router.replace({ query });
}

export function setQueryValues(values: Record<string, string | undefined>) {
    const router = useRouter();
    const route = useRoute();

    const query: LocationQueryRaw = { ...route.query };

    Object.entries(values).forEach(([key, value]) => {
        query[key] = value || undefined;
    });

    router.replace({ query });
}

export function clearQuery() {
    const router = useRouter();

    router.replace({ query: undefined });
}
