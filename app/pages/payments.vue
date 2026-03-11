<script setup lang="ts">
useSeoMeta({
    title: $t('page.payments.title'),
});

const enrollmentsStore = useEnrollmentsStore();
const {
    enrollments,
    enrollmentsPending,
    enrollmentsError,
    enrollmentsFiltersState,
    enrollmentsFiltersFields,
} = storeToRefs(enrollmentsStore);

const tableColumns = getEnrollmentsTableColumns([
    'athlete',
    'volley_account',
    'volley_balance',
    'volley_balance_secondary',
    'first_installment',
    'second_installment',
    'third_installment',
]);
</script>

<template>
    <UPageHeader
        :title="$t('page.payments.header.title')"
        :description="$t('page.payments.header.description')"
    />
    <ListFilters
        v-model:state="enrollmentsFiltersState"
        :isLoading="enrollmentsPending"
        :schema="enrollmentsFiltersSchema"
        :fields="enrollmentsFiltersFields"
        @update="enrollmentsStore.refreshEnrollments"
        @clear="enrollmentsStore.clearEnrollmentsFilters"
    />
    <ListTable
        :isLoading="enrollmentsPending"
        :error="enrollmentsError"
        :tableData="enrollments"
        :tableColumns
        :onSelect="onEnrollmentSelect"
    />
</template>
