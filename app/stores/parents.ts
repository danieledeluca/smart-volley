import type { SelectMenuItem } from '@nuxt/ui';

export const useParentsStore = defineStore('parents', () => {
    const { filterState, filterFields, clearFilters } = useFilters('parent');

    const {
        data: parents,
        pending: parentsPending,
        error: parentsError,
        refresh: refreshParents,
    } = useLazyFetch('/api/parents', {
        headers: useRequestHeaders(['cookie']),
        query: filterState,
        watch: false,
    });

    const parentsItems = computed(() => {
        return parents.value?.map<SelectMenuItem>((parent) => {
            return {
                label: parent.name,
                value: parent.id,
            };
        });
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
