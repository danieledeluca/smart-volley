import type { FormSubmitEvent } from '@nuxt/ui';
import type { FetchError } from 'ofetch';

export const useAthletesStore = defineStore('athletes', () => {
    const toast = useToast();
    const parentsStore = useParentsStore();

    const { parents, parentsPending } = storeToRefs(parentsStore);

    const showAthleteAddForm = ref(false);
    const isAddingAthlete = ref(false);

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

    const athleteAddState = reactive({ ...athleteAddInitialState });

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

    const clearAthletesFilters = () => {
        // Reset filters
        Object.assign(athletesFiltersState, athletesFiltersInitialState);

        // Refresh athletes
        refreshAthletes();
    };

    const closeAthleteAddForm = () => {
        // Hide form
        showAthleteAddForm.value = false;

        // Reset form
        Object.assign(athleteAddState, athleteAddInitialState);

        // Refresh athletes
        refreshAthletes();
    };

    const addAthlete = async (event: FormSubmitEvent<AthleteAddSchema>) => {
        isAddingAthlete.value = true;

        try {
            await $fetch('/api/athletes/add', {
                method: 'POST',
                body: event.data,
            });

            closeAthleteAddForm();

            toast.add({
                title: $t('form.add_athlete.success'),
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
            isAddingAthlete.value = false;
        }
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
                icon: 'i-lucide-user',
                fields: [
                    {
                        renderAs: 'input',
                        label: $t('form.field.name.label'),
                        name: 'name',
                        placeholder: $t('form.field.name.placeholder'),
                        required: true,
                    },
                    {
                        renderAs: 'input-date',
                        label: $t('form.field.birthday.label'),
                        name: 'birthday',
                        required: true,
                    },
                    {
                        renderAs: 'input',
                        label: $t('form.field.birthplace.label'),
                        name: 'birthplace',
                        placeholder: $t('form.field.birthplace.placeholder'),
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
                        label: $t('form.field.city.label'),
                        name: 'city',
                        placeholder: $t('form.field.city.placeholder'),
                        required: true,
                    },
                    {
                        renderAs: 'input',
                        label: $t('form.field.address.label'),
                        name: 'address',
                        placeholder: $t('form.field.address.placeholder'),
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
                ],
            },
            {
                title: $t('form.add_athlete.group.parent_information'),
                icon: 'i-lucide-user',
                fields: [
                    {
                        renderAs: 'select-menu',
                        label: $t('form.field.parent.label'),
                        name: 'parent_id',
                        items: parents.value,
                        loading: parentsPending.value,
                        placeholder: $t('form.field.parent.placeholder'),
                    },
                ],
            },
        ];
    });

    return {
        athletes,
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
