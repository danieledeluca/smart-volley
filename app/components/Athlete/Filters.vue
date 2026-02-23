<script setup lang="ts">
import type { FormSubmitEvent, SelectMenuItem } from '@nuxt/ui';

const { showNameField = false } = defineProps<{
    showNameField?: boolean;
}>();

const emit = defineEmits<{
    submit: [event: FormSubmitEvent<AthleteFiltersSchema>];
}>();

const athletesStore = useAthletesStore();
const {
    seasons: _seasons,
    seasonsPending,
    activities: _activities,
    activitiesPending,
} = storeToRefs(athletesStore);

const seasons = computed(() => {
    return _seasons.value?.map<SelectMenuItem>((season) => {
        return {
            label: `${season.starterYear} - ${season.endYear}`,
            id: season.id,

        };
    }) || [];
});

const activities = computed(() => {
    return _activities.value?.map<SelectMenuItem>((activity) => {
        return {
            label: activity.name,
            id: activity.id,
        };
    }) || [];
});

const schema = showNameField ? athleteFiltersWithNameSchema : athleteFiltersWithoutNameSchema;
const state = reactive<Partial<AthleteFiltersSchema>>(
    showNameField
        ? {
                mode: 'withName',
                name: undefined,
                season: undefined,
                activity: undefined,
            }
        : {
                mode: 'withoutName',
                season: undefined,
                activity: undefined,
            },
);
</script>

<template>
    <UCard variant="subtle" class="mx-auto w-full max-w-md">
        <UForm
            :schema="schema"
            :state="state"
            class="space-y-5"
            @submit="emit('submit', $event)"
        >
            <UFormField
                v-if="showNameField && state.mode === 'withName'"
                :label="$t('form.name.label')"
                name="name"
                required
            >
                <UInput
                    v-model="state.name"
                    class="w-full"
                    :placeholder="$t('form.name.placeholder')"
                    icon="i-lucide-user"
                />
            </UFormField>

            <UFormField :label="$t('form.season.label')" name="season" :required="!showNameField">
                <USelectMenu
                    v-model="state.season"
                    :items="seasons"
                    class="w-full"
                    :placeholder="$t('form.season.placeholder')"
                    :loading="seasonsPending"
                    valueKey="id"
                    icon="i-lucide-calendar"
                    :searchInput="{ placeholder: $t('form.search.placeholder') }"
                />
            </UFormField>

            <UFormField :label="$t('form.activity.label')" name="activity" :required="!showNameField">
                <USelectMenu
                    v-model="state.activity"
                    :items="activities"
                    class="w-full"
                    :placeholder="$t('form.activity.placeholder')"
                    :loading="activitiesPending"
                    valueKey="id"
                    icon="i-lucide-zap"
                    :searchInput="{ placeholder: $t('form.search.placeholder') }"
                />
            </UFormField>

            <UButton type="submit" :loadingAuto="true" class="w-full justify-center">
                {{ $t('form.search.submit') }}
            </UButton>
        </UForm>
    </UCard>
</template>
