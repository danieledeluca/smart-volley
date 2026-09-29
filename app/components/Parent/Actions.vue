<script setup lang="ts">
const { parentId } = defineProps<{
    parentId: number;
}>();

const emit = defineEmits<{
    deleteComplete: [];
    deleteClose: [];
    editComplete: [id?: number];
    editClose: [id?: number];
}>();

const route = useRoute();

const parentEditFormRef = useTemplateRef('parentEditFormRef');
const parentDeleteFormRef = useTemplateRef('parentDeleteFormRef');

const openDelete = ref(false);
const openEdit = ref(false);
const updatedParentId = ref<number>();

const isLoading = computed(() => {
    return Boolean(parentEditFormRef.value?.isLoading()) || Boolean(parentDeleteFormRef.value?.isLoading());
});

function handleDeleteSuccess() {
    openDelete.value = false;

    emit('deleteComplete');
}

function handleEditSuccess(id?: number) {
    openEdit.value = false;
    updatedParentId.value = id;

    emit('editComplete', id);
}
</script>

<template>
    <ListTableActions
        v-model:openDelete="openDelete"
        v-model:openEdit="openEdit"
        :pageId="parentId"
        :copy="{
            label: $t('table.action.copy.label', { name: $t('table.action.copy.parent_id') }),
            successMessage: $t('toast.copy', { name: $t('table.action.copy.parent_id') }),
        }"
        :viewDetails="route.name !== 'dashboard-parents-id' ? {
            label: $t('table.action.view_details.parent'),
            path: `/dashboard/parents/${parentId}`,
        } : undefined"
        :edit="{
            label: $t('table.action.edit.parent'),
            title: $t('form.parent.edit.title'),
            description: $t('form.parent.edit.description'),
        }"
        :delete="{
            label: $t('table.action.delete.parent'),
            title: $t('form.parent.delete.title'),
            description: $t('form.parent.delete.description'),
        }"
        :isLoading
        @delete="parentDeleteFormRef?.submit"
        @deleteClose="emit('deleteClose')"
        @edit="parentEditFormRef?.submit"
        @editClose="emit('editClose', updatedParentId)"
    >
        <template #delete>
            <ParentDeleteForm ref="parentDeleteFormRef" :parentId @success="handleDeleteSuccess" />
        </template>
        <template #edit>
            <ParentEditForm ref="parentEditFormRef" :parentId @success="handleEditSuccess" />
        </template>
    </ListTableActions>
</template>
