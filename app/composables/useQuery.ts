import type { LocationQueryRaw } from 'vue-router';

export function useQuery() {
    const router = useRouter();
    const route = useRoute();

    function getQueryValue<T = string>(key: string) {
        return route.query[key]?.toString() as T || undefined;
    }

    function setQueryValue(key: string, value?: string) {
        setQueryValues({ [key]: value });
    }

    function setQueryValues(values: Record<string, string | undefined>) {
        const query: LocationQueryRaw = { ...route.query };

        Object.entries(values).forEach(([key, value]) => {
            query[key] = value || undefined;
        });

        router.replace({ query });
    }

    function clearQuery() {
        router.replace({ query: undefined });
    }

    return {
        getQueryValue,
        setQueryValue,
        setQueryValues,
        clearQuery,
    };
}
