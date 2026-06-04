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

const tableColumns = getParentsTableColumns(['id', 'name', 'phoneNumber', 'email']);

if (canEdit.value) {
    tableColumns.push(getActionsTableColumn(Actions, (row) => ({ parentId: row.id })));
}

onBeforeRouteLeave(() => {
    if (Object.values(filterState.value).filter((filter) => filter).length) {
        parentsStore.clearFilters();
    }
});
</script>

<template>
    <DashboardPanel :title="$t('page.parents.title')" :wrapBody="true">
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
            @update="parentsStore.refreshParents"
            @clear="parentsStore.clearFilters"
        />
        <ListTable
            :tableData="parents"
            :tableColumns
            :isLoading="parentsPending"
            :error="parentsError"
        />
    </DashboardPanel>
</template>
