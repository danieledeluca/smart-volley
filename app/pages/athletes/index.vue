<script setup lang="ts">
useSeoMeta({
    title: $t('page.athletes.title'),
});

const enrollmentsStore = useEnrollmentsStore();
const { athletes, athletesPending, athletesState, athletesFields } = storeToRefs(enrollmentsStore);
</script>

<template>
    <UPageHeader
        :title="$t('page.athletes.header.title')"
        :description="$t('page.athletes.header.description')"
    />
    <ListFilters
        v-model:state="athletesState"
        :isLoading="athletesPending"
        :schema="athletesFiltersSchema"
        :fields="athletesFields"
        @submit="() => enrollmentsStore.refreshAthletes()"
    />
    <ListTable
        :isLoading="athletesPending"
        :tableData="athletes"
        :tableColumns="getAthletesTableColumns(['name', 'phone_number', 'email'])"
        :onSelect="onAthleteSelect"
    />
</template>
