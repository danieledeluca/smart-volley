import type { FormError, FormSubmitEvent, SelectMenuItem } from '@nuxt/ui';
import type { InsertAthlete } from '~~/lib/db/schema';
import type { FetchError } from 'ofetch';

import { CalendarDate } from '@internationalized/date';

import type { AthletesFiltersSchema } from '#imports';

export const useAthletesStore = defineStore('athletes', () => {
    const { $csrfFetch } = useNuxtApp();
    const toast = useToast();

    const parentsStore = useParentsStore();

    const { parentsItems, parentsPending } = storeToRefs(parentsStore);

    const isAddingAthlete = ref(false);
    const addingAthleteErrors = ref<FormError[]>([]);

    const athletesFiltersInitialState: AthletesFiltersSchema = {
        name: undefined,
    };

    const athleteAddInitialState: Partial<InsertAthlete> = {
        name: undefined,
        birthdate: undefined,
        birthplace: undefined,
        fiscalCode: undefined,
        city: undefined,
        address: undefined,
        phoneNumber: undefined,
        email: undefined,
        parentId: undefined,
    };

    const athletesFiltersState = reactive({ ...athletesFiltersInitialState });

    const athleteAddState = reactive({ ...athleteAddInitialState });

    const {
        data: athletes,
        pending: athletesPending,
        error: athletesError,
        refresh: refreshAthletes,
    } = useLazyFetch('/api/athletes', {
        headers: useRequestHeaders(['cookie']),
        query: athletesFiltersState,
        watch: false,
    });

    const athletesItems = computed(() => {
        return athletes.value?.map<SelectMenuItem>((athlete) => {
            return {
                label: athlete.name,
                description: athlete.fiscalCode,
                value: athlete.id,
            };
        });
    });

    const clearAthletesFilters = () => {
        Object.assign(athletesFiltersState, athletesFiltersInitialState);

        refreshAthletes();
    };

    const clearAthleteAddForm = () => {
        Object.assign(athleteAddState, athleteAddInitialState);

        refreshAthletes();
    };

    const addAthlete = async (event: FormSubmitEvent<InsertAthlete>) => {
        try {
            isAddingAthlete.value = true;

            await $csrfFetch('/api/athletes', {
                method: 'POST',
                body: event.data,
            });

            clearAthleteAddForm();

            toast.add({
                description: $t('form.add_athlete.success'),
                color: 'success',
            });
        } catch (err) {
            const error = err as FetchError;

            if (error.data?.data) {
                addingAthleteErrors.value = error.data?.data;
            } else {
                toast.add({
                    description: error.statusMessage || 'An unknown error occurred.',
                    color: 'error',
                });
            }
        } finally {
            isAddingAthlete.value = false;
        }
    };

    const athletesFiltersFields = computed<FormField<AthletesFiltersSchema>[][]>(() => {
        return [
            [
                {
                    renderAs: 'input',
                    debounce: true,
                    formFieldProps: {
                        label: $t('form.field.name.label'),
                        name: 'name',
                    },
                    inputProps: {
                        placeholder: $t('form.field.name.placeholder'),
                        icon: 'i-lucide-search',
                    },
                },
            ],
        ];
    });

    const currentDate = new Date();
    const maxDate = new CalendarDate(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate());

    const athleteAddFields = computed<FormFieldGroup<InsertAthlete>[]>(() => {
        return [
            {
                title: $t('form.add_athlete.group.personal_information'),
                icon: 'i-lucide-id-card',
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
                        renderAs: 'input-date',
                        formFieldProps: {
                            label: $t('form.field.birthdate.label'),
                            name: 'birthdate',
                            required: true,
                        },
                        inputProps: {
                            maxValue: maxDate,
                        },
                        calendarProps: {
                            maxValue: maxDate,
                        },
                    },
                    {
                        renderAs: 'input',
                        formFieldProps: {
                            label: $t('form.field.birthplace.label'),
                            name: 'birthplace',
                            required: true,
                        },
                        inputProps: {
                            placeholder: $t('form.field.birthplace.placeholder'),
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
                title: $t('form.add_athlete.group.address_contacts'),
                icon: 'i-lucide-notebook',
                fields: [
                    {
                        renderAs: 'input',
                        formFieldProps: {
                            label: $t('form.field.city.label'),
                            name: 'city',
                            required: true,
                        },
                        inputProps: {
                            placeholder: $t('form.field.city.placeholder'),
                        },
                    },
                    {
                        renderAs: 'input',
                        formFieldProps: {
                            label: $t('form.field.address.label'),
                            name: 'address',
                            required: true,
                        },
                        inputProps: {
                            placeholder: $t('form.field.address.placeholder'),
                        },
                    },
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
            {
                title: $t('form.add_athlete.group.parent'),
                icon: 'i-lucide-user',
                fields: [
                    {
                        renderAs: 'select-menu',
                        formFieldProps: {
                            name: 'parentId',
                        },
                        selectProps: {
                            placeholder: $t('form.field.parent_id.placeholder'),
                            items: parentsItems.value,
                            loading: parentsPending.value,
                        },
                    },
                ],
            },
        ];
    });

    return {
        isAddingAthlete,
        addingAthleteErrors,
        athletes,
        athletesItems,
        athletesPending,
        athletesError,
        athletesFiltersState,
        athletesFiltersFields,
        athleteAddState,
        athleteAddFields,
        refreshAthletes,
        clearAthletesFilters,
        addAthlete,
    };
});
