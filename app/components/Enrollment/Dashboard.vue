<script setup lang="ts">
import type { SelectEnrollmentsWithRelations } from '~~/lib/db/schema';

import Actions from '~/components/Enrollment/Actions.vue';

const { title, tableColumns: _tableColumns } = defineProps<{
    title: string;
    tableColumns: (keyof SelectEnrollmentsWithRelations)[];
}>();

const authStore = useAuthStore();
const enrollmentsStore = useEnrollmentsStore();
const enrollmentFormRef = useTemplateRef('enrollmentFormRef');
const enrollmentDeleteFormRef = useTemplateRef('enrollmentDeleteFormRef');
const enrollmentTableRef = useTemplateRef('enrollmentTableRef');

const { canEdit } = storeToRefs(authStore);
const {
    enrollments,
    enrollmentsPending,
    enrollmentsError,
    filterState,
    filterFields,
} = storeToRefs(enrollmentsStore);

const deleteModalOpen = ref(false);

const tableColumns = getEnrollmentsTableColumns(_tableColumns);

if (canEdit.value) {
    tableColumns.unshift(getSelectTableColumn());
    tableColumns.push(getActionsTableColumn(Actions, (row) => ({ enrollmentId: row.id })));
}

async function handleFiltersUpdate() {
    await enrollmentsStore.refreshEnrollments();

    enrollmentTableRef.value?.toggleAllPageRowsSelected(false);
}

function handelDeleteSuccess() {
    deleteModalOpen.value = false;

    enrollmentTableRef.value?.toggleAllPageRowsSelected(false);
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
                :submitButtonProps="{
                    label: $t('form.button.add'),
                    loading: enrollmentFormRef?.isLoading(),
                }"
                @submit="enrollmentFormRef?.submit()"
            >
                <EnrollmentAddForm ref="enrollmentFormRef" />
            </AppSlideover>
        </template>
        <ListFilters
            v-model:state="filterState"
            :schema="EnrollmentsFiltersSchema"
            :fields="filterFields"
            @update="handleFiltersUpdate"
            @clear="enrollmentsStore.clearFilters"
        >
            <ListDeleteButton
                v-if="canEdit"
                v-model:open="deleteModalOpen"
                :title="$t('form.enrollment.multiple_delete.title')"
                :description="$t('form.enrollment.multiple_delete.description')"
                :isDisabled="enrollmentsPending || !(enrollmentTableRef?.selectRows()?.length || 0)"
                :isLoading="enrollmentDeleteFormRef?.isLoading()"
                @submit="enrollmentDeleteFormRef?.submit()"
            >
                <EnrollmentMultipleDeleteForm
                    ref="enrollmentDeleteFormRef"
                    :enrollments="enrollmentTableRef?.selectRows()?.map((row) => row.original) || []"
                    @success="handelDeleteSuccess"
                />
            </ListDeleteButton>
        </ListFilters>
        <ListTable
            ref="enrollmentTableRef"
            :tableData="enrollments"
            :tableColumns
            :isLoading="enrollmentsPending"
            :error="enrollmentsError"
            @select="(_event, row) => navigateTo(`/dashboard/enrollments/${row.original.id}`)"
        />
    </DashboardPanel>
</template>
