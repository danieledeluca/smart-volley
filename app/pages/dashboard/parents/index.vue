<script setup lang="ts">
import Actions from '~/components/Parent/Actions.vue';

useSeoMeta({
    title: $t('page.parents.title'),
});

const authStore = useAuthStore();
const { canEdit } = storeToRefs(authStore);

const parentsStore = useParentsStore();
const {
    parents,
    parentsPending,
    parentsError,
    filterState,
    filterFields,
} = storeToRefs(parentsStore);

const parentFormRef = useTemplateRef('parentFormRef');
const parentDeleteFormRef = useTemplateRef('parentDeleteFormRef');
const parentTableRef = useTemplateRef('parentTableRef');

const deleteModalOpen = ref(false);

const tableColumns = getParentsTableColumns(['id', 'name', 'phoneNumber', 'email']);

if (canEdit.value) {
    tableColumns.unshift(getSelectTableColumn());
    tableColumns.push(getActionsTableColumn(Actions, (row) => ({ parentId: row.id })));
}

async function handleFiltersUpdate() {
    await parentsStore.refreshParents();

    parentTableRef.value?.toggleAllPageRowsSelected(false);
}

function handelDeleteSuccess() {
    deleteModalOpen.value = false;

    parentTableRef.value?.toggleAllPageRowsSelected(false);
}
</script>

<template>
    <DashboardPanel :title="$t('page.parents.title')">
        <template v-if="canEdit" #right>
            <AppSlideover
                :title="$t('form.parent.add.title')"
                :description="$t('form.parent.add.description')"
                :buttonProps="{
                    label: $t('page.parents.button.add'),
                    icon: 'i-lucide-plus',
                }"
                :submitButtonProps="{
                    label: $t('form.button.add'),
                    loading: parentFormRef?.isLoading(),
                }"
                @submit="parentFormRef?.submit"
            >
                <ParentAddForm ref="parentFormRef" />
            </AppSlideover>
        </template>
        <ListFilters
            v-model:state="filterState"
            :schema="ParentsFiltersSchema"
            :fields="filterFields"
            @update="handleFiltersUpdate"
            @clear="parentsStore.clearFilters"
        >
            <ListDeleteButton
                v-if="canEdit"
                v-model:open="deleteModalOpen"
                :title="$t('form.parent.multiple_delete.title')"
                :description="$t('form.parent.multiple_delete.description')"
                :isDisabled="parentsPending || !(parentTableRef?.selectRows()?.length || 0)"
                :isLoading="parentDeleteFormRef?.isLoading()"
                @submit="parentDeleteFormRef?.submit()"
            >
                <ParentMultipleDeleteForm
                    ref="parentDeleteFormRef"
                    :parents="parentTableRef?.selectRows()?.map((row) => row.original) || []"
                    @success="handelDeleteSuccess"
                />
            </ListDeleteButton>
        </ListFilters>
        <ListTable
            ref="parentTableRef"
            :tableData="parents"
            :tableColumns
            :isLoading="parentsPending"
            :error="parentsError"
        />
    </DashboardPanel>
</template>
