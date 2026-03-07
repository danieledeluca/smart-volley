import type { FormSubmitEvent } from '@nuxt/ui';
import type { FetchError } from 'ofetch';

export const useAthletesStore = defineStore('athletes', () => {
    const toast = useToast();
    const parentsStore = useParentsStore();

    const { parents, parentsPending } = storeToRefs(parentsStore);

    const isAddingAthlete = ref(false);

    const athletesState = reactive<AthletesFiltersSchema>({
        name: undefined,
    });

    const {
        data: athletes,
        pending: athletesPending,
        error: athletesError,
        refresh: refreshAthletes,
    } = useLazyFetch<AthleteListItem[]>('/api/athletes', {
        headers: useRequestHeaders(['cookie']),
        query: athletesState,
        watch: false,
    });

    const addAthlete = async (event: FormSubmitEvent<AddAthleteSchema>) => {
        isAddingAthlete.value = true;

        try {
            await $fetch('/api/athletes/add', {
                method: 'POST',
                body: event.data,
            });

            refreshAthletes();

            toast.add({
                title: 'Athlete added successfully',
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

    const athletesFiltersFields = computed<FormField<AthletesFiltersSchema>[]>(() => {
        return [
            {
                renderAs: 'input',
                label: $t('form.name.label'),
                name: 'name',
                placeholder: $t('form.name.placeholder'),
                icon: 'i-lucide-user',
                debounce: true,
            },
        ];
    });

    const athleteAddFields = computed<FormField<AddAthleteSchema>[]>(() => {
        return [
            {
                renderAs: 'input',
                label: 'Nome e cognome',
                name: 'name',
                placeholder: 'Enter your name',
                required: true,
            },
            {
                renderAs: 'input-date',
                label: 'Birthday',
                name: 'birthday',
                required: true,
            },
            {
                renderAs: 'input',
                label: 'Birthplace',
                name: 'birthplace',
                placeholder: 'Enter your birthplace',
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
                label: 'City',
                name: 'city',
                placeholder: 'Enter your city',
                required: true,
            },
            {
                renderAs: 'input',
                label: 'Address',
                name: 'address',
                placeholder: 'Enter your address',
                required: true,
            },
            {
                renderAs: 'input',
                label: 'Phone number',
                type: 'tel',
                name: 'phone_number',
                placeholder: 'Enter your phone number',
                required: true,
            },
            {
                renderAs: 'input',
                label: 'Email',
                type: 'email',
                name: 'email',
                placeholder: 'Enter your email',
            },
            {
                renderAs: 'select-menu',
                label: 'Parent',
                name: 'parent_id',
                items: parents.value,
                loading: parentsPending.value,
                placeholder: 'Select your parent',
            },
        ];
    });

    return {
        athletes,
        athletesPending,
        athletesError,
        refreshAthletes,
        addAthlete,
        isAddingAthlete,
        athletesState,
        athletesFiltersFields,
        athleteAddFields,
    };
});
