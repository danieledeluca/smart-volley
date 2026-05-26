<script setup lang="ts">
useSeoMeta({
    title: $t('page.payments.title'),
});

const authStore = useAuthStore();
const { canEdit } = storeToRefs(authStore);

const enrollmentsStore = useEnrollmentsStore();
const {
    isLoading,
    enrollments,
    enrollmentsPending,
    enrollmentsError,
    enrollmentsFiltersState,
    enrollmentsFiltersFields,
} = storeToRefs(enrollmentsStore);

const formRef = useTemplateRef('formRef');

const tableColumns = getEnrollmentsTableColumns([
    'id',
    'athlete',
    'volleyAccount',
    'volleyBalance',
    'volleyBalanceSecondary',
    'firstInstallment',
    'secondInstallment',
    'thirdInstallment',
]);

if (canEdit.value) {
    tableColumns.push(getEnrollmentsTableActionsColumn());
}
</script>

<template>
    <DashboardPanel :title="$t('page.payments.title')">
        <template v-if="canEdit" #right>
            <AppSlideover
                :title="$t('form.add_enrollment.title')"
                :description="$t('form.add_enrollment.description')"
                :buttonProps="{
                    label: $t('page.enrollments.button.add'),
                    icon: 'i-lucide-plus',
                }"
                :footerButtonProps="{
                    label: $t('form.button.add'),
                }"
                :isLoading
                @submit="formRef?.submit()"
            >
                <EnrollmentForm ref="formRef" />
            </AppSlideover>
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
            :onSelect="onEnrollmentSelect"
        />
    </DashboardPanel>
</template>
