<script setup lang="ts">
import type { SelectEnrollmentsWithRelations } from '~~/lib/db/schema';

import Actions from '~/components/Enrollment/Actions.vue';

const { title, tableColumns: _tableColumns } = defineProps<{
    title: string;
    tableColumns: (keyof SelectEnrollmentsWithRelations)[];
}>();

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

const tableColumns = getEnrollmentsTableColumns(_tableColumns);

if (canEdit.value) {
    tableColumns.push(getActionsTableColumn(Actions, (row) => ({ enrollmentId: row.id })));
}
</script>

<template>
    <DashboardPanel :title :wrapBody="true">
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
            @select="(_event, row) => navigateTo(`/dashboard/enrollments/${row.original.id}`)"
        />
    </DashboardPanel>
</template>
