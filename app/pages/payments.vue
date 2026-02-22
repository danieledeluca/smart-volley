<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui';

useSeoMeta({
    title: 'Pagamenti',
});

const isLoading = ref(false);
const isLoaded = ref(false);
const tableData = ref<AthletePayment[]>([]);

const tableColumns = getTableColumns<AthletePayment>([
    'name',
    'phoneNumber',
    'volleyAccount',
    'volleyBalance',
    'volleyBalanceSecondary',
    'firstInstallment',
    'secondInstallment',
    'thirdInstallment',
]);

async function onSubmit(event: FormSubmitEvent<AthleteFiltersSchema>) {
    try {
        isLoading.value = true;
        isLoaded.value = false;

        const athletesPayments = await $fetch<AthletePayment[]>('/api/payments', {
            query: {
                season: event.data.season,
                activity: event.data.activity,
            },
        });

        tableData.value = athletesPayments;
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
