<script setup lang="ts">
useSeoMeta({
    title: $t('page.payments.title'),
});

const enrollmentsStore = useEnrollmentsStore();
const {
    enrollments,
    enrollmentsPending,
    enrollmentsState,
    enrollmentsFields,
} = storeToRefs(enrollmentsStore);
</script>

<template>
    <UPageHeader
        :title="$t('page.payments.header.title')"
        :description="$t('page.payments.header.description')"
    />
    <ListFilters
        v-model:state="enrollmentsState"
        :isLoading="enrollmentsPending"
        :schema="enrollmentsFiltersSchema"
        :fields="enrollmentsFields"
        @submit="() => enrollmentsStore.refreshEnrollments()"
    />
    <ListTable
        :isLoading="enrollmentsPending"
        :tableData="enrollments"
        :tableColumns="getEnrollmentsTableColumns([
            'athlete',
            'volley_account',
            'volley_balance',
            'volley_balance_secondary',
            'first_installment',
            'second_installment',
            'third_installment',
        ])"
        :onSelect="onEnrollmentSelect"
    />
</template>
