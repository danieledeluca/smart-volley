import type { FormError, FormSubmitEvent, SelectMenuItem } from '@nuxt/ui';
import type { InsertSeason } from '~~/lib/db/schema';
import type { FetchError } from 'ofetch';

export const useSeasonsStore = defineStore('seasons', () => {
    const { $csrfFetch } = useNuxtApp();
    const toast = useToast();

    const isAddingSeason = ref(false);
    const addingSeasonErrors = ref<FormError[]>([]);

    const seasonAddInitialState: Partial<InsertSeason> = {
        startYear: new Date().getFullYear(),
        endYear: new Date().getFullYear() + 1,
    };

    const seasonAddState = reactive({ ...seasonAddInitialState });

    const {
        data: seasons,
        pending: seasonsPending,
        error: seasonsError,
        refresh: refreshSeasons,
    } = useLazyFetch('/api/seasons', {
        headers: useRequestHeaders(['cookie']),
    });

    const seasonsItems = computed(() => {
        return seasons.value?.map<SelectMenuItem>((season) => {
            return {
                label: `${season.startYear} - ${season.endYear}`,
                value: season.id,
            };
        });
    });

    const clearSeasonAddForm = () => {
        Object.assign(seasonAddState, seasonAddInitialState);

        refreshSeasons();
    };

    const addSeason = async (event: FormSubmitEvent<InsertSeason>) => {
        try {
            isAddingSeason.value = true;

            await $csrfFetch('/api/seasons', {
                method: 'POST',
                body: event.data,
            });

            clearSeasonAddForm();

            toast.add({
                description: $t('form.add_season.success'),
                color: 'success',
            });
        } catch (err) {
            const error = err as FetchError;

            if (error.data?.data) {
                addingSeasonErrors.value = error.data?.data;
            } else {
                toast.add({
                    description: error.statusMessage || 'An unknown error occurred.',
                    color: 'error',
                });
            }
        } finally {
            isAddingSeason.value = false;
        }
    };

    const seasonAddFields = computed<FormField<InsertSeason>[]>(() => {
        return [
            {
                renderAs: 'input-number',
                formFieldProps: {
                    label: $t('form.field.start_year.label'),
                    name: 'startYear',
                    required: true,
                },
                inputProps: {
                    placeholder: $t('form.field.start_year.placeholder'),
                    variant: 'subtle',
                    formatOptions: {
                        useGrouping: false,
                    },
                },
            },
            {
                renderAs: 'input-number',
                formFieldProps: {
                    label: $t('form.field.end_year.label'),
                    name: 'endYear',
                    required: true,
                },
                inputProps: {
                    placeholder: $t('form.field.end_year.placeholder'),
                    variant: 'subtle',
                    formatOptions: {
                        useGrouping: false,
                    },
                },
            },
        ];
    });

    return {
        isAddingSeason,
        addingSeasonErrors,
        seasons,
        seasonsItems,
        seasonsPending,
        seasonsError,
        seasonAddState,
        seasonAddFields,
        refreshSeasons,
        addSeason,
    };
});
