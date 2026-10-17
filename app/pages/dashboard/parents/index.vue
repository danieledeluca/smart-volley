<script setup lang="ts">
import DetailsActions from '~/components/Parent/DetailsActions.vue';

useSeoMeta({
    title: $t('page.parents.title'),
});

const authStore = useAuthStore();
const parentsStore = useParentsStore();
const parentFormRef = useTemplateRef('parentFormRef');
const parentTableRef = useTemplateRef('parentTableRef');

const { canEdit } = storeToRefs(authStore);
const { parents, parentsPending, parentsError } = storeToRefs(parentsStore);

const tableColumns = getParentsTableColumns(['id', 'name', 'phoneNumber', 'email']);

if (canEdit.value) {
    tableColumns.unshift(getSelectTableColumn());
}

tableColumns.push(getActionsTableColumn(DetailsActions, (row) => ({ parentId: row.id })));
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
                :preventClose="parentFormRef?.isLoading()"
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
                    <ParentListActions
                        :selectedRows="parentTableRef?.selectRows()"
                        :isLoading="parentsPending"
                        @deleteSuccess="parentTableRef?.toggleAllPageRowsSelected(false)"
                    />
                </div>
            </template>
        </ListTable>
    </DashboardPanel>
</template>
