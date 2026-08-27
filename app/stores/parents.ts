import type { SelectMenuItem } from '@nuxt/ui';

export const useParentsStore = defineStore('parents', () => {
    const route = useRoute();
    const { filterState, filterFields, clearFilters } = useFilters('parent');

    const {
        data: parents,
        pending: parentsPending,
        error: parentsError,
        refresh: refreshParents,
    } = useLazyFetch('/api/parents', {
        query: filterState,
        watch: false,
    });

    const parentsItems = computed(() => {
        const sortedParents = parents.value?.toSorted((parentA, parentB) => {
            return parentA.name.localeCompare(parentB.name);
        });

        return sortedParents?.map<SelectMenuItem>((parent) => {
            return {
                label: parent.name,
                value: parent.id,
            };
        });
    });

    watchEffect(() => {
        if (!route.name?.toString().startsWith('dashboard-parents')) {
            clearFilters();
        }
    });

    return {
        parents,
        parentsItems,
        parentsPending,
        parentsError,
        filterState,
        filterFields,
        refreshParents,
        clearFilters,
    };
});
