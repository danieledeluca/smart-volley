<script setup lang="ts">
const { enrollmentId, onDeleteComplete, onEditComplete } = defineProps<{
    enrollmentId: number;
    onDeleteComplete?: () => void;
    onEditComplete?: () => void;
}>();

const enrollmentsStore = useEnrollmentsStore();
const { isLoading } = storeToRefs(enrollmentsStore);

const openDelete = ref(false);
const openEdit = ref(false);

async function handleDelete() {
    await enrollmentsStore.removeEnrollment(enrollmentId, onDeleteComplete);
    openDelete.value = false;
}

async function handleEdit() {
    // TODO: add function in store
    openEdit.value = false;

    onEditComplete?.();
}
</script>

<template>
    <ListTableActions
        v-model:openDelete="openDelete"
        v-model:openEdit="openEdit"
        :deleteTitle="$t('form.enrollment.delete.title')"
        :deleteDescription="$t('form.enrollment.delete.description')"
        :editTitle="$t('form.enrollment.edit.title')"
        :editDescription="$t('form.enrollment.edit.description')"
        :isLoading
        @delete="handleDelete"
        @edit="handleEdit"
    >
        <template #delete>
            {{ $t('form.enrollment.delete.body') }}
        </template>
        <template #edit>
            <!-- TODO: add form -->
            <pre>{{ enrollmentId }}</pre>
        </template>
    </ListTableActions>
</template>
