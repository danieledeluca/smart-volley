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
                label="Name"
                name="name"
                required
            >
                <UInput
                    v-model="state.name"
                    class="w-full"
                    placeholder="Search an athlete"
                    icon="i-lucide-user"
                />
            </UFormField>

            <UFormField label="Season" name="season" :required="!showNameField">
                <USelectMenu
                    v-model="state.season"
                    :items="seasons"
                    class="w-full"
                    placeholder="Select a season"
                    :loading="seasonsPending"
                    valueKey="id"
                    icon="i-lucide-calendar"
                />
            </UFormField>

            <UFormField label="Activity" name="activity" :required="!showNameField">
                <USelectMenu
                    v-model="state.activity"
                    :items="activities"
                    class="w-full"
                    placeholder="Select an activity"
                    :loading="activitiesPending"
                    valueKey="id"
                    icon="i-lucide-zap"
                />
            </UFormField>

            <UButton type="submit" :loadingAuto="true" class="w-full justify-center">
                Search
            </UButton>
        </UForm>
    </UCard>
</template>
