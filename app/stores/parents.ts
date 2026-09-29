import type { SelectMenuItem } from '@nuxt/ui';
import type { SelectParentWithRelations } from '~~/lib/db/schema';

export const useParentsStore = defineStore('parents', () => {
    const route = useRoute();

    const {
        data: parents,
        pending: parentsPending,
        error: parentsError,
        refresh: refreshParents,
    } = useLazyFetch('/api/parents');

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

    const parentUrlWithId = computed(() => `/api/parents/${route.params.id}`);

    const {
        data: currentParent,
        pending: currentParentPending,
        error: currentParentError,
        refresh: refreshCurrentParent,
    } = useLazyFetch<SelectParentWithRelations>(parentUrlWithId, {
        immediate: false,
        watch: false,
    });

    return {
        parents,
        parentsItems,
        parentsPending,
        parentsError,
        currentParent,
        currentParentPending,
        currentParentError,
        refreshParents,
        refreshCurrentParent,
    };
});
