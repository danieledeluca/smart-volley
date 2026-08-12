<script setup lang="ts">
const { athleteId } = defineProps<{
    athleteId: number;
}>();

const emit = defineEmits<{
    deleteComplete: [];
    deleteClose: [];
    editComplete: [id?: number];
    editClose: [id?: number];
}>();

const athleteEditFormRef = useTemplateRef('athleteEditFormRef');
const athleteDeleteFormRef = useTemplateRef('athleteDeleteFormRef');

const openDelete = ref(false);
const openEdit = ref(false);

const updatedAthleteId = ref<number>();

const isLoading = computed(() => {
    return Boolean(athleteEditFormRef.value?.isLoading()) || Boolean(athleteDeleteFormRef.value?.isLoading());
});

function handleInteractOutside(event: Event) {
    const target = event.target as HTMLElement;

    // Inside Google Place Autocomplete
    if (target.closest('.pac-container')) {
        event.preventDefault();
    }
}

function handleDeleteSuccess() {
    openDelete.value = false;

    emit('deleteComplete');
}

function handleEditSuccess(id?: number) {
    openEdit.value = false;
    updatedAthleteId.value = id;

    emit('editComplete', id);
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
        @deleteClose="emit('deleteClose')"
        @edit="athleteEditFormRef?.submit"
        @editClose="emit('editClose', updatedAthleteId)"
        @interactOutside="handleInteractOutside"
    >
        <template #delete>
            <AthleteDeleteForm ref="athleteDeleteFormRef" :athleteId @success="handleDeleteSuccess" />
        </template>
        <template #edit>
            <AthleteEditForm ref="athleteEditFormRef" :athleteId @success="handleEditSuccess" />
        </template>
    </ListTableActions>
</template>
