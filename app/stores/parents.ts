import type { SelectMenuItem } from '@nuxt/ui';

export const useParentsStore = defineStore('parents', () => {
    const {
        data: parents,
        pending: parentsPending,
        error: parentsError,
        refresh: refreshParents,
    } = useLazyFetch('/api/parents', {
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

    return {
        parents,
        parentsItems,
        parentsPending,
        parentsError,
        refreshParents,
    };
});
