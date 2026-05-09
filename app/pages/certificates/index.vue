<script setup lang="ts">
useSeoMeta({
    title: $t('page.certificates.title'),
});

const enrollmentsStore = useEnrollmentsStore();
const {
    enrollments,
    enrollmentsPending,
    enrollmentsError,
    enrollmentsFiltersState,
    enrollmentsFiltersFields,
} = storeToRefs(enrollmentsStore);

const tableColumns = getEnrollmentsTableColumns(['athlete', 'certificateExpirationDate', 'certificateStorageKey']);
</script>

<template>
    <UPageHeader
        :title="$t('page.certificates.header.title')"
        :description="$t('page.certificates.header.description')"
    />
    <ListFilters
        v-model:state="enrollmentsFiltersState"
        :schema="EnrollmentsFiltersSchema"
        :fields="enrollmentsFiltersFields"
        @update="enrollmentsStore.refreshEnrollments"
        @clear="enrollmentsStore.clearEnrollmentsFilters"
    />
    <ListTable
        :tableData="enrollments"
        :tableColumns
        :isLoading="enrollmentsPending"
        :error="enrollmentsError"
        :onSelect="onEnrollmentSelect"
    />
</template>
