<script setup lang="ts">
import type { SelectEnrollmentsWithRelations } from '~~/lib/db/schema';

import DetailsActions from '~/components/Enrollment/DetailsActions.vue';

const { title, tableColumns: _tableColumns } = defineProps<{
    title: string;
    tableColumns: (keyof SelectEnrollmentsWithRelations)[];
}>();

const authStore = useAuthStore();
const enrollmentsStore = useEnrollmentsStore();
const enrollmentFormRef = useTemplateRef('enrollmentFormRef');
const enrollmentTableRef = useTemplateRef('enrollmentTableRef');

const { canEdit } = storeToRefs(authStore);
const {
    enrollments,
    enrollmentsPending,
    enrollmentsError,
    filterState,
    filterFields,
} = storeToRefs(enrollmentsStore);

const tableColumns = getEnrollmentsTableColumns(_tableColumns);
tableColumns.unshift(getSelectTableColumn());
tableColumns.push(getActionsTableColumn(DetailsActions, (row) => ({ enrollmentId: row.id })));
</script>

<template>
    <DashboardPanel :title>
        <template v-if="canEdit" #right>
            <AppSlideover
                :title="$t('form.enrollment.add.title')"
                :description="$t('form.enrollment.add.description')"
                :buttonProps="{
                    label: $t('page.enrollments.button.add'),
                    icon: 'i-lucide-plus',
                }"
                :submitButtonProps="{
                    label: $t('form.button.add'),
                    loading: enrollmentFormRef?.isLoading(),
                }"
                :preventClose="enrollmentFormRef?.isLoading()"
                @submit="enrollmentFormRef?.submit"
            >
                <EnrollmentAddForm ref="enrollmentFormRef" />
            </AppSlideover>
        </template>
        <ListTable
            ref="enrollmentTableRef"
            :tableData="enrollments"
            :tableColumns
            :isLoading="enrollmentsPending"
            :error="enrollmentsError"
            :showFilter="true"
            @select="(_event, row) => navigateTo(`/dashboard/enrollments/${row.original.id}`)"
        >
            <template #default>
                <ListFilters
                    v-model:state="filterState"
                    :fields="filterFields"
                    @update="enrollmentTableRef?.toggleAllPageRowsSelected(false)"
                >
                    <EnrollmentListActions
                        :selectedRows="enrollmentTableRef?.selectRows()"
                        :isLoading="enrollmentsPending"
                        @deleteSuccess="enrollmentTableRef?.toggleAllPageRowsSelected(false)"
                    />
                </ListFilters>
            </template>
        </ListTable>
    </DashboardPanel>
</template>
