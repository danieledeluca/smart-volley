<script setup lang="ts">
import type { FormSubmitEvent, SelectItem } from '@nuxt/ui';
import type { Activity, Season } from '~~/lib/db/generated/prisma/client';

const emit = defineEmits<{
    submit: [event: FormSubmitEvent<AthleteFiltersSchema>];
}>();

const { data: seasons, pending: seasonsPending } = useFetch('/api/seasons', {
    key: 'seasons',
    lazy: true,
    transform: (data: Season[]): SelectItem[] => {
        return data.map((season) => {
            return {
                label: `${season.starterYear} - ${season.endYear}`,
                value: season.id,
            };
        });
    },
});

const { data: activities, pending: activitiesPending } = useFetch('/api/activities', {
    key: 'activities',
    lazy: true,
    transform: (data: Activity[]): SelectItem[] => {
        return data.map((activity) => {
            return {
                label: activity.name,
                value: activity.id,
            };
        });
    },
});

const state = reactive<Partial<AthleteFiltersSchema>>({
    season: undefined,
    activity: undefined,
});
</script>

<template>
    <UCard variant="subtle" class="max-w-md w-full mx-auto">
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
