<script setup lang="ts">
const { athleteId, onDeleteComplete, onEditComplete } = defineProps<{
    athleteId: number;
    onDeleteComplete?: () => void;
    onEditComplete?: () => void;
}>();

const athleteEditFormRef = useTemplateRef('athleteEditFormRef');
const athleteDeleteFormRef = useTemplateRef('athleteDeleteFormRef');

const openDelete = ref(false);
const openEdit = ref(false);

const isLoading = computed(() => {
    return Boolean(athleteEditFormRef.value?.isLoading()) || Boolean(athleteDeleteFormRef.value?.isLoading());
});

function handleDeleteSuccess() {
    openDelete.value = false;

    onDeleteComplete?.();
}

function handleEditSuccess() {
    openEdit.value = false;

    onEditComplete?.();
}
</script>

<template>
    <ListTableActions
        v-model:openDelete="openDelete"
        v-model:openEdit="openEdit"
        :deleteTitle="$t('form.athlete.delete.title')"
        :deleteDescription="$t('form.athlete.delete.description')"
        :editTitle="$t('form.athlete.edit.title')"
        :editDescription="$t('form.athlete.edit.description')"
        :isLoading
        @delete="athleteDeleteFormRef?.submit"
        @edit="athleteEditFormRef?.submit"
    >
        <template #delete>
            <AthleteDeleteForm ref="athleteDeleteFormRef" :athleteId @success="handleDeleteSuccess" />
        </template>
        <template #edit>
            <AthleteEditForm ref="athleteEditFormRef" :athleteId @success="handleEditSuccess" />
        </template>
    </ListTableActions>
</template>
