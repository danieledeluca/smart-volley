<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui';

useSeoMeta({
    title: $t('page.athletes.title'),
});

const athletesStore = useAthletesStore();
const {
    athletes,
    athletesPending,
    athletesError,
    athletesState,
    athletesFiltersFields,
} = storeToRefs(athletesStore);

const pageHeaderLinks: ButtonProps[] = [
    {
        label: 'Add new athlete',
        icon: 'i-lucide-user-plus',
        to: '/athletes/add',
        variant: 'solid',
        color: 'primary',
    },
];
</script>

<template>
    <UPageHeader
        :title="$t('page.athletes.header.title')"
        :description="$t('page.athletes.header.description')"
        :links="pageHeaderLinks"
    />
    <ListFilters
        v-model:state="athletesState"
        :schema="athletesFiltersSchema"
        :fields="athletesFiltersFields"
        @update="() => athletesStore.refreshAthletes()"
    />
    <ListTable
        :isLoading="athletesPending"
        :error="athletesError"
        :tableData="athletes"
        :tableColumns="getAthletesTableColumns(['name', 'phone_number', 'email'])"
        :onSelect="onAthleteSelect"
    />
</template>
