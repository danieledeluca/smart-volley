<script setup lang="ts">
useSeoMeta({
    title: $t('page.enrollments.title'),
});

const enrollmentsStore = useEnrollmentsStore();
const {
    enrollments,
    enrollmentsPending,
    enrollmentsError,
    enrollmentsFiltersState,
    enrollmentsFiltersFields,
    showEnrollmentAddForm,
    isAddingEnrollment,
} = storeToRefs(enrollmentsStore);

const tableColumns = getEnrollmentsTableColumns(['athlete', 'season', 'activity', 'course']);

const formRef = useTemplateRef('form');
</script>

<template>
    <UPageHeader
        :title="$t('page.enrollments.header.title')"
        :description="$t('page.enrollments.header.description')"
    >
        <template #links>
            <FormSlideOverAdd
                v-model:open="showEnrollmentAddForm"
                v-model:adding="isAddingEnrollment"
                :title="$t('form.add_enrollment.title')"
                :description="$t('form.add_enrollment.description')"
                :buttonLabel="$t('page.enrollments.button.add')"
                buttonIcon="i-lucide-list-plus"
                :formRef
            >
                <FormAddEnrollment ref="form" />
            </FormSlideOverAdd>
        </template>
    </UPageHeader>
    <ListFilters
        v-model:state="enrollmentsFiltersState"
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
