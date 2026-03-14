import type { SelectItem } from '@nuxt/ui';

export const useParentsStore = defineStore('parents', () => {
    const parentAddInitialState: Partial<ParentAddSchema> = {
        name: undefined,
        tax_code: undefined,
        email: undefined,
    };

    const { data: parents, pending: parentsPending, refresh: refreshParents } = useLazyFetch('/api/parents', {
        headers: useRequestHeaders(['cookie']),
    });

    const parentsItems = computed(() => {
        return parents.value?.map<SelectItem>((parent) => {
            return {
                label: parent.name,
                value: parent.id,
            };
        });
    });

    const {
        showAddForm: showParentAddForm,
        isAdding: isAddingParent,
        state: parentAddState,
        add: addParent,
    } = useAddForm(
        parentAddInitialState,
        refreshParents,
        '/api/parents/add',
        $t('form.add_parent.success'),
    );

    const parentAddFields = computed<GroupFormField<ParentAddSchema>[]>(() => {
        return [
            {
                title: $t('form.add_parent.group.personal_information'),
                icon: 'i-lucide-user',
                fields: [
                    {
                        renderAs: 'input',
                        label: $t('form.field.name.label'),
                        name: 'name',
                        placeholder: $t('form.field.name.placeholder'),
                        required: true,
                        variant: 'subtle',
                    },
                    {
                        renderAs: 'input',
                        label: $t('form.field.tax_code.label'),
                        name: 'tax_code',
                        placeholder: $t('form.field.tax_code.placeholder'),
                        required: true,
                        variant: 'subtle',
                    },
                ],
            },
            {
                title: $t('form.add_parent.group.contacts'),
                icon: 'i-lucide-notebook',
                fields: [
                    {
                        renderAs: 'input',
                        label: $t('form.field.phone_number.label'),
                        type: 'tel',
                        name: 'phone_number',
                        placeholder: $t('form.field.phone_number.placeholder'),
                        required: true,
                        variant: 'subtle',
                    },
                    {
                        renderAs: 'input',
                        label: $t('form.field.email.label'),
                        type: 'email',
                        name: 'email',
                        placeholder: $t('form.field.email.placeholder'),
                        variant: 'subtle',
                    },
                ],
            },
        ];
    });

    return {
        parents,
        parentsItems,
        parentsPending,
        addParent,
        showParentAddForm,
        isAddingParent,
        parentAddState,
        parentAddFields,
    };
});
