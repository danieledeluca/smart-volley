import type { SelectItem } from '@nuxt/ui';

export const useSeasonsStore = defineStore('seasons', () => {
    const seasonAddInitialState: Partial<SeasonAddSchema> = {
        starter_year: new Date().getFullYear(),
        end_year: new Date().getFullYear() + 1,
    };

    const { data: seasons, pending: seasonsPending, refresh: refreshSeasons } = useLazyFetch('/api/seasons', {
        headers: useRequestHeaders(['cookie']),
    });

    const seasonsItems = computed(() => {
        return seasons.value?.map<SelectItem>((season) => {
            return {
                label: `${season.starter_year} - ${season.end_year}`,
                value: season.id,
            };
        });
    });

    const {
        showAddForm: showSeasonAddForm,
        isAdding: isAddingSeason,
        state: seasonAddState,
        add: addSeason,
    } = useAddForm(
        seasonAddInitialState,
        refreshSeasons,
        '/api/seasons/add',
        'Season added successfully',
    );

    const seasonAddFields = computed<FormField<SeasonAddSchema>[]>(() => {
        return [
            {
                renderAs: 'input-number',
                label: $t('form.field.starter_year.label'),
                name: 'starter_year',
                placeholder: $t('form.field.starter_year.placeholder'),
                required: true,
                variant: 'subtle',
                formatOptions: {
                    useGrouping: false,
                },
            },
            {
                renderAs: 'input-number',
                label: $t('form.field.end_year.label'),
                name: 'end_year',
                placeholder: $t('form.field.end_year.placeholder'),
                required: true,
                variant: 'subtle',
                formatOptions: {
                    useGrouping: false,
                },
            },

        ];
    });

    return {
        seasons,
        seasonsItems,
        seasonsPending,
        addSeason,
        showSeasonAddForm,
        isAddingSeason,
        seasonAddState,
        seasonAddFields,
    };
});
