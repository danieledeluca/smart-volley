<script setup lang="ts">
useSeoMeta({
    title: $t('page.athletes.title'),
});

const enrollmentsStore = useEnrollmentsStore();
const {
    athletes,
    athletesPending,
    athletesError,
    athletesState,
    athletesFiltersFields,
} = storeToRefs(enrollmentsStore);
</script>

<template>
    <UPageHeader
        :title="$t('page.athletes.header.title')"
        :description="$t('page.athletes.header.description')"
    />
    <ListFilters
        v-model:state="athletesState"
        :schema="athletesFiltersSchema"
        :fields="athletesFiltersFields"
        @update="() => enrollmentsStore.refreshAthletes()"
    />
    <ListTable
        :isLoading="athletesPending"
        :error="athletesError"
        :tableData="athletes"
        :tableColumns="getAthletesTableColumns(['name', 'phone_number', 'email'])"
        :onSelect="onAthleteSelect"
    />
</template>
