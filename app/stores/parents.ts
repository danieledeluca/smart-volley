import type { FormError, FormSubmitEvent, SelectMenuItem } from '@nuxt/ui';
import type { InsertParent } from '~~/lib/db/schema';
import type { FetchError } from 'ofetch';

export const useParentsStore = defineStore('parents', () => {
    const { $csrfFetch } = useNuxtApp();
    const toast = useToast();

    const isAddingParent = ref(false);
    const addingParentErrors = ref<FormError[]>([]);

    const parentAddInitialState: Partial<InsertParent> = {
        name: undefined,
        fiscalCode: undefined,
        phoneNumber: undefined,
        email: undefined,
    };

    const parentAddState = reactive({ ...parentAddInitialState });

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

    const clearParentAddForm = () => {
        Object.assign(parentAddState, parentAddInitialState);

        refreshParents();
    };

    const addParent = async (event: FormSubmitEvent<InsertParent>) => {
        try {
            isAddingParent.value = true;

            await $csrfFetch('/api/parents', {
                method: 'POST',
                body: event.data,
            });

            clearParentAddForm();

            toast.add({
                description: $t('form.add_parent.success'),
                color: 'success',
                icon: 'i-lucide-circle-check',
            });
        } catch (err) {
            const error = err as FetchError;

            if (error.data?.data) {
                addingParentErrors.value = error.data?.data;
            } else {
                toast.add({
                    description: error.statusMessage || DEFAULT_SERVER_ERROR_MESSAGE,
                    color: 'error',
                    icon: 'i-lucide-circle-x',
                });
            }
        } finally {
            isAddingParent.value = false;
        }
    };

    const parentAddFields = computed<FormFieldGroup<InsertParent>[]>(() => {
        return [
            {
                title: $t('form.add_parent.group.personal_information'),
                icon: 'i-lucide-user',
                fields: [
                    {
                        renderAs: 'input',
                        formFieldProps: {
                            label: $t('form.field.name.label'),
                            name: 'name',
                            required: true,
                        },
                        inputProps: {
                            placeholder: $t('form.field.name.placeholder'),
                        },
                    },
                    {
                        renderAs: 'input',
                        formFieldProps: {
                            label: $t('form.field.fiscal_code.label'),
                            name: 'fiscalCode',
                            required: true,
                        },
                        inputProps: {
                            placeholder: $t('form.field.fiscal_code.placeholder'),
                        },
                    },
                ],
            },
            {
                title: $t('form.add_parent.group.contacts'),
                icon: 'i-lucide-notebook',
                fields: [
                    {
                        renderAs: 'input',
                        formFieldProps: {
                            label: $t('form.field.phone_number.label'),
                            name: 'phoneNumber',
                        },
                        inputProps: {
                            placeholder: $t('form.field.phone_number.placeholder'),
                        },
                    },
                    {
                        renderAs: 'input',
                        formFieldProps: {
                            label: $t('form.field.email.label'),
                            name: 'email',
                        },
                        inputProps: {
                            placeholder: $t('form.field.email.placeholder'),
                        },
                    },
                ],
            },
        ];
    });

    return {
        isAddingParent,
        addingParentErrors,
        parents,
        parentsItems,
        parentsPending,
        parentsError,
        parentAddState,
        parentAddFields,
        refreshParents,
        addParent,
    };
});
