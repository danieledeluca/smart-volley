<script setup lang="ts">
import DetailsActions from '~/components/Details/Actions.vue';

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
    <DetailsActions
        v-model:openDelete="openDelete"
        v-model:openEdit="openEdit"
        :pageId="parentId"
        :detailsPath="route.name !== 'dashboard-parents-id' ? `/dashboard/parents/${parentId}` : undefined"
        :editModal="{
            title: $t('form.parent.edit.title'),
            description: $t('form.parent.edit.description'),
            isLoading: Boolean(parentEditFormRef?.isLoading()),
        }"
        :deleteModal="{
            title: $t('form.parent.delete.title'),
            description: $t('form.parent.delete.description'),
            isLoading: Boolean(parentDeleteFormRef?.isLoading()),
        }"
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
    </DetailsActions>
</template>
