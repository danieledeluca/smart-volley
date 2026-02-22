<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui';

useSeoMeta({
    title: 'Anagrafica',
});

const isLoading = ref(false);
const isLoaded = ref(false);
const tableData = ref<AthleteListItem[]>([]);

const tableColumns = getTableColumns<AthleteListItem>(['name', 'season', 'activity']);

async function onSubmit(event: FormSubmitEvent<AthleteFiltersSchema>) {
    try {
        isLoading.value = true;
        isLoaded.value = false;

        const athletes = await $fetch<AthleteListItem[]>('/api/athletes', {
            query: {
                name: event.data.mode === 'withName' ? event.data.name : '',
                season: event.data.season,
                activity: event.data.activity,
            },
        });

        tableData.value = athletes;
    } finally {
        isLoading.value = false;
        isLoaded.value = true;
    }
}
</script>

<template>
    <AthleteFilters showNameField @submit="onSubmit" />
    <AthleteTable
        :showSearchField="false"
        :isLoading
        :isLoaded
        :tableData
        :tableColumns
    />
</template>
