import type { FormSubmitEvent, SelectItem } from '@nuxt/ui';
import type { FetchError } from 'ofetch';

export const useParentsStore = defineStore('parents', () => {
    const toast = useToast();

    const showParentAddForm = ref(false);
    const isAddingParent = ref(false);

    const parentAddInitialState: Partial<ParentAddSchema> = {
        name: undefined,
        tax_code: undefined,
        email: undefined,
    };

    const parentAddState = reactive({ ...parentAddInitialState });

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

    const closeParentAddForm = () => {
        // Hide form
        showParentAddForm.value = false;

        // Reset form
        Object.assign(parentAddState, parentAddInitialState);

        // Refresh parents
        refreshParents();
    };

    const addParent = async (event: FormSubmitEvent<ParentAddSchema>) => {
        isAddingParent.value = true;

        try {
            await $fetch('/api/parents/add', {
                method: 'POST',
                body: event.data,
            });

            closeParentAddForm();

            toast.add({
                title: $t('form.add_parent.success'),
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

    const parentsAddFields = computed<FormField<ParentAddSchema>[]>(() => {
        return [
            {
                renderAs: 'input',
                label: $t('form.field.name.label'),
                name: 'name',
                placeholder: $t('form.field.name.placeholder'),
                required: true,
            },
            {
                renderAs: 'input',
                label: $t('form.field.tax_code.label'),
                name: 'tax_code',
                placeholder: $t('form.field.tax_code.placeholder'),
                required: true,
            },
            {
                renderAs: 'input',
                label: $t('form.field.phone_number.label'),
                type: 'tel',
                name: 'phone_number',
                placeholder: $t('form.field.phone_number.placeholder'),
                required: true,
            },
            {
                renderAs: 'input',
                label: $t('form.field.email.label'),
                type: 'email',
                name: 'email',
                placeholder: $t('form.field.email.placeholder'),
            },
        ];
    });

    return {
        parents,
        parentsPending,
        refreshParents,
        addParent,
        showParentAddForm,
        isAddingParent,
        parentAddState,
        parentsAddFields,
    };
});
