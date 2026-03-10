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
</script>

<template>
    <UPageHeader
        :title="$t('page.certificates.header.title')"
        :description="$t('page.certificates.header.description')"
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
        :tableColumns="getEnrollmentsTableColumns([
            'athlete',
            'certificate_expiration_date',
            'certificate_download_url',
        ])"
        :onSelect="onEnrollmentSelect"
    />
</template>
