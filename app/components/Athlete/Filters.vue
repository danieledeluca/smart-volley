<script setup lang="ts">
import type { FormSubmitEvent, SelectItem } from '@nuxt/ui';

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
    return _seasons.value?.map<SelectItem>((season) => {
        return {
            label: `${season.starterYear} - ${season.endYear}`,
            value: season.id,
        };
    }) || [];
});

const activities = computed(() => {
    return _activities.value?.map<SelectItem>((activity) => {
        return {
            label: activity.name,
            value: activity.id,
        };
    }) || [];
});

const state = reactive<Partial<AthleteFiltersSchema>>({
    season: undefined,
    activity: undefined,
});
</script>

<template>
    <UCard variant="subtle" class="mx-auto w-full max-w-md">
        <UForm
            :schema="athleteFiltersSchema"
            :state="state"
            class="space-y-5"
            @submit="emit('submit', $event)"
        >
            <UFormField label="Season" name="season" required>
                <USelect
                    v-model="state.season"
                    :items="seasons"
                    class="w-full"
                    placeholder="Select a season"
                    :loading="seasonsPending"
                />
            </UFormField>

            <UFormField label="Activity" name="activity" required>
                <USelect
                    v-model="state.activity"
                    :items="activities"
                    class="w-full"
                    placeholder="Select an activity"
                    :loading="activitiesPending"
                />
            </UFormField>

            <UButton type="submit" :loadingAuto="true" class="w-full justify-center">
                Search
            </UButton>
        </UForm>
    </UCard>
</template>
