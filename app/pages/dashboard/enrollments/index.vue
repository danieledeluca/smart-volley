<script setup lang="ts">
useSeoMeta({
    title: $t('page.enrollments.title'),
});

const authStore = useAuthStore();
const { canEdit } = storeToRefs(authStore);

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

const tableColumns = getEnrollmentsTableColumns(['id', 'athlete', 'season', 'activity', 'course']);
</script>

<template>
    <DashboardPanel :title="$t('page.enrollments.title')">
        <template v-if="canEdit" #right>
            <FormAddSlideover
                :title="$t('form.add_enrollment.title')"
                :description="$t('form.add_enrollment.description')"
                :buttonLabel="$t('page.enrollments.button.add')"
                buttonIcon="i-lucide-plus"
                :isLoading="isAddingEnrollment"
                @submit="formRef?.submit()"
            >
                <FormAddEnrollment ref="formRef" />
            </FormAddSlideover>
        </template>
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
    </DashboardPanel>
</template>
