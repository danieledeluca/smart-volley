import type { SelectItem } from '@nuxt/ui';

export const useParentsStore = defineStore('parents', () => {
    const { data: parents, pending: parentsPending } = useLazyFetch('/api/parents', {
        headers: useRequestHeaders(['cookie']),
        transform: (parents) => {
            return parents.map<SelectItem>((parent) => {
                return {
                    label: parent.name,
                    value: parent.id,
                };
            });
        },
    });

    return {
        parents,
        parentsPending,
    };
});
