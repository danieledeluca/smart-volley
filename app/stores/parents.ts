import type { FormSubmitEvent, SelectItem } from '@nuxt/ui';
import type { FetchError } from 'ofetch';

export const useParentsStore = defineStore('parents', () => {
    const toast = useToast();

    const isAddingParent = ref(false);

    const { data: parents, pending: parentsPending, refresh: refreshParents } = useLazyFetch('/api/parents', {
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

    const addParent = async (event: FormSubmitEvent<AddParentSchema>) => {
        isAddingParent.value = true;

        try {
            await $fetch('/api/parents/add', {
                method: 'POST',
                body: event.data,
            });

            refreshParents();

            toast.add({
                title: 'Parent added successfully',
                color: 'success',
                icon: 'i-lucide-circle-check',

            });
        } catch (err) {
            const error = err as FetchError;

            toast.add({
                title: error.message,
                color: 'error',
                icon: 'i-lucide-circle-x',
            });
        } finally {
            isAddingParent.value = false;
        }
    };

    const parentsAddFields = computed<FormField<AddParentSchema>[]>(() => {
        return [
            {
                renderAs: 'input',
                label: 'Nome e cognome',
                name: 'name',
                placeholder: 'Enter your name',
                required: true,
            },
            {
                renderAs: 'input',
                label: 'Tax code',
                name: 'tax_code',
                placeholder: 'Enter your tax code',
                required: true,
            },
            {
                renderAs: 'input',
                label: 'Email',
                type: 'email',
                name: 'email',
                placeholder: 'Enter your email',
            },
        ];
    });

    return {
        parents,
        parentsPending,
        refreshParents,
        addParent,
        isAddingParent,
        parentsAddFields,
    };
});
