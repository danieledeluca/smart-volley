<script setup lang="ts">
useSeoMeta({
    title: $t('page.certificates.title'),
});

const authStore = useAuthStore();
const { canEdit } = storeToRefs(authStore);

const enrollmentsStore = useEnrollmentsStore();
const {
    enrollments,
    enrollmentsPending,
    enrollmentsError,
    filterState,
    filterFields,
} = storeToRefs(enrollmentsStore);

const enrollmentFormRef = useTemplateRef('enrollmentFormRef');

const tableColumns = getEnrollmentsTableColumns([
    'id',
    'athlete',
    'certificateExpirationDate',
    'certificateFile',
]);

if (canEdit.value) {
    tableColumns.push(getEnrollmentsTableActionsColumn());
}
</script>

<template>
    <DashboardPanel :title="$t('page.certificates.title')" :wrapBody="true">
        <template v-if="canEdit" #right>
            <AppSlideover
                :title="$t('form.enrollment.add.title')"
                :description="$t('form.enrollment.add.description')"
                :buttonProps="{
                    label: $t('page.enrollments.button.add'),
                    icon: 'i-lucide-plus',
                }"
                :footerButtonProps="{
                    label: $t('form.button.add'),
                }"
                :isLoading="Boolean(enrollmentFormRef?.isLoading())"
                @submit="enrollmentFormRef?.submit()"
            >
                <EnrollmentAddForm ref="enrollmentFormRef" />
            </AppSlideover>
        </template>
        <ListFilters
            v-model:state="filterState"
            :schema="EnrollmentsFiltersSchema"
            :fields="filterFields"
            @update="enrollmentsStore.refreshEnrollments"
            @clear="enrollmentsStore.clearFilters"
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
