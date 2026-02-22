<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui';

useSeoMeta({
    title: 'Contatti',
});

const isLoading = ref(false);
const isLoaded = ref(false);
const tableData = ref<AthleteContact[]>([]);

const tableColumns = getTableColumns<AthleteContact>(['name', 'phoneNumber', 'email']);

async function onSubmit(event: FormSubmitEvent<AthleteFiltersSchema>) {
    try {
        isLoading.value = true;
        isLoaded.value = false;

        const athletesContacts = await $fetch<AthleteContact[]>('/api/contacts', {
            query: {
                season: event.data.season,
                activity: event.data.activity,
            },
        });

        tableData.value = athletesContacts;
    } finally {
        isLoading.value = false;
        isLoaded.value = true;
    }
}
</script>

<template>
    <AthleteFilters @submit="onSubmit" />
    <AthleteTable
        :isLoading
        :isLoaded
        :tableData
        :tableColumns
    />
</template>
