<script setup lang="ts">
import DetailsActions from '~/components/Parent/DetailsActions.vue';

useSeoMeta({
    title: $t('page.parents.title'),
});

const authStore = useAuthStore();
const parentsStore = useParentsStore();
const parentFormRef = useTemplateRef('parentFormRef');
const parentDeleteFormRef = useTemplateRef('parentDeleteFormRef');
const parentTableRef = useTemplateRef('parentTableRef');

const { canEdit } = storeToRefs(authStore);
const { parents, parentsPending, parentsError } = storeToRefs(parentsStore);

const deleteModalOpen = ref(false);

const tableColumns = getParentsTableColumns(['id', 'name', 'phoneNumber', 'email']);
tableColumns.unshift(getSelectTableColumn());
tableColumns.push(getActionsTableColumn(DetailsActions, (row) => ({ parentId: row.id })));

function handleDeleteSuccess() {
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
        <ListTable
            ref="parentTableRef"
            :tableData="parents"
            :tableColumns
            :isLoading="parentsPending"
            :error="parentsError"
            :showFilter="true"
        >
            <template #default>
                <div class="ml-auto">
                    <ListActions
                        v-model:openDelete="deleteModalOpen"
                        :deleteModal="{
                            title: $t('form.parent.multiple_delete.title', {
                                quantity: (parentTableRef?.selectRows()?.length || 0).toString(),
                            }),
                            description: $t('form.parent.multiple_delete.description'),
                            isDisabled: parentsPending || (parentTableRef?.selectRows()?.length || 0) === 0,
                            isLoading: Boolean(parentDeleteFormRef?.isLoading()),
                        }"
                        @submit="parentDeleteFormRef?.submit()"
                    >
                        <template #delete>
                            <ParentMultipleDeleteForm
                                ref="parentDeleteFormRef"
                                :parents="parentTableRef?.selectRows()?.map((row) => row.original) || []"
                                @success="handleDeleteSuccess"
                            />
                        </template>
                    </ListActions>
                </div>
            </template>
        </ListTable>
    </DashboardPanel>
</template>
