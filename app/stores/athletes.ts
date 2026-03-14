import type { SelectItem } from '@nuxt/ui';

export const useAthletesStore = defineStore('athletes', () => {
    const parentsStore = useParentsStore();

    const { parentsItems, parentsPending } = storeToRefs(parentsStore);

    const athletesFiltersInitialState: AthletesFiltersSchema = {
        name: undefined,
    };

    const athletesFiltersState = reactive({ ...athletesFiltersInitialState });

    const athleteAddInitialState: Partial<AthleteAddSchema> = {
        name: undefined,
        birthday: undefined,
        birthplace: undefined,
        tax_code: undefined,
        city: undefined,
        address: undefined,
        phone_number: undefined,
        email: undefined,
        parent_id: undefined,
    };

    const {
        data: athletes,
        pending: athletesPending,
        error: athletesError,
        refresh: refreshAthletes,
    } = useLazyFetch<AthleteListItem[]>('/api/athletes', {
        headers: useRequestHeaders(['cookie']),
        query: athletesFiltersState,
        watch: false,
    });

    const athletesItems = computed(() => {
        return athletes.value?.map<SelectItem>((athlete) => {
            return {
                label: athlete.name,
                value: athlete.id,
            };
        });
    });

    const {
        showAddForm: showAthleteAddForm,
        isAdding: isAddingAthlete,
        state: athleteAddState,
        add: addAthlete,
    } = useAddForm(
        athleteAddInitialState,
        refreshAthletes,
        '/api/athletes/add',
        $t('form.add_athlete.success'),
    );

    const clearAthletesFilters = () => {
        // Reset filters
        Object.assign(athletesFiltersState, athletesFiltersInitialState);

        // Refresh athletes
        refreshAthletes();
    };

    const athletesFiltersFields = computed<FormField<AthletesFiltersSchema>[][]>(() => {
        return [
            [
                {
                    renderAs: 'input',
                    label: $t('form.field.name.label'),
                    name: 'name',
                    placeholder: $t('form.field.name.placeholder'),
                    icon: 'i-lucide-user',
                    debounce: true,
                },
            ],
        ];
    });

    const athleteAddFields = computed<GroupFormField<AthleteAddSchema>[]>(() => {
        return [
            {
                title: $t('form.add_athlete.group.personal_information'),
                icon: 'i-lucide-id-card',
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
                        renderAs: 'input-date',
                        label: $t('form.field.birthday.label'),
                        name: 'birthday',
                        required: true,
                        variant: 'subtle',
                    },
                    {
                        renderAs: 'input',
                        label: $t('form.field.birthplace.label'),
                        name: 'birthplace',
                        placeholder: $t('form.field.birthplace.placeholder'),
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
                title: $t('form.add_athlete.group.address_contacts'),
                icon: 'i-lucide-notebook',
                fields: [
                    {
                        renderAs: 'input',
                        label: $t('form.field.city.label'),
                        name: 'city',
                        placeholder: $t('form.field.city.placeholder'),
                        required: true,
                        variant: 'subtle',
                    },
                    {
                        renderAs: 'input',
                        label: $t('form.field.address.label'),
                        name: 'address',
                        placeholder: $t('form.field.address.placeholder'),
                        required: true,
                        variant: 'subtle',
                    },
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
            {
                title: $t('form.add_athlete.group.parent'),
                icon: 'i-lucide-user',
                fields: [
                    {
                        renderAs: 'select-menu',
                        label: $t('form.field.parent.label'),
                        name: 'parent_id',
                        items: parentsItems.value,
                        loading: parentsPending.value,
                        placeholder: $t('form.field.parent.placeholder'),
                        variant: 'subtle',
                    },
                ],
            },
        ];
    });

    return {
        athletes,
        athletesItems,
        athletesPending,
        athletesError,
        refreshAthletes,
        clearAthletesFilters,
        addAthlete,
        showAthleteAddForm,
        isAddingAthlete,
        athletesFiltersState,
        athletesFiltersFields,
        athleteAddState,
        athleteAddFields,
    };
});
