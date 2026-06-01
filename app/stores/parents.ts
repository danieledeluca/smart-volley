import type { SelectMenuItem } from '@nuxt/ui';

export const useParentsStore = defineStore('parents', () => {
    const {
        data: parents,
        pending: parentsPending,
        error: parentsError,
        refresh: refreshParents,
    } = useLazyFetch('/api/parents', {
        headers: useRequestHeaders(['cookie']),
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
        refreshParents,
    };
});
