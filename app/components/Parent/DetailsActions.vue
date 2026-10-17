<script setup lang="ts">
import type { FetchError } from 'ofetch';

import Actions from '~/components/Details/Actions.vue';

const { parentId } = defineProps<{
    parentId: number;
}>();

const emit = defineEmits<{
    deleteSuccess: [];
    editSuccess: [id?: number];
}>();

const route = useRoute();
const toast = useToast();
const { $csrfFetch } = useNuxtApp();
const parentsStore = useParentsStore();
const parentEditFormRef = useTemplateRef('parentEditFormRef');

const openDelete = ref(false);
const openEdit = ref(false);
const isDeleting = ref(false);
const updatedParentId = ref<number>();

async function handleDelete() {
    try {
        isDeleting.value = true;

        await $csrfFetch(`/api/parents/${parentId}`, {
            method: 'DELETE',
        });

        toast.add({
            description: $t('form.parent.delete.success'),
            color: 'success',
            icon: 'i-lucide-circle-check',
        });

        parentsStore.refreshParents();

        openDelete.value = false;

        emit('deleteSuccess');
    } catch (error) {
        toast.add({
            description: getFetchErrorMessage(error as FetchError),
            color: 'error',
            icon: 'i-lucide-circle-x',
        });
    } finally {
        isDeleting.value = false;
    }
}

function handleEditSuccess(id?: number) {
    openEdit.value = false;
    updatedParentId.value = id;

    emit('editSuccess', id);
}
</script>

<template>
    <Actions
        v-model:openDelete="openDelete"
        v-model:openEdit="openEdit"
        :pageId="parentId"
        :detailsPath="route.name !== 'dashboard-parents-id' ? `/dashboard/parents/${parentId}` : undefined"
        :editModal="{
            title: $t('form.parent.edit.title'),
            description: $t('form.parent.edit.description'),
            isLoading: parentEditFormRef?.isLoading(),
        }"
        :deleteModal="{
            title: $t('form.parent.delete.title'),
            description: $t('form.parent.delete.description'),
            isLoading: isDeleting,
        }"
        @delete="handleDelete"
        @edit="parentEditFormRef?.submit"
    >
        <template #edit>
            <ParentEditForm ref="parentEditFormRef" :parentId @success="handleEditSuccess" />
        </template>
    </Actions>
</template>
