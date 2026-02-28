<script setup lang="ts">
useSeoMeta({
    title: $t('page.enrollments.title'),
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
        :title="$t('page.enrollments.header.title')"
        :description="$t('page.enrollments.header.description')"
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
        :tableColumns="getEnrollmentsTableColumns(['athlete', 'season', 'activity', 'course'])"
        :onSelect="onEnrollmentSelect"
    />
</template>
