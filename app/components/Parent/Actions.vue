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
        :deleteTitle="$t('form.parent.delete.title')"
        :deleteDescription="$t('form.parent.delete.description')"
        :editTitle="$t('form.parent.edit.title')"
        :editDescription="$t('form.parent.edit.description')"
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
