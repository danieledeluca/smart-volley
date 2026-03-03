<script setup lang="ts">
useSeoMeta({
    title: $t('page.certificates.title'),
});

const enrollmentsStore = useEnrollmentsStore();
const {
    enrollments,
    enrollmentsPending,
    enrollmentsError,
    enrollmentsState,
    enrollmentsFiltersFields,
} = storeToRefs(enrollmentsStore);
</script>

<template>
    <UPageHeader
        :title="$t('page.certificates.header.title')"
        :description="$t('page.certificates.header.description')"
    />
    <ListFilters
        v-model:state="enrollmentsState"
        :isLoading="enrollmentsPending"
        :schema="enrollmentsFiltersSchema"
        :fields="enrollmentsFiltersFields"
        @submit="() => enrollmentsStore.refreshEnrollments()"
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
