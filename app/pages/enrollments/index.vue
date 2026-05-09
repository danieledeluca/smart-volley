<script setup lang="ts">
useSeoMeta({
    title: $t('page.enrollments.title'),
});

const enrollmentsStore = useEnrollmentsStore();
const {
    isAddingEnrollment,
    enrollments,
    enrollmentsPending,
    enrollmentsError,
    enrollmentsFiltersState,
    enrollmentsFiltersFields,
} = storeToRefs(enrollmentsStore);

const formRef = useTemplateRef('formRef');

const tableColumns = getEnrollmentsTableColumns(['athlete', 'season', 'activity', 'course']);
</script>

<template>
    <UPageHeader :title="$t('page.enrollments.header.title')" :description="$t('page.enrollments.header.description')">
        <template #links>
            <FormAddSlideover
                :title="$t('form.add_enrollment.title')"
                :description="$t('form.add_enrollment.description')"
                :buttonLabel="$t('page.enrollments.button.add')"
                buttonIcon="i-lucide-list-plus"
                :isLoading="isAddingEnrollment"
                @submit="formRef?.submit()"
            >
                <FormAddEnrollment ref="formRef" />
            </FormAddSlideover>
        </template>
    </UPageHeader>
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
        @select="onEnrollmentSelect"
    />
</template>
